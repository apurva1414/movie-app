import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { IoIosArrowDown } from 'react-icons/io';
import { REQ } from '../../utils/constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const LoadMoreMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [genre, setGenre] = useState('');
    const [yearRange, setYearRange] = useState([2000, 2024]);
    const [ratingRange, setRatingRange] = useState([0, 10]);

    const fetchMovies = async (pageNum, genre, yearRange, ratingRange) => {
        setLoading(true);
        try {
            const response = await axios.get(REQ.GET_ALL_MOVIE(pageNum), {
                params: {
                    with_genres: genre,
                    'primary_release_date.gte': yearRange[0],
                    'primary_release_date.lte': yearRange[1],
                    'vote_average.gte': ratingRange[0],
                    'vote_average.lte': ratingRange[1],
                },
            });
            const data = response.data;

            setMovies((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
            setHasMore(data.page < data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [genre, yearRange, ratingRange]);

    useEffect(() => {
        fetchMovies(page, genre, yearRange, ratingRange);
    }, [page, genre, yearRange, ratingRange]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const generateYearOptions = () => {
        const years = [];
        for (let year = 1900; year <= 2024; year++) {
            years.push(year);
        }
        return years;
    };

    return (
        <div className="p-4 flex flex-col justify-center items-center min-w-full">
            <div className="w-full sm:w-[90%] mb-10 p-5 flex flex-col sm:flex-row justify-between items-center sm:items-start">
                <h1 className="text-lg font-bold text-white mb-4 sm:mb-0">POPULAR MOVIES</h1>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 w-full sm:w-auto">

                    {/* Genre Filter */}
                    <select
                        className="p-2 px-4 rounded bg-gray-800 text-white h-max w-full sm:w-auto"
                        onChange={(e) => setGenre(e.target.value)}
                        value={genre}
                    >
                        <option value="">Select Genre</option>
                        <option value="28">Action</option>
                        <option value="35">Comedy</option>
                        <option value="18">Drama</option>
                        <option value="12">Adventure</option>
                        <option value="878">Science Fiction</option>
                        <option value="53">Thriller</option>
                        <option value="10749">Romance</option>
                        <option value="80">Crime</option>
                    </select>

                    {/* Year Range Filter - Dropdowns */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <span className="text-white mb-2 sm:mb-0">Year:</span>
                        <select
                            className="p-2 rounded bg-gray-700 text-white w-full sm:w-32"
                            value={yearRange[0]}
                            onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                        >
                            {generateYearOptions().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <span className="text-white mx-2">to</span>
                        <select
                            className="p-2 rounded bg-gray-700 text-white w-full sm:w-32"
                            value={yearRange[1]}
                            onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                        >
                            {generateYearOptions().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rating Range Filter */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <span className="text-white mb-2 sm:mb-0 mr-3">Rating:</span>
                        <Slider
                            range
                            value={ratingRange}
                            min={0}
                            max={10}
                            onChange={(range) => setRatingRange(range)}
                            style={{
                                width: '200px',
                            }}
                            railStyle={{ backgroundColor: '#ddd' }}
                            handleStyle={[
                                { backgroundColor: '#581c87' },
                                { backgroundColor: '#581c87' },
                            ]}
                            trackStyle={[{ backgroundColor: '#581c87' }]}
                        />
                        <div className="text-white whitespace-nowrap mt-2 sm:mt-0">
                            {ratingRange[0]} to {ratingRange[1]}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-[90%] p-5">
                {movies.map((movie) => (
                    <Card key={movie.id} movies={movie} />
                ))}
            </div>
            {loading && <button className="flex gap-2 justify-center items-center bg-[#5436A9] rounded-full py-3 px-6 font-montserrat font-bold text-lg text-[#E3E3E3] my-9">
                Loading... <IoIosArrowDown size={20} id="wl-icons" />
            </button>}
        </div>
    );
};

export default LoadMoreMovies;