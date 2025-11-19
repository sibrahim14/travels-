"use client";

import { FC } from "react";
import Navbar from "../componts/navebar";
import {
  ShieldCheck,
  Clock,
  EyeOff,
  Car,
  MapPin,
  CreditCard,
  Headphones,
  HandCoins,
} from "lucide-react";

const AboutPage: FC = () => {
  const services = [
    {
      title: "Price Transparency",
      description:
        "We make all charges clear to you upfront. No extra charges or hidden fees.",
      icon: <CreditCard size={40} className="text-blue-600" />,
    },
    {
      title: "No Cancellation Fees",
      description: "100% money back guarantee.",
      icon: <ShieldCheck size={40} className="text-blue-600" />,
    },
    {
      title: "24x7 Service",
      description:
        "Book anytime. We’re here to help with round-the-clock support.",
      icon: <Clock size={40} className="text-blue-600" />,
    },
    {
      title: "No Hidden Charges",
      description:
        "All fares are transparent. We don’t ask for any extra payment.",
      icon: <EyeOff size={40} className="text-blue-600" />,
    },
    {
      title: "Neat and Clean Taxis",
      description:
        "Our cabs go through daily washing and sanitization for your safety.",
      icon: <Car size={40} className="text-blue-600" />,
    },
    {
      title: "GPS Enabled Cars",
      description:
        "All cabs are connected with GPS tracking for safe travel.",
      icon: <MapPin size={40} className="text-blue-600" />,
    },
    {
      title: "Fully Insured Vehicles",
      description:
        "Cars are fully insured with top-class insurance companies.",
      icon: <HandCoins size={40} className="text-blue-600" />,
    },
    {
      title: "24/7 Customer Support",
      description: "We help you anytime, anywhere.",
      icon: <Headphones size={40} className="text-blue-600" />,
    },
  ];

  return (
    <div className="about-container">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay"></div>
        <div className="about-hero-content">
          <h1>About SRK Travels</h1>
          <p>Your trusted cab & travel service.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              {s.icon}
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta2">
        <h2>Ready to Book Your Ride?</h2>
        <p>Experience a safe, clean and comfortable travel.</p>
        <a href="/Carspage">
          <button className="btn blue">Book a Cab</button>
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
