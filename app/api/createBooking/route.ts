// Make route dynamic (important for fs + emails)
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Step 4: Send Notification Email via Resend
    await resend.emails.send({
      from: "Cab Booking <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: "New Cab Booking",
      text: `
New Booking Received

Car: ${body.selectedCar}
Service: ${body.selectedService}

Customer Info:
Name: ${body.fullName}
Phone: ${body.phone}

Trip Details:
Pickup: ${body.pickup}
Drop: ${body.drop}
Date: ${body.pickupDate}
Time: ${body.pickupTime}

Generated at: ${new Date().toLocaleString()}
      `,
    });

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
