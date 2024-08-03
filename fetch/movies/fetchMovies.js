import fetchHelper from "@/utils/fetchHelper";
import { addMoviesToDB, getMoviesFromDB } from '@/utils/indexedDbMovies';

const fetchMovies = async ({ pageParam = 1, search = "marvel" }) => {

  const key = `${pageParam}_${search}`;

  const cachedData = await getMoviesFromDB(key);
  if (cachedData && cachedData?.movies) return cachedData?.movies;

  const response = await fetchHelper(`/api/movies?page=${pageParam}&s=${search}`);

  await addMoviesToDB(key, response);

  return response;
};
export default fetchMovies;
