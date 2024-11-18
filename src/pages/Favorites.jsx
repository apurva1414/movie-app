import { useEffect, useState } from 'react';
import { Layout } from '../components/ui';
import Card from '../components/ui/Card';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, [favorites]);

    return (
        <Layout>
            <div className="p-4 flex justify-center items-center">
                <div className="w-[90%]">
                    <h1 className="text-2xl font-semibold mb-8 text-white">Favorites</h1>
                    {favorites.length === 0 ? (
                        <div className='flex justify-center items-center h-[70vh]'>
                            <p className='text-white'>No favorites added yet. Start adding some!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[70vh]">
                            {favorites.map(movie => (
                                <div key={movie.id} className="relative">
                                    <Card movies={movie} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Favorites;