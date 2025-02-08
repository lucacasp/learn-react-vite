import { motion } from 'framer-motion'
import './AboutPage.scss'
import renato from '../../../common/temporary_assets/Soggetto.png'
        
const AboutPage = () => {
    return (
        <div className='aboutpage'>
            <div className='container-aboutpage'>
                <div className='container-text'>
                <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span>Mi chiamo Renato.</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span>Sono un fotografo e un videomaker.</span>
            </motion.p>
            
                </div>
            

            <motion.div 
                className='container-photo'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.8,
                    delay: 0.3,
                    ease: "easeOut"
                }}
            >
                <img src={renato} alt="renato" />
            </motion.div>

            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
            </motion.div>
        </div>
    )
}

export default AboutPage