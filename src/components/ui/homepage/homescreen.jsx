import { useState, useEffect } from "react";
import axios from "axios";
import { BsPlayFill, BsDownload } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { FaImdb } from "react-icons/fa";
import { REQ } from "../../../utils/constants";
import PropTypes from 'prop-types';
import { Circles } from "react-loader-spinner";

const HomeScreen = ({ id, movie_id }) => {
  const [movieId, setMovieId] = useState("284052");
  const [apiMovData, setMovApiData] = useState([]);
  const [apiImgData, setImgApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMovieId(movie_id || "284052");

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [movieResponse, imageResponse] = await Promise.all([
          axios.get(REQ.GET_MOVIE_DATA_BY_ID(movieId)),
          axios.get(REQ.GET_MOVIE_IMAGE_BY_ID(movieId)),
        ]);

        if (movieResponse.status === 200) {
          setMovApiData(movieResponse.data);
          setImgApiData(imageResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movie_id, movieId]);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#581c87"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 h-[90vh] z-0">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${apiImgData?.backdrops[0]?.file_path}`}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-start px-6 sm:px-10 lg:px-20 pt-10 lg:pt-16 gap-6 sm:gap-8 z-20">
        {/* Logo */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <img
            className="w-64 sm:w-[500px] h-auto"
            src={`https://image.tmdb.org/t/p/original/${apiImgData?.logos[0]?.file_path}`}
            alt=""
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6 text-white max-w-lg">
          {/* Overview */}
          <p className="text-sm md:text-base lg:text-lg leading-5 sm:leading-6 line-clamp-3">
            {apiMovData?.overview}
          </p>

          {/* Genres */}
          <div>
            <h3 className="text-lg font-semibold text-red-500">GENRES</h3>
            <p className="text-base font-semibold">{apiMovData?.genres[0]?.name}</p>
          </div>

          {/* Watchlist Buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full">
              WATCH <BsPlayFill size={20} />
            </button>
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-full">
              MY LIST <MdAdd size={20} />
            </button>
            {movieId === id && (
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-full">
                <BsDownload size={20} />
              </button>
            )}
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-4">
            <FaImdb size={40} className="text-yellow-500" />
            <p className="font-bold text-xl">{apiMovData?.vote_average}</p>
            <p className="border border-white rounded px-2 py-1">U/A</p>
            <p className="border border-white rounded px-2 py-1">4K</p>
            <p className="text-gray-400">{new Date(apiMovData?.release_date).getFullYear()}</p>
          </div>

          {movieId === id && (
            <>
              {/* Audio */}
              <div>
                <h3 className="text-lg font-semibold text-red-500">AUDIO</h3>
                <p className="text-base font-semibold">{apiMovData?.spoken_languages[0]?.english_name}</p>
              </div>

              {/* Subtitles */}
              <div>
                <h3 className="text-lg font-semibold text-red-500">SUBTITLES</h3>
                <p className="text-base font-semibold">{apiMovData?.spoken_languages[0]?.english_name}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

HomeScreen.propTypes = {
  id: PropTypes.string.isRequired,
  movie_id: PropTypes.string,
};

export default HomeScreen;
