"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Heart } from "react-feather"
import "./MovieDetails.css"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        )
        if (!response.ok) {
          throw new Error("Failed to fetch movie details")
        }
        const data = await response.json()
        setMovie(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  useEffect(() => {
    // Check if the movie is in local storage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
    const isFavorite = favorites.some((favMovie) => favMovie.id === Number.parseInt(id))
    setFavorite(isFavorite)
  }, [id])

  const handleFavoriteClick = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []

    if (favorite) {
      // Remove from favorites
      favorites = favorites.filter((favMovie) => favMovie.id !== Number.parseInt(id))
    } else {
      // Add to favorites
      if (movie) {
        favorites.push(movie)
      }
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
    setFavorite(!favorite)
  }

  if (loading) {
    return <div className="loading">Loading movie details...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!movie) {
    return <div className="no-movie">Movie not found.</div>
  }

  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-overview">{movie.overview}</p>
        <p className="movie-release-date">Release Date: {movie.release_date}</p>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        <button onClick={handleFavoriteClick} className={`favorite-btn details-favorite ${favorite ? "active" : ""}`}>
          <Heart size={24} fill={favorite ? "currentColor" : "none"} className="heart-icon" />
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  )
}

export default MovieDetails
