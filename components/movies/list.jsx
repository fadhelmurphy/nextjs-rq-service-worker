import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMovieStore } from "@/store/useMovieStore";
import fetchMovies from "@/fetch/movies/fetchMovies";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import Notification from "@/components/Notification";

const MovieList = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [notification, setNotification] = useState(null);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["movies", page, searchTerm],
    queryFn: () => fetchMovies({ pageParam: page, search: searchTerm }),
    keepPreviousData: true,
  });
  const {
    addMovieToWatched,
    removeMovieFromWatched,
    isMovieWatched,
    initializeWatchedMovies,
  } = useMovieStore((state) => ({
    addMovieToWatched: state.addMovieToWatched,
    removeMovieFromWatched: state.removeMovieFromWatched,
    isMovieWatched: state.isMovieWatched,
    initializeWatchedMovies: state.initializeWatchedMovies,
  }));

  useEffect(() => {
    initializeWatchedMovies();
  }, [initializeWatchedMovies]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  const handleMarkAsWatched = (movie) => {
    if (isMovieWatched(movie.imdbID)) {
      removeMovieFromWatched(movie.imdbID);
      setNotification(`Removed "${movie.Title}" from watched list.`);
    } else {
      addMovieToWatched(movie);
      setNotification(`Marked "${movie.Title}" as watched.`);
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    router.push(`/?page=${nextPage}`, undefined, { shallow: true });
  };

  const handlePreviousPage = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      router.push(`/?page=${prevPage}`, undefined, { shallow: true });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    router.push(`/?page=1&search=${term}`, undefined, { shallow: true });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="p-5">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
          {data?.Search?.map((movie) => (
            <div
              key={movie?.imdbID}
              className="card-movie bg-white border border-gray-300 rounded-lg p-4 w-48 text-center"
            >
              <Link
                href={`/movie/${movie?.imdbID}`}
                className="text-lg font-semibold"
                shallow
              >
                <h2>{movie?.Title}</h2>
              </Link>
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="w-full rounded-lg mb-2"
              />
              <Link
                href={`/movie/${movie?.imdbID}`}
                className="text-blue-500 underline mb-2"
                shallow
              >
                View Details
              </Link>
              <button
                onClick={() => handleMarkAsWatched(movie)}
                onMouseEnter={() => handleMouseEnter(movie?.imdbID)}
                onMouseLeave={handleMouseLeave}
                className={`mt-2 py-2 px-4 rounded ${
                  isMovieWatched(movie?.imdbID)
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-500 text-white"
                } hover:${
                  isMovieWatched(movie?.imdbID) ? "bg-gray-300" : "bg-blue-700"
                }`}
              >
                {isMovieWatched(movie?.imdbID) &&
                hoveredMovieId === movie?.imdbID
                  ? "Remove from Watched"
                  : isMovieWatched(movie?.imdbID)
                  ? "Watched"
                  : "Mark as Watched"}
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1 || isFetching}
            className="py-2 px-4 bg-gray-500 text-white rounded disabled:bg-gray-300"
          >
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={!data?.Search?.length || isFetching}
            className="py-2 px-4 bg-gray-500 text-white rounded disabled:bg-gray-300"
          >
            {isFetching ? "Loading more..." : "Next Page"}
          </button>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
      <style jsx>
        {`
          .card-movie {
            height: 100%;
            width: 100%;
            display: inline-flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
          }
        `}
      </style>
    </>
  );
};

export default MovieList;
