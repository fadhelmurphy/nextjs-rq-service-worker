import React, { useState, useEffect } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Notification from '@/components/Notification';
import Layout from '@/containers/layout';

const WatchedMovies = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;
  const [page, setPage] = useState(currentPage);
  const [notification, setNotification] = useState(null);

  const initializeWatchedMovies = useMovieStore((state) => state.initializeWatchedMovies);
  const { watchedMovies, removeMovieFromWatched } = useMovieStore(state => ({
    watchedMovies: state.watchedMovies,
    removeMovieFromWatched: state.removeMovieFromWatched
  }));

  useEffect(() => {
    initializeWatchedMovies();
  }, [initializeWatchedMovies]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    const nextPage = page + 1;
    router.push(`/watched?page=${nextPage}`, undefined, { shallow: true });
  };

  const handlePreviousPage = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      router.push(`/watched?page=${prevPage}`, undefined, { shallow: true });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const itemsPerPage = 10;
  const paginatedMovies = watchedMovies.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Layout pageTitle="Watched Movies">
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Watched Movies</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
        {paginatedMovies.length > 0 ? (
          paginatedMovies.map((movie) => (
            <div key={movie.imdbID} className="card-movie bg-white border border-gray-300 rounded-lg p-4 w-48 text-center">
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} className="w-full rounded-lg mb-2" />
              <Link href={`/movie/${movie.imdbID}`} className="text-blue-500 underline mb-2">
                View Details
              </Link>
              <button
                onClick={() => {
                  removeMovieFromWatched(movie.imdbID);
                  setNotification(`Removed "${movie.Title}" from watched list.`);
                }}
                className="mt-2 py-2 px-4 rounded bg-red-500 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No watched movies yet.</p>
        )}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="py-2 px-4 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={paginatedMovies.length < itemsPerPage}
          className="py-2 px-4 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next Page
        </button>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
      <style jsx>{`
        .card-movie {
          height: 100%;
          width: 100%;
          display: inline-flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </div></Layout>
  );
};

export default WatchedMovies;
