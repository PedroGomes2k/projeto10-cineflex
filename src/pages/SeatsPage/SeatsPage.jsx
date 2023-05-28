import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

export default function SeatsPage() {
    const [sessao, setSessao] = useState([])
    const [acento, setAcento] = useState([])
    const [filme, setFilme] = useState([])
    const [nome, setNome] = useState([])
    const [cpf, setCPF] = useState([])
    const [cor, setcor] = useState([])



    const parametros = useParams()


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`

        const promise = axios.get(url)

        promise.then((resposta) => {

            setFilme(resposta.data.movie)
            setSessao(resposta.data.day)
            setAcento(resposta.data.seats)

        }
        )
        promise.catch((erro) => {

            console.log(erro.reposta.data)
        })

    }, [])

    console.log(acento)
    return (

        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {acento.map((props) => 

                    {
                        props.isAvailable === true ? (

                            <SeatItem key={props.id}>

                                {props.name}

                            </SeatItem>) :
                            <SeatItemIndisponivel data-test="seat" key={props.id} onClick={() => alert("Acento indisponivel!! Escolha outro porfavor :)")}>

                                {props.name}
                            </SeatItemIndisponivel>
                    }


                

                )}

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleSelecionado />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleIndisponivel />
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


            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                    <p> {`${sessao.weekday} - ${sessao.date}`}</p>
                </div>
            </FooterContainer>


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
    border: 1px solid blue;         
    background-color: #C3CFD9; 
    border-color: #7B8B99;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleSelecionado = styled.div`
    border: 1px solid blue;         
    background-color: #1AAE9E; 
    border-color: #0E7D71;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleIndisponivel = styled.div`
    border: 1px solid blue;         
    background-color: #FBE192; 
    border-color: #F7C52B;
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
const SeatItem = styled.div`
    border: 1px solid blue;         
    background-color: lightblue;    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    

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
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`