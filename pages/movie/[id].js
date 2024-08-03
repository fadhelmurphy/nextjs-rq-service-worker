import React from "react";
import MovieDetail from "@/components/movies/detail";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import fetchMovie from "@/fetch/movies/fetchMovie";
import Layout from "@/containers/layout";

const Movie = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
  });
  return <Layout pageTitle={data?.Title}><MovieDetail movie={data} /></Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: ["movie", id],
    queryFn: async () => await fetchMovie(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
}

export default Movie;
