import { motion } from 'framer-motion'
import './AboutPage.scss'
import renato from '../../../common/temporary_assets/Soggetto.png'
        
const AboutPage = () => {
    return (
        <div className='aboutpage'>
            <div className='container-aboutpage'>
              <div className='container-photo'>
                <img src="https://picsum.photos/500/600" alt="renato" />
              </div>
              <div className='container-text'>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              </div>
            </div>
        </div>
    )
}

export default AboutPage