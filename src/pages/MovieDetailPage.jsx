import { useEffect, useState } from 'react';
import { Layout } from '../components/ui';
import { HomeScreen } from '../components/ui/homepage';
import { useParams } from 'react-router-dom';
import CastCrewSlider from '../components/ui/CastCrewSlider';
import SimilarMovieSlider from '../components/ui/SimilarMovieSlider';

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movieId, setMovieId] = useState(id);

    useEffect(() => {
        if (id) {
            setMovieId(id);
        }
    }, [id]);

    return (
        <Layout>
            <HomeScreen id={id} movie_id={movieId} />
            <CastCrewSlider subTitle="CAST AND CREW INFO" title="TRAILER" />
            <SimilarMovieSlider title="MORE LIKE THIS" type="similar" play="videos" />
        </Layout>
    );
};

export default MovieDetailPage;