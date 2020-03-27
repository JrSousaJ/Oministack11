import React, {useState, useEffect} from 'react'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'
import './style.css'
export default function Profile(){
    
    const [incidents, setIncidents] = useState([])

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const history = useHistory()
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization:ongId,
            }
        }).then(response => {
            
            setIncidents(response.data.incidents)
        })
    },[ongId])
    async function handleDeleteFunction(id){
        try {
            await api.delete(`incident/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident=>incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso!')
            
        }
    }
    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link class="button" to="/incidents/new">Cadastro novo caso</Link>
                <button onClick={handleLogout}type="button"><FiPower size={18} color="#E02041"/></button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteFunction(incident.id)}type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}