import styled from "styled-components"
import { Link, Navigate } from "react-router-dom"
import { formatPrice } from "../../constantes/Price"

export default function SuccessPage(props) {

    const { success } = props

    if (success === undefined) {
        return <Navigate to="/" />
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{success.title}</p>
                <p>{success.date} - {success.time}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {success.seats.map((s) =>
                    <p key={s}>Assento {s}</p>
                )}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {success.name}</p>
                <p>CPF: {success.cpf}</p>
            </TextContainer>

            <TextContainer data-test="payment-info">
                <strong><p>Pagamento</p></strong>
                <p>Cartão final {success.cardEnd}</p>
                <p>Total: {formatPrice(success.total)}</p>
            </TextContainer>

            <Link to="/" data-test="go-home-btn">
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`
