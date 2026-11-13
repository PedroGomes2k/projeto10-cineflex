import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"


export default function Form(props) {

    const { seatSelected, movie, day, time, setOrder } = props
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate()

    function buySeat(e) {
        e.preventDefault()

        if (seatSelected.length === 0) {
            alert("Selecione pelo menos um assento")
            return
        }

        // a reserva só é feita na API depois do pagamento (PaymentPage)
        setOrder({
            ids: seatSelected.map((s) => s.id),
            seats: seatSelected.map((s) => s.name),
            title: movie.title,
            posterURL: movie.posterURL,
            date: day.date,
            weekday: day.weekday,
            time: time,
            name: name,
            cpf: cpf
        })

        navigate("/pagamento")

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

            <button type="submit" data-test="book-seat-btn">Ir para o pagamento</button>

        </FormContainer>

    )
}

const FormContainer = styled.form`
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