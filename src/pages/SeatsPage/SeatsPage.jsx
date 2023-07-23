import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Seat from "../../components/Seat"
import FooterSeat from "../../components/FooterSeat"

export default function SeatsPage() {

    const { idSessao } = useParams()
    const [seat, setSeat] = useState([])
    const [day, setDay] = useState([])
    const [movie, setMovie] = useState([])
    const [name, setName] = useState([])


    useEffect(() => {
        const URL = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)


        URL.then((resposta) =>
            setSeat(resposta.data.seats)
        )
        URL.then((resposta) =>
            setName(resposta.data)
        )

        URL.then((resposta) =>
            setDay(resposta.data.day)
        )

        URL.then((resposta) =>
            setMovie(resposta.data.movie)
        )
      
        URL.catch((erro) =>
            console.log(erro.error)
        )

    }, [])

    
    return (
        <PageContainer>
            Selecione o(s) assento(s)


            <Seat 
            seat={seat} 
            
            />





            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle background="#1AAE9E" border="#0E7D71" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle background="#C3CFD9" border="#7B8B99" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle background="#FBE192" border="#F7C52B" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>



            <FooterSeat

                name={name}
                movie={movie}
                day={day}
            />



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
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => `${props.border}`};         // Essa cor deve mudar
    background-color: ${props => `${props.background}`};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

