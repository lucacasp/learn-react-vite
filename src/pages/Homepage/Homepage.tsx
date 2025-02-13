import { Link } from 'react-router-dom'
import './homepage.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Modal from '../../components/Modal/Modal'
const Homepage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const allImages = [
        { id: '1', alt: 'Immagine 1', height: 800, fullWidth: true, url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739438306/Nancy-art-5_aq4fjz.webp' },
/*         { id: '2', alt: 'Immagine 2', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-2.webp' },
        { id: '3', alt: 'Immagine 3', height: 800, fullWidth: true, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-3.webp' },
        { id: '4', alt: 'Immagine 4', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-4.webp' },
        { id: '5', alt: 'Immagine 5', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-5.webp' },
        { id: '6', alt: 'Immagine 6', height: 800, fullWidth: true, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-6.webp' },
        { id: '7', alt: 'Immagine 7', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-7.webp' },
        { id: '8', alt: 'Immagine 8', height: 800, fullWidth: true, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-8.webp' },
        { id: '9', alt: 'Immagine 9', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-9.webp' },
        { id: '10', alt: 'Immagine 10', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-10.webp' },
        { id: '11', alt: 'Immagine 11', height: 800, fullWidth: true, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-11.webp' },
        { id: '12', alt: 'Immagine 12', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-12.webp' },
        { id: '13', alt: 'Immagine 13', height: 800, fullWidth: true, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-13.webp' },
        { id: '14', alt: 'Immagine 14', height: 1200, fullWidth: false, url: 'https://res.cloudinary.com/il-tuo-cloud-name/image/upload/v1234567/nome-immagine-14.webp' },
 */        

    ]

    const [visibleImages, setVisibleImages] = useState(allImages.slice(0, 7));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenModal');
        if (!hasSeenModal) {
            setIsModalOpen(true);
            localStorage.setItem('hasSeenModal', 'true');
        }
    }, []);

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
        <Modal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
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
                                src={image.url} 
                                alt={image.alt}
                                className="grid-image" 
                                loading="lazy"
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
        </>
    )
}

export default Homepage