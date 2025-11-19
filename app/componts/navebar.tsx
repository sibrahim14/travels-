"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Car } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <Car className="nav-logo-icon" />
          <span> Travels</span>
        </Link>

        {/* Desktop Links */}
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/Servisepage">Services</Link>
          <Link href="/Carspage">Cars</Link>
          <Link href="/contact">Contact </Link>
           <Link href="/about">  About</Link>
          <Link href="/Carspage"><button className="nav-btn">Get Started</button></Link>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
