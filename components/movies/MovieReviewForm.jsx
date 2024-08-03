import React from 'react';

const MovieReviewForm = ({ review, onReviewChange, onSubmit }) => (
  <form
    onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
    className="p-4 bg-white shadow-md rounded-lg"
  >
  <div className="mb-4">
    <label
      htmlFor="rating"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Nama:
    </label>
    <input
      id="name"
      type="text"
      name="name"
      value={review?.name}
      onChange={onReviewChange}
      min="1"
      max="5"
      required
      className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
    <div className="mb-4">
      <label
        htmlFor="rating"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Rating:
      </label>
      <input
        id="rating"
        type="number"
        name="rating"
        value={review?.rating}
        onChange={onReviewChange}
        min="1"
        max="5"
        required
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Comment:
      </label>
      <textarea
        id="comment"
        name="comment"
        value={review?.comment ?? undefined}
        onChange={onReviewChange}
        required
        rows="4"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Submit Review
    </button>
  </form>
);

export default MovieReviewForm;
