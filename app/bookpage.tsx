"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./componts/navebar"; // adjust path if needed

type BookingPayload = {
  fullName: string;
  phone: string;
  pickup: string;
  drop: string;
  pickupDate: string;
  pickupTime: string;
  selectedCar: string;
  selectedService: string;
};

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCar = searchParams.get("car") ?? "";
  const selectedService = searchParams.get("service") ?? "";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!fullName || !phone || !pickup || !drop || !pickupDate || !pickupTime) {
      alert("Please fill all details");
      return;
    }
    setLoading(true);

    const payload: BookingPayload = {
      fullName,
      phone,
      pickup,
      drop,
      pickupDate: pickupDate.toLocaleDateString("en-IN"),
      pickupTime,
      selectedCar,
      selectedService,
    };

    try {
      const res = await fetch("/api/createBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (data?.success) {
        router.push("/congratulations");
      } else {
        alert("Failed to book ride. Try again.");
        console.error(data);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Network error.");
    }
  };

  return (
    <div className="book-page">
      <Navbar />

      <div className="book-card">
        <h2 className="book-title">Book Your Ride</h2>

        <div className="book-info-box">
          <p><strong>Selected Car:</strong> {selectedCar}</p>
          <p><strong>Selected Service:</strong> {selectedService}</p>
        </div>

        <label className="book-label">Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="book-input" placeholder="Enter full name" />

        <label className="book-label">Phone Number</label>
        <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} className="book-input" placeholder="Enter phone number" />

        <label className="book-label">Pickup Location</label>
        <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} className="book-input" placeholder="Pickup location" />

        <label className="book-label">Drop Location</label>
        <input type="text" value={drop} onChange={(e) => setDrop(e.target.value)} className="book-input" placeholder="Drop location" />

        <label className="book-label">Pickup Date</label>
        <DatePicker selected={pickupDate} onChange={(date) => setPickupDate(date)} minDate={new Date()} dateFormat="dd/MM/yyyy" className="book-input" placeholderText="Select pickup date" />

        <label className="book-label">Pickup Time</label>
        <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="book-input" />

        <button onClick={handleBooking} className="book-btn" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
