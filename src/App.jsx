import NavBar from "./components/Navbar"
import Favorites from "./pages/Favorites.jsx"
import Home from "./pages/Home.jsx"
import MovieDetails from "./pages/MovieDetails.jsx"
import { Route, Routes } from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContexts.jsx"
import "./css/App.css"

const App = () => {
  return (
    <MovieProvider>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
