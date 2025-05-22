import { Heart, Clock, Star } from 'lucide-react';
import "../css/MovieCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useMovieContext } from "../contexts/MovieContexts";

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // Format runtime dari menit ke jam dan menit
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}j ${mins}m`;
  };

  // Format rating ke satu angka desimal
  const formatRating = (rating) => {
    if (!rating) return "N/A";
    return rating.toFixed(1);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <LazyLoadImage
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          effect="blur"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019`;
          }}
        />
        <div className="movie-overlay">
          <button
            onClick={handleFavoriteClick}
            className={`favorite-btn ${favorite ? "active" : ""}`}
          >
            <Heart size={24} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        <div className="movie-details">
          <div className="movie-runtime">
            <Clock size={16} />
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
          <div className="movie-rating">
            <Star size={16} fill="currentColor" />
            <span>{formatRating(movie.vote_average)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
