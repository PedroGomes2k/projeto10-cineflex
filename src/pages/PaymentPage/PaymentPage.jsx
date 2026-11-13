import styled from "styled-components"
import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { PRICE, formatPrice } from "../../constantes/Price"

export default function PaymentPage(props) {

    const { order, setSuccess } = props
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    if (order === undefined) {
        return <Navigate to="/" />
    }

    const total = order.seats.length * PRICE


    function formatCardNumber(value) {
        const numbers = value.replace(/\D/g, "").slice(0, 16)
        return numbers.replace(/(\d{4})(?=\d)/g, "$1 ")
    }

    function formatExpiry(value) {
        const numbers = value.replace(/\D/g, "").slice(0, 4)
        if (numbers.length > 2) {
            return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
        }
        return numbers
    }

    function validCard() {
        const numbers = cardNumber.replace(/\D/g, "")
        if (numbers.length !== 16) {
            alert("O número do cartão precisa ter 16 dígitos")
            return false
        }

        const [month, year] = expiry.split("/").map(Number)
        const today = new Date()
        const currentYear = today.getFullYear() % 100
        const currentMonth = today.getMonth() + 1

        if (!month || month > 12 || !year || year < currentYear || (year === currentYear && month < currentMonth)) {
            alert("Validade do cartão inválida")
            return false
        }

        if (cvv.length < 3) {
            alert("CVV inválido")
            return false
        }

        return true
    }

    function pay(e) {
        e.preventDefault()

        if (!validCard()) {
            return
        }

        setLoading(true)

        // pagamento simulado: os dados do cartão não são enviados nem salvos,
        // só a reserva dos assentos vai para a API
        const URL = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: order.ids,
            name: order.name,
            cpf: order.cpf
        })

        URL.then(() => {
            setSuccess({
                ...order,
                total: total,
                cardEnd: cardNumber.replace(/\D/g, "").slice(-4)
            })
            navigate("/sucesso")
        })

        URL.catch(() => {
            setLoading(false)
            alert("Não foi possível concluir a reserva, tente novamente")
        })
    }


    return (
        <PageContainer>
            Pagamento

            <SummaryContainer data-test="order-summary">
                <div>
                    <img src={order.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{order.title}</p>
                    <p>{order.weekday} - {order.date} - {order.time}</p>
                    <p>Assentos: {order.seats.join(", ")}</p>
                    <p>{order.seats.length} x {formatPrice(PRICE)} = <strong>{formatPrice(total)}</strong></p>
                </div>
            </SummaryContainer>

            <FormContainer onSubmit={pay}>

                <label htmlFor="cardName">Nome impresso no cartão:</label>
                <input
                    id="cardName"
                    placeholder="Digite o nome do cartão..."
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    data-test="card-name"
                />

                <label htmlFor="cardNumber">Número do cartão:</label>
                <input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    required
                    data-test="card-number"
                />

                <RowContainer>
                    <div>
                        <label htmlFor="expiry">Validade:</label>
                        <input
                            id="expiry"
                            placeholder="MM/AA"
                            inputMode="numeric"
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            required
                            data-test="card-expiry"
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            id="cvv"
                            placeholder="123"
                            inputMode="numeric"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            required
                            data-test="card-cvv"
                        />
                    </div>
                </RowContainer>

                <button type="submit" disabled={loading} data-test="pay-btn">
                    {loading ? "Processando..." : `Pagar ${formatPrice(total)}`}
                </button>

            </FormContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SummaryContainer = styled.div`
    width: calc(100vw - 40px);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #C3CFD9;
    border-radius: 5px;
    margin-top: 20px;
    font-size: 16px;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        p {
            margin-bottom: 6px;
        }
        strong {
            font-weight: bold;
        }
    }
`
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

        margin-top: 30px;
    }
    input {
        width: calc(100vw - 60px);
        height: 51px;

        border-radius: 5px;
        border: 1px solid #D4D4D4;
    }
`
const RowContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
        width: 48%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    input {
        width: 100%;
        box-sizing: border-box;
    }
`
