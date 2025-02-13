import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import './contactpage.scss'
import renato_2 from '../../../common/temporary_assets/renato_3.png'
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'
type FormInputs = {
    nome: string
    email: string
    messaggio: string
}

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>()
    const form = useRef<HTMLFormElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [showModal, setShowModal] = useState(false)

    const onSubmit = async (data: FormInputs) => {
        try {
            setIsSubmitting(true)
            setSubmitStatus('idle')
            
            const templateParams = {
                from_name: data.nome,
                from_email: data.email,
                message: data.messaggio,
                to_name: 'Renato',
                reply_to: data.email,
                to_email: 'bobyesone@gmail.com'
            }
            
            const result = await emailjs.send(
                'service_s2wbim4',
                'template_f8yfyeg',
                templateParams,
                'gv7ugeSJdtBl5oGXJ'
            )
            
            console.log('Email inviata con successo:', result.text)
            setShowModal(true)
            setSubmitStatus('success')
            reset()
        } catch (error) {
            console.error('Errore nell\'invio dell\'email:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="contact-page">
            <div className='form-container'>
                <div className='contact-page-infos'>
                <div className='contact-page-infos-title'>
                    <p>INSTAGRAM - @beeroomagency </p>
                    <p>EMAIL - beeroomagency@gmail.com</p>
                    <p>TELEFONO - +39 ___</p>
                    <p>CITTA' - Napoli, Italia</p>
                </div>
                
            </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input 
                        id="nome"
                        {...register("nome", { required: "Il nome è obbligatorio" })} 
                    />
                    {errors.nome && <span className="error">{errors.nome.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email"
                        {...register("email", { 
                            required: "L'email è obbligatoria",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Indirizzo email non valido"
                            }
                        })} 
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="messaggio">Messaggio</label>
                    <textarea 
                        id="messaggio"
                        {...register("messaggio", { required: "Il messaggio è obbligatorio" })} 
                    />
                    {errors.messaggio && <span className="error">{errors.messaggio.message}</span>}
                </div>

                {isSubmitting && <p>Invio in corso...</p>}
                {submitStatus === 'success' && <p className="success">Messaggio inviato con successo!</p>}
                {submitStatus === 'error' && <p className="error">Errore nell'invio del messaggio. Riprova più tardi.</p>}
                <button className='form-button' type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Invio in corso...' : 'Invia'}
                </button>
            </form>
            </div>
        
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Email Inviata!</h3>
                        <p>La tua email è stata inviata con successo.</p>
                        <button className='btn' onClick={closeModal}>Chiudi</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactPage