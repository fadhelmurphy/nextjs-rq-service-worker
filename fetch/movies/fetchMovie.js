import fetchHelper from "@/utils/fetchHelper";
import {
  addMovieDetailToDB,
  getMovieDetailFromDB,
} from "@/utils/indexedDbMovies";

const fetchMovie = async (id) => {
  if(typeof window === "undefined"){

    const baseURL = process.env.NEXT_PUBLIC_BE_API;
    const apiKey = process.env.API_KEY;
  
    const url = `${baseURL}?apikey=${apiKey}`;
    const response = await fetchHelper(
      `${url}&i=${id}`
    );
    return response;
  }
  
  const cachedData = await getMovieDetailFromDB(id);
  const hasDetail = cachedData
  if (hasDetail && hasDetail.movieDetail) return hasDetail.movieDetail;

  const response = await fetchHelper(
    `/api/movies?i=${id}`
  );

  await addMovieDetailToDB(id, response);
  return response
};

export default fetchMovie;
