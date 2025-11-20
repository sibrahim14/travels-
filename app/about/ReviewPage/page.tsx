"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../componts/supabase";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Fetch all reviews
  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Add review
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("reviews").insert([newReview]);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Review submitted!");

    setNewReview({ name: "", rating: 5, comment: "" });
    fetchReviews();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Review</h2>

      {/* Review Form */}
      <form onSubmit={handleAddReview} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) =>
            setNewReview({ ...newReview, name: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Customer Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded shadow-sm bg-gray-50"
          >
            <h3 className="font-bold">{review.name}</h3>
            <p className="text-yellow-500 text-lg">
              {"⭐".repeat(review.rating)}
            </p>
            <p>{review.comment}</p>
            <small className="text-gray-500">
              {new Date(review.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
