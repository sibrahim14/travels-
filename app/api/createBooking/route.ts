import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Save booking file
    let bookings = [];
    try {
      const file = await fs.readFile(BOOKINGS_FILE, "utf8");
      bookings = JSON.parse(file);
    } catch {}
    
    const newBooking = { id: Date.now(), ...body };
    bookings.unshift(newBooking);
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    // Send email via RESEND
    await resend.emails.send({
      from: "Cab Booking <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: "New Cab Booking",
      text: `
New Booking Received:
Car: ${body.selectedCar}
Service: ${body.selectedService}
Name: ${body.fullName}
Phone: ${body.phone}
Pickup: ${body.pickup}
Drop: ${body.drop}
Date: ${body.pickupDate}
Time: ${body.pickupTime}

      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
