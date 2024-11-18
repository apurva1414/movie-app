import { Layout } from '../components/ui';
import { HomeScreen } from '../components/ui/homepage';
import MovieSlider from '../components/ui/MovieSlider';
import LoadMoreMovies from '../components/ui/LoadMoreMovies';

const DefaultHomePage = () => (
  <Layout>
    <HomeScreen movie_id="284052" />
    <MovieSlider type="284052/similar" title="RECOMMENDED MOVIES FOR YOU" />
    <MovieSlider type="popular" title="MOVIES YOU MUST WATCH" />
    <MovieSlider type="top_rated" title="BOLLYWOOD CLASSIC" />
    <LoadMoreMovies />
  </Layout>
);

export default DefaultHomePage;