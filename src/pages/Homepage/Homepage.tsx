import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './homepage.scss'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '../../components/Modal/Modal'
import _ from 'lodash'
import { Gallery } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import { useInView } from 'react-intersection-observer'

interface ImageType {
    id: string;
    alt: string;
    className: string;
    fullWidth: boolean;
    layout: 'full' | 'half';
    url: string;
    blurUrl?: string; // URL per l'immagine blur/placeholder
}

const Homepage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleImages, setVisibleImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Intersection Observer per infinite scroll
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // Memorizza allImages per evitare ri-renderizzazioni non necessarie
    const allImages: ImageType[] = useMemo(() => [
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
    ], []);

    // Gestione modale iniziale
    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenModal');
        if (!hasSeenModal) {
            setIsModalOpen(true);
            localStorage.setItem('hasSeenModal', 'true');
        }
    }, []);

    // Caricamento immagini ottimizzato
    const loadMoreImages = async () => {
        try {
            setLoading(true);
            setError(null);

            const nextIndex = visibleImages.length;
            if (nextIndex >= allImages.length) {
                setLoading(false);
                return;
            }

            const nextImages = allImages.slice(nextIndex, nextIndex + 7);
            const newImages = nextImages.filter(newImg => 
                !visibleImages.some(visImg => visImg.id === newImg.id)
            );

            // Simula il caricamento progressivo
            for (let i = 0; i <= 100; i += 20) {
                await new Promise(resolve => setTimeout(resolve, 100));
                setLoadingProgress(i);
            }

            setVisibleImages(prev => [...prev, ...newImages]);
        } catch (err) {
            setError('Errore nel caricamento delle immagini');
            console.error('Errore:', err);
        } finally {
            setLoading(false);
            setLoadingProgress(0);
        }
    };

    // Gestione scroll infinito
    useEffect(() => {
        if (inView && !loading && visibleImages.length < allImages.length) {
            loadMoreImages();
        }
    }, [inView, loading]);

    // Componente immagine ottimizzato
    const ImageComponent = React.memo(({ image }: { image: ImageType }) => (
        <motion.div
            className={`image-wrapper ${image.layout === 'half' ? 'half-width' : 'full-width'}`}
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
                    srcSet={`
                        ${image.url} 300w,
                        ${image.url} 600w,
                        ${image.url} 900w
                    `}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    onError={(e) => {
                        e.currentTarget.src = 'placeholder.jpg'; // Aggiungi un'immagine placeholder
                    }}
                />
            </div>
        </motion.div>
    ));

    const renderImages = () => {
        let halfWidthBuffer: ImageType[] = [];
        const renderedContent: JSX.Element[] = [];

        visibleImages.forEach((image, index) => {
            if (image.layout === 'half') {
                halfWidthBuffer.push(image);
                if (halfWidthBuffer.length === 2) {
                    renderedContent.push(
                        <div key={`half-pair-${index}`} className="half-width-container">
                            {halfWidthBuffer.map((halfImage) => (
                                <ImageComponent key={`image-${halfImage.id}`} image={halfImage} />
                            ))}
                        </div>
                    );
                    halfWidthBuffer = [];
                }
            } else {
                if (halfWidthBuffer.length > 0) {
                    renderedContent.push(
                        <div key={`half-single-${index}`} className="half-width-container">
                            {halfWidthBuffer.map((halfImage) => (
                                <ImageComponent key={`image-${halfImage.id}`} image={halfImage} />
                            ))}
                        </div>
                    );
                    halfWidthBuffer = [];
                }
                renderedContent.push(<ImageComponent key={`image-${image.id}`} image={image} />);
            }
        });

        if (halfWidthBuffer.length > 0) {
            renderedContent.push(
                <div key="half-final" className="half-width-container">
                    {halfWidthBuffer.map((halfImage) => (
                        <ImageComponent key={`image-${halfImage.id}`} image={halfImage} />
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
            <Gallery>
                <div className="homepage-container">
                    <div className="images-grid">
                        {renderImages()}
                    </div>

                    <AnimatePresence>
                        {loading && (
                            <motion.div 
                                className="loading-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="loading-bar">
                                    <div 
                                        className="loading-progress"
                                        style={{ width: `${loadingProgress}%` }}
                                    />
                                </div>
                                <p>Caricamento... {loadingProgress}%</p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div 
                                className="error-message"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Elemento di riferimento per infinite scroll */}
                    <div ref={ref} style={{ height: '20px', margin: '20px 0' }} />
                </div>
            </Gallery>
        </>
    )
}

export default React.memo(Homepage)