import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        <>
          <h2>Your Favorites</h2>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="favorites-empty">
          <h2>No Favorites Yet</h2>
          <p>You don't have any favorites yet. Please add some first.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
