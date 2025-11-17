"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Message Sent to your Email!");
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Error sending message!");
    }
  };

  return (
    <div className="contact-wrap">
      <h2>Contact Us</h2>

      {/* My Info */}
      <div className="info-box">
        <p><strong>📞 Phone:</strong> +91 9876543210</p>
        <p><strong>📧 Email:</strong> myemail@gmail.com</p>
        <p><strong>📍 Address:</strong> Hyderabad, Telangana</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
