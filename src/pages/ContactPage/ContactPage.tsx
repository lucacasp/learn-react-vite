import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import './ContactPage.scss'
import renato_2 from '../../../common/temporary_assets/Soggetto_2.png'
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

    const onSubmit = (data: FormInputs) => {
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
        
        emailjs.send(
            'service_s2wbim4',
            'template_f8yfyeg',
            templateParams,
            'gv7ugeSJdtBl5oGXJ'
        )
        .then((result) => {
            console.log('Email inviata con successo:', result.text)
            setSubmitStatus('success')
            reset()
        })
        .catch((error) => {
            console.error('Errore nell\'invio dell\'email:', error.text)
            setSubmitStatus('error')
        })
        .finally(() => {
            setIsSubmitting(false)
        })
    }

    return (
        <div className="contact-page">
            {/* <h1>Contattami</h1> */}
            <div className='form-container'>
                <div className='form-container-side'>
                        <div className='form-container-side-title'>
                            <h1>Contattami</h1>
                        </div>
                        <img src={renato_2} alt="logo" />
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
            <div className="form-container-socials">
                <div className="form-container-socials-title">
                <h2>Seguimi:</h2>
                <div className="social-links">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                    </a>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage