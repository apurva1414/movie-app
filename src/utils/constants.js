export const SERVER = "https://api.themoviedb.org/3/movie/";
export const API_KEY = "7a6e110a340d0908688b03ce0569944f";

export const REQ = {
  NOW_PLAYING: SERVER + `now_playing?api_key=${API_KEY}&language=US`,
  GET_MOVIE_CAST: (movieId) => SERVER + `${movieId}/credits?api_key=${API_KEY}`,
  GET_MOVIE_VIDEOS: (movieId) =>
    SERVER + `${movieId}/videos?api_key=${API_KEY}`,
  GET_MOVIE_SIMILAR: (movieId) =>
    SERVER + `${movieId}/similar?api_key=${API_KEY}`,
  GET_MOVIE_DATA_BY_TYPE: (movieType) =>
    SERVER + `${movieType}?api_key=${API_KEY}`,
  GET_MOVIE_DATA_BY_ID: (movieId) => SERVER + `${movieId}?api_key=${API_KEY}`,
  GET_MOVIE_IMAGE_BY_ID: (movieId) =>
    SERVER + `${movieId}/images?api_key=${API_KEY}`,
  GET_ALL_MOVIE: (pageNo) =>
    SERVER + `popular?api_key=${API_KEY}&page=${pageNo}`,
};
