// Make route dynamic (important for fs + emails)
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

// Initialize Resend
// NOTE: don't initialize Resend at module-eval time — do it inside the handler

// JSON file path
const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Step 1: Read previous bookings
    let bookings = [];
    try {
      const file = await fs.readFile(BOOKINGS_FILE, "utf8");
      bookings = JSON.parse(file);
    } catch {
      // file not found → ignore
    }

    // Step 2: Create new booking entry
    const newBooking = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);

    // Step 3: Write updated JSON
    await fs.writeFile(
      BOOKINGS_FILE,
      JSON.stringify(bookings, null, 2),
      "utf8"
    );

    // Step 4: Send Notification Email via Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);
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
