"use client";

import { useRouter } from "next/navigation";
import Navbar from "../componts/navebar"; // make sure the path is correct
import { Car, MapPin, Plane, Navigation,} from "lucide-react";
import Link from "next/link";

export default function Services() {
  const router = useRouter();

  const services = [
    {
      id: "one-way",
      title: "One Way Cab",
      description: "Book a one-way trip to your destination without return charges.",
      icon: <Car className="serviceIcon" />,
      features: ["No return fare", "Direct route", "Comfortable ride", "Professional drivers"],
    },
    {
      id: "round-trip",
      title: "Round Trip Cab",
      description: "Book a round trip with pickup and drop-off at your convenience.",
      icon: <Navigation className="serviceIcon" />,
      features: ["Complete journey", "Flexible timing", "Best rates", "Multiple stops allowed"],
    },
    {
      id: "airport",
      title: "Airport Pickup & Drop",
      description: "Reliable airport transfer service with on-time guarantee.",
      icon: <Plane className="serviceIcon" />,
      features: ["Flight tracking", "Meet & greet", "Luggage assistance", "24/7 available"],
    },
    {
      id: "local",
      title: "Local City Ride",
      description: "Explore the city with hourly or daily rental packages.",
      icon: <MapPin className="serviceIcon" />,
      features: ["Hourly packages", "City tours", "Multiple destinations", "Local expertise"],
    },
  ];

  const handleServiceSelect = (id: string, title: string) => {
    router.push(`/booking?type=${id}&name=${encodeURIComponent(title)}`);
  };

  return (
    <div className="servicesContainer">
      <Navbar />

      <section className="heroSection">
        <h1>Choose Your Service</h1>
        <p>Select the perfect service for your travel needs</p>
      </section>

      <section className="servicesGrid">
        {services.map((service) => (
          <div key={service.id} className="serviceCard">
            <div className="serviceIconBox">{service.icon}</div>
            <h2>{service.title}</h2>
            <p className="serviceDescription">{service.description}</p>

            <ul className="serviceFeatures">
              {service.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <Link href={`/carspage2?service=${service.title}`}             
                className="bookButton"
                >
                Book Now
              
            </Link>
          </div>
        ))}
      </section>

      <section className="whyChooseSection">
        <h2>Why Choose Our Services?</h2>
        <div className="whyChooseGrid">
          <div className="whyChooseCard">
            <h3>Professional Drivers</h3>
            <p>Experienced and courteous drivers for a safe journey.</p>
          </div>
          <div className="whyChooseCard">
            <h3>24/7 Availability</h3>
            <p>Book anytime, anywhere with round-the-clock service.</p>
          </div>
          <div className="whyChooseCard">
            <h3>Best Prices</h3>
            <p>Competitive rates with transparent pricing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
