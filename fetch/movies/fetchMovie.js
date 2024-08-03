import fetchHelper from "@/utils/fetchHelper";
import {
  addMovieDetailToDB,
  getMovieDetailFromDB,
} from "@/utils/indexedDbMovies";

const fetchMovie = async (id) => {
  if(typeof window === "undefined"){

    const response = await fetchHelper(
      `http://localhost:3000/api/movies?i=${id}`
    );
    return response;
  }
  
  const cachedData = await getMovieDetailFromDB(id);
  const hasDetail = cachedData
  if (hasDetail && hasDetail.movieDetail) return hasDetail.movieDetail;

  const response = await fetchHelper(
    `http://localhost:3000/api/movies?i=${id}`
  );

  await addMovieDetailToDB(id, response);
  return response
};

export default fetchMovie;
