import { useState } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import './modal.scss';

interface MaintenanceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MaintenanceModal = ({ isOpen, onClose }: MaintenanceModalProps) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#e4e2e2',
            border: 'none',
            padding: '2rem',
            width: '100%',
            height: '90%',
            textAlign: 'center' as const,
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
        }
    };

    Modal.setAppElement('#root'); // Assicurati che questo selettore corrisponda al tuo elemento root

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Sito in Manutenzione"
        >
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ 
                    type: "spring",
                    damping: 25,
                    stiffness: 200
                }}
            >
                <h2 className="modal-title">Sito in Manutenzione</h2>
                <p className="modal-description">
                    Stiamo lavorando per migliorare la tua esperienza. 
                    Torneremo presto online con nuovi contenuti!
                </p>
                <button 
                    onClick={onClose}
                    className="btn"
                >
                    Chiudi
                </button>
            </motion.div>
        </Modal>
    );
};

export default MaintenanceModal;