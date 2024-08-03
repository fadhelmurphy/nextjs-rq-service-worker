import {create} from 'zustand';
import { addMovieToDB, getMoviesFromDB, deleteMovieFromDB } from '@/utils/indexedDbWatched';

const useMovieStore = create((set, get) => ({
  watchedMovies: [],
  initializeWatchedMovies: async () => {
    try {
      const movies = await getMoviesFromDB();
      set({ watchedMovies: movies });
    } catch (error) {
      console.error('Failed to initialize watched movies:', error);
    }
  },

  addMovieToWatched: async (movie) => {
    try {
      await addMovieToDB(movie);
      set((state) => ({
        watchedMovies: [...state.watchedMovies, movie]
      }));
    } catch (error) {
      console.error('Failed to add movie to watched list:', error);
    }
  },

  isMovieWatched: (movieId) => {
    const watchedMovies = get().watchedMovies;
    return watchedMovies.some(item => item.imdbID === movieId);
  },

  removeMovieFromWatched: async (movieId) => {
    try {
      await deleteMovieFromDB(movieId);
      set((state) => ({
        watchedMovies: state.watchedMovies.filter(movie => movie.imdbID !== movieId)
      }));
    } catch (error) {
      console.error('Failed to remove movie from watched list:', error);
    }
  }
}));

export { useMovieStore };
