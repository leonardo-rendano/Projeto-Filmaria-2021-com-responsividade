import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './filme-info.css'
import { toast } from 'react-toastify'

export default function Filme() {

    const { id } = useParams()
    const history = useHistory()

    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadFilme() {
            const response = await api.get(`r-api/?api=filmes/${id}`)

            //Verifica se houve uma tentativa de acesso a um ID que não existe e retorna para a HOME
            if (response.data.length === 0) {
                history.replace('/')
                return
            }

            setFilme(response.data)
            setLoading(false)
            
        }
        loadFilme()

        return () => {
            console.log('Componente desmontado')
        }

    }, [id, history])

    function salvaFilme() {
        const minhaLista = localStorage.getItem('filme')

        const filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id)

        if (hasFilme) {
            toast.error('Este filme já foi adicionado a sua lista!')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('filme', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')
    }


    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando...</h1>
            </div>
        )
    }

 return (
    <div className="filme-info">
        <h1>{filme.nome}</h1>
        <img src={filme.foto} alt={filme.nome} />
        <h3>Sinopse</h3>
        {filme.sinopse}

        <div className="botoes">
            <button onClick={salvaFilme}>Salvar</button>

            <button>
                <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} trailer`}>
                    Trailer
                </a>
            </button>
        </div>

    </div>
 );
}