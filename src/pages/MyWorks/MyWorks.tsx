import Masonry from 'react-masonry-css'
import { Link } from 'react-router-dom'
import './myworks.scss'
const MyWorks = () => {
    const images = [
        { id: '237', alt: 'Immagine 1', height: 500, title: 'Street' },
        { id: '238', alt: 'Immagine 2', height: 800, title: 'Coffee & Car' },
        { id: '239', alt: 'Immagine 3', height: 1000, title: 'Ritratti' },
    ]
    return (
        <>
        <div className='container-myworks'>
            <div className='container-myworks-title'>
                <h1>Ultimi lavori</h1>
            </div>
        </div>
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
                    <Link key={index} to={`/image/${image.id}`} className="image-container">
                        <img 
                            src={`https://picsum.photos/id/${image.id}/600/${image.height}`} 
                            alt={image.alt}
                            className="grid-image" 
                        />
                        <div className="image-overlay">
                            <h3>{image.title}</h3>
                        </div>
                    </Link>
                ))}
            </Masonry>
        </>
    )

}

export default MyWorks;