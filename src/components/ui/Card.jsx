import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaImdb, FaHeart } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";

const Card = ({ movies }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isInFavorites = favorites.some((fav) => fav.id === movies.id);
    setIsFavorite(isInFavorites);
  }, [movies.id]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== movies.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(movies);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full md:w-[200px]">
      <section className="w-full">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Link to={`/movie/${movies.id}`}>
            <img
              className="w-full h-[237px] md:h-[280px] object-cover"
              src={`https://image.tmdb.org/t/p/w185/${movies?.poster_path}`}
              alt={movies?.original_title}
            />
          </Link>
        </div>

        <div className="mt-2">
          <Link to={`/movie/${movies.id}`}>
            <p className="text-white text-sm md:text-base font-semibold truncate">
              {movies?.original_title}
            </p>
          </Link>
        </div>

        <div className="text-gray-400 text-xs md:text-sm">
          <p>{new Date(movies?.release_date).getFullYear()}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <FaImdb className="text-yellow-500 text-lg md:text-xl" />
            <p className="text-yellow-500 font-bold text-sm md:text-base">
              {movies?.vote_average}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <BsEye className="text-gray-200 text-sm md:text-base" />
            {/* Actions */}
            <div className="flex space-x-2">
              <BsEye className="text-gray-200 text-sm md:text-base" />
              <FaHeart
                className={`text-sm md:text-base cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-200"
                  }`}
                onClick={handleFavoriteToggle}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
Card.propTypes = {
  movies: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default Card;
