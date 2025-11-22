// Make route dynamic (important for fs + emails)
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getSupabase } from "../../componts/supabase";

// Initialize Resend
// NOTE: don't initialize Resend at module-eval time — do it inside the handler

// JSON file path
const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation for required fields
    const required = [
      "fullName",
      "phone",
      "pickup",
      "drop",
      "pickupDate",
      "pickupTime",
    ];
    const missing = required.filter((k) => !body?.[k]);
    if (missing.length) {
      console.warn("Booking request missing fields:", missing);
      return NextResponse.json(
        { success: false, error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Step 1: Read previous bookings (only in development; serverless can't persist files)
    let bookings: any[] = [];
    if (process.env.NODE_ENV === "development") {
      try {
        const file = await fs.readFile(BOOKINGS_FILE, "utf8");
        bookings = JSON.parse(file);
      } catch {
        // file not found → ignore
      }
    }

    // Step 2: Create new booking entry
    const newBooking = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);

    // Step 3: Persist booking to a serverless-safe store (Supabase) and optionally to local JSON in dev
    // Try Supabase insert first
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error: sbError } = await supabase.from("bookings").insert([
          {
            id: newBooking.id,
            fullName: newBooking.fullName,
            phone: newBooking.phone,
            pickup: newBooking.pickup,
            drop: newBooking.drop,
            pickupDate: newBooking.pickupDate,
            pickupTime: newBooking.pickupTime,
            selectedCar: newBooking.selectedCar,
            selectedService: newBooking.selectedService,
            createdAt: newBooking.createdAt,
          },
        ]);
        if (sbError) {
          console.error("Supabase insert error:", sbError);
        }
      } else {
        console.warn("Supabase client not configured; skipping DB insert.");
      }
    } catch (sbErr) {
      console.error("Supabase request failed:", sbErr);
    }

    // For local development only, still write a JSON file so dev workflow works
    if (process.env.NODE_ENV === "development") {
      try {
        await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8");
      } catch (fsErr) {
        console.error("Failed to write bookings.json (dev only):", fsErr);
      }
    }

    // Step 4: Send Notification Email via Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (resendApiKey && adminEmail) {
      try {
        const mod = await import("resend");
        const ResendCtor = (mod as any)?.Resend ?? (mod as any)?.default ?? (mod as any);
        const resend = new ResendCtor(resendApiKey);
        await resend.emails.send({
          from: "Cab Booking <onboarding@resend.dev>",
          to: adminEmail,
          subject: "New Cab Booking",
          text: `New Booking Received\n\nCar: ${body.selectedCar}\nService: ${body.selectedService}\n\nCustomer Info:\nName: ${body.fullName}\nPhone: ${body.phone}\n\nTrip Details:\nPickup: ${body.pickup}\nDrop: ${body.drop}\nDate: ${body.pickupDate}\nTime: ${body.pickupTime}\n\nGenerated at: ${new Date().toLocaleString()}`,
        });
      } catch (emailErr) {
        console.error("Resend email error:", emailErr);
      }
    } else {
      console.warn("Resend not configured — skipping notification email.");
    }

    return NextResponse.json({
      success: true,
      message: "Booking saved & email sent!",
    });

  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
