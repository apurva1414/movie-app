import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import Card from "./Card.jsx";
import Slider from "react-slick";
import { REQ } from "../../utils/constants.js";
import { Circles } from "react-loader-spinner";

const MovieSlider = ({ type, title }) => {
  const [moviesByType, setMoviesByType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieByTypeData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(REQ?.GET_MOVIE_DATA_BY_TYPE(type));
        setMoviesByType(data.results);
      } catch (error) {
        console.error("Error fetching movies by type:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieByTypeData();
  }, []);

  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "red" }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "green" }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  let settings = {
    dots: false,
    infinite: true,
    // draggable:false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    easse: "linear",
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
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
    <div>
      <section
        className={`mt-11 flex flex-col p-6  ${type === "popular" ? "bg-opacity-70 shadow-lg bg-[#06080B]" : "bg-black"
          } md:ml-28 backdrop-blur-md rounded-lg gap-6 overflow-hidden`}
      >
        {type === "popular" && (
          <div className="flex justify-between relative z-[80]">
            <p className="flex items-center whitespace-nowrap font-montserrat font-bold text-lg leading-[22px] text-white">
              {title}
            </p>
            <div className="items-center gap-[23px] hidden md:flex">
              <button className="flex items-center justify-center gap-2.5 bg-[#5C5C5C] text-white rounded-full px-7 py-2.5 font-montserrat font-semibold text-sm leading-5 border-none">
                FILTER <IoIosArrowDown color="#FAFAFA" size={28} />
              </button>
            </div>
          </div>
        )}

        {type === "284052/similar" && (
          <div>
            <div className="sb-haed flex justify-between items-center">
              <p className="text-lg font-bold text-white">{title}</p>
            </div>
            <div className="sb-button flex flex-wrap gap-4 mt-4">
              {["Hindi", "Bengali", "Marathi", "Assamese", "Telugu", "Tamil", "Malayalam"].map((lang, idx) => (
                <button
                  key={idx}
                  className={`px-6 py-2 rounded-full text-white text-sm font-medium ${lang === "Hindi" || lang === "Tamil" ? "bg-red-600" : "bg-gray-600"
                    }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {type === "top_rated" && (
          <div className="sb-haed">
            <p className="text-lg font-bold text-white">{title}</p>
          </div>
        )}

        <Slider {...settings}>
          {moviesByType.map((movie) => (
            <Card key={movie.id} movies={movie} />
          ))}
        </Slider>
      </section>
    </div>
  );
};

MovieSlider.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieSlider;
