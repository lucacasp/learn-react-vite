import { Link } from 'react-router-dom'
import './homepage.scss'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Homepage = () => {
    const allImages = [
        { id: '237', alt: 'Immagine 1', height: 300 },
        { id: '238', alt: 'Immagine 2', height: 1000 },
        { id: '239', alt: 'Immagine 3', height: 350 },
        { id: '240', alt: 'Immagine 4', height: 1300 },
        { id: '241', alt: 'Immagine 5', height: 800 },
        { id: '242', alt: 'Immagine 6', height: 500 },
        { id: '243', alt: 'Immagine 7', height: 900 },
        { id: '244', alt: 'Immagine 8', height: 400 },
        { id: '845', alt: 'Immagine 9', height: 700 },
        { id: '399', alt: 'Immagine 10', height: 420 },
        { id: '400', alt: 'Immagine 11', height: 300 },
        { id: '401', alt: 'Immagine 12', height: 380 },
        { id: '402', alt: 'Immagine 13', height: 300 },
        { id: '403', alt: 'Immagine 14', height: 300 },
        { id: '404', alt: 'Immagine 15', height: 300 },
        { id: '405', alt: 'Immagine 16', height: 800 },
        { id: '406', alt: 'Immagine 17', height: 300 },
        { id: '407', alt: 'Immagine 18', height: 300 },
        { id: '408', alt: 'Immagine 19', height: 800 },
        { id: '409', alt: 'Immagine 20', height: 1200 },
        { id: '410', alt: 'Immagine 21', height: 1200 },
        { id: '411', alt: 'Immagine 22', height: 300 },
        { id: '412', alt: 'Immagine 23', height: 300 },
        { id: '413', alt: 'Immagine 24', height: 300 },

    ]

    const [visibleImages, setVisibleImages] = useState(allImages.slice(0, 7));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleImages, loading]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight
        ) {
            loadMoreImages();
        }
    };

    const loadMoreImages = () => {
        if (loading) return;
        if (visibleImages.length >= allImages.length) {
            console.log('Tutte le immagini sono state caricate');
            return;
        }

        setLoading(true);
        const nextImages = allImages.slice(
            visibleImages.length,
            visibleImages.length + 7
        );
        setVisibleImages(prev => [...prev, ...nextImages]);
        setLoading(false);
    };

    return (
        <>
        <div>
            <Masonry
                breakpointCols={{
                    default: 3,
                    1100: 3,
                    700: 2,
                    500: 1
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {visibleImages.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.5,
                            delay: index % 3 * 0.1 // crea un effetto a cascata
                        }}
                    >
                        <Link to={`/image/${image.id}`}>
                            <img 
                                src={`https://picsum.photos/id/${image.id}/600/${image.height}`} 
                                alt={image.alt}
                                className="grid-image" 
                            />
                        </Link>
                    </motion.div>
                ))}
            </Masonry>

            {loading && (
                <motion.div 
                    className="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    Caricamento...
                </motion.div>
            )}

            {visibleImages.length >= allImages.length && (
                <motion.div 
                    className="no-more-images"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                </motion.div>
            )}

            <motion.div 
                className="latest-works"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <Link to="/latest-works">
                    <p>Ultimi lavori</p>
                </Link>
            </motion.div>
        </div>
        </>
    )
}

export default Homepage