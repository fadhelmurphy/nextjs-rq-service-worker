import React from 'react';

const ReviewList = ({ reviews, onDeleteReview }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
    <ul className="space-y-4">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <li key={index} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-800">{`Rating: ${review.rating}`}</span>
              <button
                onClick={() => onDeleteReview(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
            <h3 className="text-md font-semibold">{review.name}</h3>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </li>
        ))
      ) : (
        <li className="p-4 bg-white shadow-md rounded-lg text-gray-600">
          No reviews yet.
        </li>
      )}
    </ul>
  </div>
);

export default ReviewList;
