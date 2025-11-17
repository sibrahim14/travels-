"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../componts/supabase";
import { IoLogoWhatsapp } from "react-icons/io";
import Navbar from "../componts/navebar";
import { useSearchParams } from "next/navigation";

interface Car {
  id: number;
  name: string;
  image_url?: string | null;
  seats: number;
  price_per_km: number;
}

export default function CarspageUI() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service") || "";

  // Admin WhatsApp number (E.164 format)
  const ADMIN_NUMBER = "919014755908";
  const WHATSAPP_MESSAGE = "Hi Shiva Sai Travels! I'm interested in booking a car.";

  // Construct WhatsApp chat link
  const getWhatsAppLink = () => {
    return `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  };

  // Fetch car list from Supabase
  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase.from("cars").select("*");

      if (error) {
        console.error("Error fetching cars:", error.message);
      } else {
        setCars(data || []);
      }

      setLoading(false);
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div className="container"><p>Loading car details...</p></div>;
  }

  return (
    <div className="container">
      <Navbar />

      <div className="home-section">
        <h1>Welcome to Shiva Sai Travels</h1>
        <p>Book your ride easily and chat with us on WhatsApp!</p>
      </div>

      <h1 className="title">Available Cars</h1>

      <div className="car-list">
        {cars.map((car) => (
          <div className="card" key={car.id}>
            <img
              src={car.image_url || "/placeholder-car-image.jpg"}
              alt={car.name}
              className="car-img"
            />

            <h2>{car.name}</h2>
            <p><strong>Seats:</strong> {car.seats}</p>
            <p><strong>Price per km:</strong> ₹{car.price_per_km}</p>

            <Link
              href={`/bookpage?service=${selectedService}&car=${car.name}`}
              className="carbtn"
            >
              Book Now
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <div className="whatsapp-chat">
                <IoLogoWhatsapp size={24} color="#25D366" />
                <span>Chat on WhatsApp</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
