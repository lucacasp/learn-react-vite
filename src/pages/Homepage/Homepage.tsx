import { Link } from 'react-router-dom'
import './homepage.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Homepage = () => {
    const allImages = [
        { id: '237', alt: 'Immagine 1', height: 800, fullWidth: true },
        { id: '238', alt: 'Immagine 2', height: 1200, fullWidth: false },
        { id: '239', alt: 'Immagine 3', height: 1200, fullWidth: false },
        { id: '240', alt: 'Immagine 4', height: 800, fullWidth: true },
        { id: '241', alt: 'Immagine 5', height: 1200, fullWidth: false },
        { id: '242', alt: 'Immagine 6', height: 1200, fullWidth: false },
        { id: '243', alt: 'Immagine 7', height: 800, fullWidth: true },
        { id: '244', alt: 'Immagine 8', height: 1200, fullWidth: false },
        { id: '247', alt: 'Immagine 11', height: 1200, fullWidth: false },
        { id: '248', alt: 'Immagine 12', height: 1200, fullWidth: false },
        

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
        <div className="homepage-container">
            <div className="images-grid">
                {visibleImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className={`image-wrapper ${image.fullWidth ? 'full-width' : 'half-width'}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.5,
                            delay: index * 0.1
                        }}
                    >
                        <div 
                            className="image-container" 
                            onClick={() => window.location.href = `/image/${image.id}`}
                        >
                            <img 
                                src={`https://picsum.photos/id/${image.id}/1200/${image.height}`} 
                                alt={image.alt}
                                className="grid-image" 
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

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
    )
}

export default Homepage