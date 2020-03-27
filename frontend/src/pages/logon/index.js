import React,{useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Logon(){
    const [id,setId] = useState('')
    const history = useHistory()
    async function handleLogin(e){
        e.preventDefault()
        try {
            const response = await api.post('sessions',{ id })
            console.log(response)
            localStorage.setItem('ongId',id)
            localStorage.setItem('ongName',response.data.ong.name)
            history.push('/profile')
        } catch (err) {
            alert('Falha no login!')
            setId('')
        }
    }
    return(
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        value={id}
                        placeholder="Sua ID"
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size="16" color="#E02031"/>
                        Não tenho cadastro
                    </Link>
                </form>
           </section>
           <img src={heroesImg} alt="Heroes"></img>
       </div>
    )
}