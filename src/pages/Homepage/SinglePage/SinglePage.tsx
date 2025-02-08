import { useParams } from 'react-router-dom'
import './SinglePage.scss'

const SinglePage = () => {
    const params = useParams()
    console.log('Params ricevuti:', params)
    
    const { imageId } = params
    console.log('ImageId:', imageId)
    
    if (!imageId) {
        return <div>Immagine non trovata</div>
    }
    
    return (
        <div className="single-page">
            <img 
                src={`https://picsum.photos/id/${imageId}/800/600`} 
                alt={`Immagine ${imageId}`} 
            />
        </div>
    )
}

export default SinglePage