/* TO BE DEFINED */
/* WORK IN PROGRESS */
/* TO BE DEFINED */


/* PRENDERE NUOVE REFERENCES */


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import './myworks.scss';

const MyWorks = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const images = [
        { id: '237', alt: 'Immagine 1', title: 'Street', description: 'Fotografia di strada' },
        { id: '238', alt: 'Immagine 2', title: 'Coffee & Car', description: 'Auto e caffè' },
        { id: '239', alt: 'Immagine 3', title: 'Ritratti', description: 'Servizi fotografici personali' },
    ];

    return (
        <div className='container-myworks'>
            <div className='container-myworks-title'>
                <h1>Ultimi lavori</h1>
            </div>
            
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {images.map((image, index) => (
                    <div key={index} className="carousel-item">
                        <Link to={`/image/${image.id}`}>
                            <div className="image-container">
                                <img
                                    src={`https://picsum.photos/id/${image.id}/1200/800`}
                                    alt={image.alt}
                                />
                                <div className="image-overlay">
                                    <h3>{image.title}</h3>
                                    <p>{image.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default MyWorks;