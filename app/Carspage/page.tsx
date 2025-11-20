"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../componts/supabase";
import { IoLogoWhatsapp } from "react-icons/io";
import Navbar from "../componts/navebar";





const WHATSAPP_MESSAGE = "Hi SRK Travels! I'm interested in booking a car.";

interface Car {
    id: number;
    name: string;
    image_url?: string | null;
    seats: number;
    bag:number;
    price_per_km: number;
}

function CarspageUI() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    // Function to construct the WhatsApp chat link
    const getWhatsAppLink = () => {
        // Creates a link for WhatsApp Web/App
        return `https://wa.me/${9177214082}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    };

    useEffect(() => {
        const fetchCars = async () => {
            const { data, error } = await supabase.from("cars").select("*");
            if (error) {
                console.error("Error fetching cars:", error.message);
            } else {
                setCars(data);
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
                <h1>Welcome to shiva sai Travels</h1>
                <p>Book your ride easily and chat with us on WhatsApp!</p>
                {/* Modified: Added Link/a tag for WhatsApp chat */}

            </div>

            <h1 className="title">Available Cars</h1>
            <div className="car-list">
                {cars.map((car) => (
                    <div className="card" key={car.id}>
                        {/* Added a fallback image or condition if image_url is null */}
                        <img
                            src={car.image_url || 'placeholder-car-image.jpg'}
                            alt={car.name}
                            className="car-img"
                        />
                        <h2>{car.name}</h2>
                        <p><strong>Seats:</strong> {car.seats} +1 | <strong>Bag:</strong> {car.bag}</p>
                    
                        <p><strong>Price per km:</strong> ₹{car.price_per_km}</p>
                        <Link
                            href={`/servisepage2?car=${car.name}`}
                            className="carbtn"
                        >
                             Book Now
                        </Link>
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-link" // Use this class for styling
                        >
                            <div className="whatsapp-chat">
                                <IoLogoWhatsapp size={24} color="#25D366" />

                                <span className="whatsapp-number">{ }</span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarspageUI;