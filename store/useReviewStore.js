import {create} from 'zustand';
import { addReviewToDB, getReviewsFromDB, removeReviewsFromDB } from '@/utils/indexedDbMovies';

const useReviewStore = create((set, get) => ({
  reviews: [], // Simpan review per movieId
  movieIds: null,

  initializeReviews: async (movieIds) => {
    try {
        const existingReviews = await getReviewsFromDB(movieIds);
      set({ reviews: existingReviews?.reviews, movieIds });
    } catch (error) {
      console.error('Failed to initialize reviews:', error);
    }
  },

  addReview: async (movieId, review) => {
    try {
      const existingReviews = await getReviewsFromDB(movieId);
      await addReviewToDB(movieId, [...(existingReviews?.reviews ?? []), review]);
      await get().initializeReviews(get().movieIds)
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  },

  getReviews: async (movieId) =>  await getReviewsFromDB(movieId),

  deleteReview: async (idx) => {
    try {
      await removeReviewsFromDB(get().movieIds, idx);
      await get().initializeReviews(get().movieIds)
    } catch (error) {
      console.error('Failed to remove reviews:', error);
    }
  }
}));

export { useReviewStore };
