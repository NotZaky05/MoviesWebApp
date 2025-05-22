import { Heart, Star, Clock } from 'lucide-react'
import "../css/MovieCard.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { useMovieContext } from "../contexts/MovieContexts"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMovieDetails } from "../service/api"

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext()
  const favorite = isFavorite(movie.id)
  const [runtime, setRuntime] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // We'll fetch the runtime only when needed
    const fetchRuntime = async () => {
      if (runtime !== null) return // Already fetched
      
      try {
        setLoading(true)
        const details = await getMovieDetails(movie.id)
        setRuntime(details.runtime || 0)
      } catch (error) {
        console.error("Error fetching movie runtime:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRuntime()
  }, [movie.id, runtime])

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="movie-poster">
          <LazyLoadImage
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            effect="blur"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019`
            }}
          />
          <div className="movie-overlay">
            <button onClick={handleFavoriteClick} className={`favorite-btn ${favorite ? "active" : ""}`}>
              <Heart size={36} fill={favorite ? "currentColor" : "none"} className="heart-icon" />
            </button>
            <button className="details-btn">See Details</button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <div className="movie-meta">
            <div className="movie-rating">
              <Star size={16} className="star-icon" />
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </div>
            <div className="movie-duration">
              <Clock size={16} className="clock-icon" />
              <span>{loading ? "..." : formatRuntime(runtime)}</span>
            </div>
          </div>
          <p className="release-date">{movie.release_date}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
