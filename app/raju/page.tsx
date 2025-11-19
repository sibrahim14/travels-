"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { supabase } from "../componts/supabase";

interface Car {
  id?: number;
  name: string;
  image_url?: string | null;
  seats: number;
  bag: number;
  price_per_km: number;
}
interface Booking {
  id: number;
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  car: string;
  price: number;
  created_at: string;
}

function Raju() {
  const [isEditing, setIsEditing] = useState(false);
  const [editCarId, setEditCarId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    name: "",
    seats: 0,
    bag: 0,
    price_per_km: 0,
    image_url: "",
  });

  // Fetch Bookings + Cars
  useEffect(() => {
    const fetchData = async () => {
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: carData } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      setBookings(bookingData || []);
      setCars(carData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Add New Car
  const handleAddCar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from("cars").insert([newCar]);
    if (error) {
      alert("Error adding car: " + error.message);
    } else {
      alert("Car added successfully!");
      setNewCar({ name: "", seats: 0, bag: 0, price_per_km: 0, image_url: "" });
      const { data: updatedCars } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      setCars(updatedCars || []);
      window.location.reload();
    }
  };

  // Delete Car
  const handleDeleteCar = async (id: Number) => {
    const { error } = await supabase.from("cars").delete().eq("id", id);
    if (error) {
      alert("Error deleting car: " + error.message);
    } else {
      alert("Car deleted successfully!");
      setCars(cars.filter((c) => c.id !== id));
    }
  };
  // Edite
  const handleEditClick = (car: any) => {
  setIsEditing(true);
  setEditCarId(car.id);

  setNewCar({
    name: car.name,
    seats: car.seats,
    bag: car.bag,
    price_per_km: car.price_per_km,
    image_url: car.image_url,
  });
};
  const handleUpdateCar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("cars")
      .update(newCar)
      .eq("id", editCarId);

    if (error) {
      alert("Error updating car: " + error.message);
    } else {
      alert("Car updated successfully!");

      setNewCar({ name: "", seats: 0, bag: 0, price_per_km: 0, image_url: "" });
      setIsEditing(false);
      setEditCarId(null);

      const { data: updatedCars } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      setCars(updatedCars || []);
    }
  };


  if (loading) return <div className="container"><p>Loading data...</p></div>;

  return (

    <div className="container">
      <h1>🚗 Admin Panel</h1>

      {/* Add Car Section */}
      <div className="card">
        <h2>Add New Car</h2>
        <form onSubmit={handleAddCar}>
          <input
            type="text"
            placeholder="Car Name"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Seats"
            value={newCar.seats}
            onChange={(e) => setNewCar({ ...newCar, seats: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="bag"
            value={newCar.bag}
            onChange={(e) => setNewCar({ ...newCar, bag: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Price per KM"
            value={newCar.price_per_km}
            onChange={(e) => setNewCar({ ...newCar, price_per_km: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCar.image_url || ""}
            onChange={(e) => setNewCar({ ...newCar, image_url: e.target.value })}
          />
          <button type="submit">Add Car</button>
        </form>
      </div>

      {/* Car List */}
      <div className="card">
        <h2>All Cars</h2>
        {cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Model</th> */}
                <th>Seats</th>
                <th>bag</th>
                <th>Price/KM</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.name}</td>
                  {/* <td>{car.model}</td> */}
                  <td>{car.seats}</td>
                  <td>{car.bag}</td>
                  <td>₹{car.price_per_km}</td>
                  <td>
                    <img
                      src={car.image_url || ""}
                      alt={car.name}
                      width="80"
                      style={{ borderRadius: "5px" }}
                    />
                  </td>
                  <td>
                    <button onClick={() => car.id && handleDeleteCar(car.id)}>🗑️</button>
                  </td>
                  <button onClick={() => car.id && handleEditClick (car.id) }>Edit</button>
                </tr>

              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bookings */}
      <div className="card">
        <h2>All Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Car</th>
                <th>Price</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.phone}</td>
                  <td>{b.pickup}</td>
                  <td>{b.drop}</td>
                  <td>{b.car}</td>
                  <td>₹{b.price}</td>
                  <td>{new Date(b.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Raju;
