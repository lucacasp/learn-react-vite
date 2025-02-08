import React from 'react'
import { useForm } from 'react-hook-form'
import './ContactPage.scss'
import renato_2 from '../../../common/temporary_assets/Soggetto_2.png'
type FormInputs = {
    nome: string
    email: string
    messaggio: string
}

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit = (data: FormInputs) => {
        console.log(data)
        // dove lo posso mandare questo form?
        
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
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <button className='form-button' type="submit">Invia</button>
            </form>
            </div>
        </div>
    )
}

export default ContactPage