import React,{useState} from 'react'

import './style.css'
import Logoimg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'
export default function NewIncident(){

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [value,setValue] = useState('')
    const history = useHistory()
    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(e){
        e.preventDefault()
        const data = {
            title,
            description,
            value,
        }
        try{
            console.log(ongId)
            await api.post('incident',data,{
                headers:{
                    Authorization: ongId
                }
            })
            alert('Cadastro realizado com sucesso!')
            history.push('/profile')
        }catch(err)
        {
            alert('Erro no cadastro, tente novamente!')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content"> 
                <section>
                    <img src={Logoimg} alt="Be The Hero"></img>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft     size="16" color="#E02031"/>
                        Voltar para home.
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                        value={title}
                        placeholder="Título do caso"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        value={description}
                        placeholder="Descrição"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text"
                        value={value}
                        placeholder="Valor em Reais"
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}