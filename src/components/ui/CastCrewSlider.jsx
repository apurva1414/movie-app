import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { IoIosPlay } from "react-icons/io";
import Slider from "react-slick";
import ReactPlayer from "react-player/youtube";
import { REQ } from "../../utils/constants";
import CastCard from "./CastCard";
import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const CastCrewSlider = ({ title, subTitle }) => {
  let { id } = useParams();

  const [movieCastData, setMovieCastData] = useState([]);
  const [movieVideoData, setMovieVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const sliderContainerRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState("75vw");

  useEffect(() => {
    const updateSliderWidth = () => {
      if (sliderContainerRef.current) {
        const containerWidth = sliderContainerRef.current.offsetWidth;
        setSliderWidth(containerWidth > 600 ? `${containerWidth}px` : "100%");
      }
    };

    updateSliderWidth();
    window.addEventListener("resize", updateSliderWidth);

    return () => {
      window.removeEventListener("resize", updateSliderWidth);
    };
  }, []);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const castPromise = axios.get(REQ?.GET_MOVIE_CAST(id));
        const videoPromise = axios.get(REQ?.GET_MOVIE_VIDEOS(id));

        const [castResponse, videoResponse] = await Promise.all([castPromise, videoPromise]);

        setMovieCastData(castResponse.data.cast);
        setMovieVideoData(videoResponse.data.results[0]);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const settings = {
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
      <section className="flex flex-col md:flex-row mx-30 mt-11 mb-24 p-7 bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-lg rounded-2xl gap-24">
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-montserrat font-bold text-lg text-white">{title}</p>
          </div>
          {movieVideoData &&
            <section className="flex justify-center items-center w-80 rounded-2xl">
              <ReactPlayer
                light
                controls
                playing
                playIcon={
                  <div className='flex justify-center items-center h-full w-full'>
                    <div className='bg-gray-100 flex justify-center items-center h-8 w-8 rounded-full text-purple-800'>
                      <IoIosPlay color={"#5436A9"} size={56} />
                    </div>
                  </div>
                }
                width={"307px"}
                height={"170px"}
                url={`https://www.youtube.com/watch?v=${movieVideoData.key}`}
              />
            </section>
          }
        </div>

        <div className="flex flex-col gap-2 mb-12">
          <div>
            <p className='font-montserrat font-bold text-lg text-white'>{subTitle}</p>
          </div>
          <div ref={sliderContainerRef} className='overflow-hidden' style={{ width: sliderWidth }}>
            <Slider {...settings}>
              {movieCastData?.map((cast) => {
                if (cast.profile_path) {
                  return <CastCard key={cast.id} casts={cast} />;
                }
                return null;
              })}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

CastCrewSlider.propTypes = {
  movie_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CastCrewSlider;
