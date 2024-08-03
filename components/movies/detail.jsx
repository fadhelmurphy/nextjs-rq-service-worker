import React, { useEffect, useState } from "react";
import { useReviewStore } from "@/store/useReviewStore";
import MovieReviewForm from "./MovieReviewForm";
import ReviewList from "../reviews/list";

const MovieDetail = ({ movie, isLoading = false, error = false }) => {
  const { initializeReviews, deleteReview, reviews, addReview } =
    useReviewStore((state) => ({
      reviews: state.reviews,
      addReview: state.addReview,
      initializeReviews: state.initializeReviews,
      deleteReview: state.deleteReview,
    }));

  const [newReview, setNewReview] = useState({
    rating: "",
    comment: "",
    name: "",
  });

  useEffect(() => {
    initializeReviews(movie?.imdbID);
  }, [movie?.imdbID, initializeReviews]);

  const handleAddReview = async () => {
    await addReview(movie?.imdbID, newReview);
    setNewReview({ rating: "", comment: "", name: "" });
  };

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-2">{movie?.Title}</h1>
      <p className="text-lg text-gray-600 mb-4">{movie?.Year}</p>
      <img src={movie?.Poster} alt={movie?.Title} className="w-full rounded-lg mb-4" />
      <p className="text-base text-gray-700 mb-6">{movie?.Plot}</p>
      <MovieReviewForm
        movieId={movie?.imdbID}
        onSubmit={handleAddReview}
        onReviewChange={(e) =>
          setNewReview({ ...newReview, [e.target.name]: e.target.value })
        }
        review={newReview}
      />
      <ReviewList reviews={reviews} onDeleteReview={deleteReview} />
    </div>
  );
};

export default MovieDetail;
