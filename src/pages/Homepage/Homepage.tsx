import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Modal from '../../components/Modal/Modal'
const Homepage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const allImages = [
        { id: '1', alt: 'Immagine 1', className: 'height-large', fullWidth: true, layout: 'full', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473505/Nancy_art-5_ehlhze.jpg' },
        { id: '2', alt: 'Immagine 2', className: 'height-medium', fullWidth: false, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473505/Nancy_art-2_ntad6o.jpg' },
        { id: '3', alt: 'Immagine 3', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473506/Nancy_art-6_civpql.jpg' },
        { id: '4', alt: 'Immagine 4', className: 'height-medium', fullWidth: true, layout: 'full', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473511/REN02466_oruicg.jpg' },
        { id: '5', alt: 'Immagine 5', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473512/REN02509_co1tjd.jpg' },
        { id: '6', alt: 'Immagine 6', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473507/Porsche_911_Carrera._R.C._wdwzwu.jpg' },
        { id: '7', alt: 'Immagine 7', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473508/Gucci-6_kwndpc.jpg' },
        { id: '8', alt: 'Immagine 8', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473507/Gucci-5_bb5rqm.jpg' },
        { id: '9', alt: 'Immagine 9', className: 'height-medium', fullWidth: true, layout: 'full', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473507/04072023-DSC09392_phpg2r.jpg' },
        { id: '10', alt: 'Immagine 10', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473512/THORE-37_qejpas.jpg' },
        { id: '11', alt: 'Immagine 11', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473511/REN02308_2_rwwrg0.jpg' },
        { id: '12', alt: 'Immagine 12', className: 'height-medium', fullWidth: true, layout: 'full', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473509/REN01835_h905xe.jpg' },
        { id: '13', alt: 'Immagine 13', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473508/Red_Chiara_pnnw9s.jpg' },
        { id: '14', alt: 'Immagine 14', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473508/REN01599_mlo85y.jpg' },
        { id: '15', alt: 'Immagine 15', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473506/Gaia-4_nsq2qb.jpg' },
        { id: '16', alt: 'Immagine 17', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473512/THORE-66_yl3acj.jpg' },
        { id: '17', alt: 'Immagine 16', className: 'height-medium', fullWidth: true, layout: 'half', url: 'https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473507/06082023-DSC09490_zsb8q7.jpg' },
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
        const handleScroll = () => {
            if (loading) return;
            if (visibleImages.length >= allImages.length) return;
            
            if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
                loadMoreImages();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleImages, loading, allImages.length]);

    const loadMoreImages = () => {
        setLoading(true);
        setTimeout(() => {
            const nextImages = allImages.slice(
                visibleImages.length,
                visibleImages.length + 7
            );
            setVisibleImages(prev => [...prev, ...nextImages]);
            setLoading(false);
        }, 500);
    };

    const renderImages = () => {
        let halfWidthBuffer = [];
        const renderedContent = [];

        visibleImages.forEach((image, index) => {
            if (image.layout === 'half') {
                halfWidthBuffer.push(image);
                if (halfWidthBuffer.length === 2) {
                    renderedContent.push(
                        <div key={`half-pair-${index}`} className="half-width-container">
                            {halfWidthBuffer.map((halfImage) => (
                                <motion.div
                                    key={`image-${halfImage.id}`}
                                    className="image-wrapper half-width"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="image-container">
                                        <img 
                                            src={halfImage.url} 
                                            alt={halfImage.alt}
                                            className={`grid-image ${halfImage.className}`}
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    );
                    halfWidthBuffer = [];
                }
            } else {
                // Se c'è un'immagine half non accoppiata, renderizzala comunque
                if (halfWidthBuffer.length > 0) {
                    renderedContent.push(
                        <div key={`half-single-${index}`} className="half-width-container">
                            {halfWidthBuffer.map((halfImage) => (
                                <motion.div
                                    key={`image-${halfImage.id}`}
                                    className="image-wrapper half-width"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="image-container">
                                        <img 
                                            src={halfImage.url} 
                                            alt={halfImage.alt}
                                            className={`grid-image ${halfImage.className}`}
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    );
                    halfWidthBuffer = [];
                }

                renderedContent.push(
                    <motion.div
                        key={`image-${image.id}`}
                        className="image-wrapper full-width"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="image-container">
                            <img 
                                src={image.url} 
                                alt={image.alt}
                                className={`grid-image ${image.className}`}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                );
            }
        });

        // Gestisce eventuali immagini half rimanenti alla fine
        if (halfWidthBuffer.length > 0) {
            renderedContent.push(
                <div key="half-final" className="half-width-container">
                    {halfWidthBuffer.map((halfImage) => (
                        <motion.div
                            key={`image-${halfImage.id}`}
                            className="image-wrapper half-width"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="image-container">
                                <img 
                                    src={halfImage.url} 
                                    alt={halfImage.alt}
                                    className={`grid-image ${halfImage.className}`}
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            );
        }

        return renderedContent;
    };

    return (
        <>
        <Modal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        <div className="homepage-container">
            <div className="images-grid">
                {renderImages()}
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

            {/* <motion.div 
                className="latest-works"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <Link to="/latest-works">
                    <p>Ultimi lavori</p>
                </Link>
            </motion.div> */}
        </div>
        </>
    )
}

export default Homepage