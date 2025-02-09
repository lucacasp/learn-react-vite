import { Link } from 'react-router-dom'
import './homepage.scss'
import Masonry from 'react-masonry-css'

const Homepage = () => {
    const images = [
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
        { id: '401', alt: 'Immagine 12', height: 380 }
    ]

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
                {images.map((image, index) => (
                    <Link key={index} to={`/image/${image.id}`}>
                        <img 
                            src={`https://picsum.photos/id/${image.id}/600/${image.height}`} 
                            alt={image.alt}
                            className="grid-image" 
                        />
                    </Link>
                ))}
            </Masonry>

            <div className="latest-works">
                <Link to="/latest-works">
                    <p>Ultimi lavori</p>
                </Link>
            </div>
        </div>
       
       
        </>
    )
}

export default Homepage