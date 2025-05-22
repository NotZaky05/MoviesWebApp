"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetails } from "../service/api"
import { Heart } from "lucide-react"
import { useMovieContext } from "../contexts/MovieContexts"
import "../css/MovieDetails.css"

const MovieDetails = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const details = await getMovieDetails(movieId)
        setMovie(details)
      } catch (err) {
        console.error("Error fetching movie details:", err)
        setError("Failed to load movie details")
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      // Add animation class before removing from favorites
      const heartIcon = document.querySelector(".details-favorite .heart-icon")
      if (heartIcon) {
        heartIcon.style.animation = "heartFadeOut 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
        // Wait for animation to complete before updating state
        setTimeout(() => {
          removeFromFavorites(movie.id)
        }, 300)
      } else {
        removeFromFavorites(movie.id)
      }
    } else {
      addToFavorites(movie)
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (!movie) return <div className="not-found">Movie not found</div>

  const favorite = isFavorite(movie.id)

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Format budget and revenue to USD
  const formatCurrency = (amount) => {
    if (!amount) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get director from credits
  const director = movie.credits?.crew?.find((person) => person.job === "Director")

  // Get top cast members
  const topCast = movie.credits?.cast?.slice(0, 5) || []

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={handleGoBack}>
        < Back
      </button>

      <div className="movie-details">
        <div className="movie-details-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019`
            }}
          />
          <button
            onClick={handleFavoriteClick}
            className={`details-favorite ${favorite ? "active" : ""}`}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={24}
              fill={favorite ? "currentColor" : "none"}
              className="heart-icon"
              onAnimationEnd={(e) => (e.target.style.animation = "")}
            />
            <span>{favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
          </button>
        </div>

        <div className="movie-details-info">
          <h1>
            {movie.title} <span className="year">({movie.release_date?.substring(0, 4)})</span>
          </h1>

          <div className="movie-meta">
            <span className="release-date">{movie.release_date}</span>
            {movie.runtime > 0 && <span className="runtime">{formatRuntime(movie.runtime)}</span>}
            <span className="rating">Rating: {movie.vote_average?.toFixed(1)}/10</span>
          </div>

          <div className="genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="tagline">{movie.tagline}</div>

          <div className="section">
            <h2>Overview</h2>
            <p>{movie.overview || "No overview available."}</p>
          </div>

          {director && (
            <div className="section">
              <h2>Director</h2>
              <p>{director.name}</p>
            </div>
          )}

          {topCast.length > 0 && (
            <div className="section">
              <h2>Cast</h2>
              <div className="cast-list">
                {topCast.map((person) => (
                  <div key={person.id} className="cast-member">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019`
                      }
                      alt={person.name}
                    />
                    <div>
                      <div className="actor-name">{person.name}</div>
                      <div className="character-name">{person.character}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="additional-info">
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value">{movie.status}</span>
            </div>
            <div className="info-item">
              <span className="label">Budget:</span>
              <span className="value">{formatCurrency(movie.budget)}</span>
            </div>
            <div className="info-item">
              <span className="label">Revenue:</span>
              <span className="value">{formatCurrency(movie.revenue)}</span>
            </div>
            {movie.production_companies?.length > 0 && (
              <div className="info-item">
                <span className="label">Production:</span>
                <span className="value">{movie.production_companies.map((company) => company.name).join(", ")}</span>
              </div>
            )}
          </div>

          {movie.videos?.results?.length > 0 && (
            <div className="section">
              <h2>Trailers</h2>
              <div className="trailers">
                {movie.videos.results
                  .filter((video) => video.type === "Trailer" && video.site === "YouTube")
                  .slice(0, 1)
                  .map((video) => (
                    <div key={video.id} className="trailer">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
