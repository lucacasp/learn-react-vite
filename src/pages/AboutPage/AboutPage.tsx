import { motion } from 'framer-motion'
import './aboutpage.scss'
        
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
                <img src="https://res.cloudinary.com/dtyxqrcrx/image/upload/v1739473508/IMG_8011_ktqjzl.jpg" alt="renato" />
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
                <p>Renato Camera (b. 1994) is a Naples born cinematographer and photographer.</p>
                <p>He works all around Italy and he's currently based in Naples.</p>
              </motion.div>
            </div>
        </div>
    )
}

export default AboutPage