const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get detailed movie information
export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos`
  );
  const data = await response.json();
  return data;
};

// Get trending movies (day or week)
export const getTrendingMovies = async (timeWindow = "day", page = 1) => {
  const response = await fetch(
    `${baseUrl}/trending/movie/${timeWindow}?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get similar movies
export const getSimilarMovies = async (movieId, page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get movie reviews
export const getMovieReviews = async (movieId, page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get movie credits (full cast and crew)
export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};

// Get all movie genres
export const getGenres = async () => {
  const response = await fetch(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.genres;
};

// Get now playing movies
export const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get upcoming movies
export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/upcoming?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/top_rated?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get movie videos (trailers, teasers, etc.)
export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.results;
};

// Get movie images (posters, backdrops)
export const getMovieImages = async (movieId) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/images?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};

// Search for people (actors, directors, etc.)
export const searchPeople = async (query, page = 1) => {
  const response = await fetch(
    `${baseUrl}/search/person?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Get person details
export const getPersonDetails = async (personId) => {
  const response = await fetch(
    `${baseUrl}/person/${personId}?api_key=${apiKey}&append_to_response=movie_credits`
  );
  const data = await response.json();
  return data;
};

// Error handling wrapper for API calls
export const fetchWithErrorHandling = async (apiCall) => {
  try {
    return await apiCall();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch data from the movie database");
  }
};
