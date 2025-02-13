import { motion } from 'framer-motion'
import './AboutPage.scss'
import renato from '../../../common/temporary_assets/Soggetto.png'
        
const AboutPage = () => {
    return (
        <div className='aboutpage'>
            <div className='container-aboutpage'>
              <motion.div 
                className='container-photo'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                <img src="https://picsum.photos/500/600" alt="renato" />
              </motion.div>
              <motion.div 
                className='container-text'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              >
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              </motion.div>
            </div>
        </div>
    )
}

export default AboutPage