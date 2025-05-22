const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
  const data = await response.json();

  // Fetch additional details for each movie
  const moviesWithDetails = await Promise.all(
    data.results.map(async (movie) => {
      const details = await getMovieDetails(movie.id);
      return {
        ...movie,
        runtime: details.runtime,
        vote_average: details.vote_average || movie.vote_average,
      };
    })
  );

  return moviesWithDetails;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  // Fetch additional details for each movie
  const moviesWithDetails = await Promise.all(
    data.results.map(async (movie) => {
      const details = await getMovieDetails(movie.id);
      return {
        ...movie,
        runtime: details.runtime,
        vote_average: details.vote_average || movie.vote_average,
      };
    })
  );

  return moviesWithDetails;
};
