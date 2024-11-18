import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { FaImdb } from "react-icons/fa";
import { REQ } from "../../utils/constants";
import PropTypes from 'prop-types';
import { Circles } from "react-loader-spinner";

const SimilarMovieSlider = ({ title }) => {
  let { id } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    const fetchMovieMlData = async () => {
      try {
        const { data } = await axios.get(REQ.GET_MOVIE_SIMILAR(id));
        setMovieData(data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieMlData();
  }, [id]);

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

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    ease: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="mt-11 flex flex-col p-4 md:ml-28 backdrop-blur-xl rounded-lg gap-6 overflow-hidden">
        <div className="flex justify-between relative z-10">
          <p className="font-montserrat font-bold text-lg text-white">{title}</p>
        </div>
        <div className="gap-7">
          <Slider {...settings}>
            {movieData?.map((more, index) => {
              if (more.poster_path) {
                return (
                  <div className="relative overflow-hidden group" key={index}>
                    <Link to={`/movie/${more.id}`}>
                      <img
                        className="h-44 w-72 filter drop-shadow-lg rounded transition-transform duration-300 group-hover:scale-105"
                        src={`https://image.tmdb.org/t/p/original/${more?.backdrop_path}`}
                      />
                      <div className="bg-black/50 flex flex-col gap-5 items-center justify-center absolute top-full h-44 w-72 p-2 transition-all duration-300 transform group-hover:top-0 group-hover:translate-y-0">
                        <div className="text-center">
                          <p className="font-montserrat font-bold text-lg text-white truncate">
                            {more?.title}
                          </p>
                          <p className="font-montserrat font-bold text-sm text-gray-400 line-clamp-2 mt-2">
                            {more?.overview}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                          <div className="flex items-center gap-3">
                            <FaImdb className="text-yellow-400" size={28} />
                            <p className="font-montserrat font-bold text-xl text-yellow-400">
                              {more?.vote_average.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                );
              }
            })}
          </Slider>
        </div>
      </section>
    </div>
  );
};

SimilarMovieSlider.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SimilarMovieSlider;
