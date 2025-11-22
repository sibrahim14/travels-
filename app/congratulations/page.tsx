import React from "react";
// import "./Congratulations.css";

export default function Congratulations() {
  return (
    <div className="congrats-container">
      <h1 className="congrats-title">🎉 Booking Successful!</h1>
      <p className="congrats-text">Your ride has been successfully booked.</p>
      <p className="congrats-subtext">Our team will contact you shortly.</p>
    </div>
  );
}
