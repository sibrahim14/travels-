"use client";

import { MapPin, Shield, Clock, Award } from "lucide-react";
import Navbar from "./navebar"
import Link from "next/link";
export default function Index() {

  // aftre opion whast defalt message 
  const WHATSAPP_MESSAGE = "Hi SRK Travels! I'm interested in booking a car.";

  const destinations = [
    {
      name: "Mountain Adventure",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      description: "Explore scenic mountain routes",
    },
    {
      name: "Coastal Drive",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      description: "Cruise along beautiful coastlines",
    },
    {
      name: "City Explorer",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      description: "Navigate urban landscapes",
    },
  ];
  //  whastapp link
  const getWhatsAppLink = () => {

    return `https://wa.me/${9014755908}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  };

  const features = [
    {
      icon: <Shield className="icon" />,
      title: "Safe & Secure",
      description: "All vehicles are regularly maintained and insured",
    },
    {
      icon: <Clock className="icon" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service for your peace of mind",
    },
    {
      icon: <MapPin className="icon" />,
      title: "Multiple Locations",
      description: "Pick up and drop off at convenient locations",
    },
    {
      icon: <Award className="icon" />,
      title: "Best Prices",
      description: "Competitive rates with no hidden fees",
    },
  ];

  return (
    <div className="main-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          {/* <h1>SHIVA SAI TRAVELS</h1> */}
          <h2>Your Journey Starts Here</h2>
          <p>Book the perfect car for your next adventure</p>
          <div className="hero-buttons">
            <Link href="/Servisepage">
              <button className="btn white">Choose Service</button>
            </Link>

            <Link href="/Carspage">
              <button className="btn blue ">
                Browse Cars
              </button>
            </Link>
            {/* whatsapp link  */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              <button className="btn white" >WhastApp</button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose CarTravel?</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations">
        <h2>Popular Destinations</h2>
        <p>Discover amazing places with our reliable vehicles</p>
        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Hit the Road?</h2>
        <p>Book your perfect car today and start your adventure</p>
        <Link href="/Carspage">
          <button className="btn white2">Book Your Car Now</button>
        </Link>
      </section>
    </div>
  );
}
