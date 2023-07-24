import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"


export default function Form(props) {
    // https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many
    const { seatSelected } = props
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate()

    function buySeat(e) {
        e.preventDefault()
        const ids = seatSelected.map((s) => s.id)

        const URL = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: ids,
            name: name,
            cpf: cpf

        })

        URL.then(() => navigate("/sucesso"))

    }


    return (

        <FormContainer onSubmit={buySeat}>

            <label htmlFor="name">  Nome do Comprador:</label>

            <input

                placeholder="Digite seu nome..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-test="client-name"

            />

            <label htmlFor="cpf">CPF do Comprador: </label>

            <input
                placeholder="Digite seu CPF..."
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                data-test="client-cpf"

            />

            <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>

        </FormContainer>

    )
}

const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        width: 225px;
        height: 42px;
        align-self: center;

        color: #FFFFFF;
        border:1px solid #E8833A;
        border-radius: 5px;
        background-color: #E8833A;

        margin-top: 60px;
    }
    input {
        width: 327px;
        height: 51px;
        width: calc(100vw - 60px);

        border-radius: 5px;
        border: 1px solid #D4D4D4;
    }
`