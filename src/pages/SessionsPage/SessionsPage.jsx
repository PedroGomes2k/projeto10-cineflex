import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

export default function SessionsPage() {
    const [filme, setFilme] = useState([])
    const [horario, setHorario] = useState(undefined)

    const parametros = useParams()


    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`
        const promise = axios.get(URL)

        promise.then((resposta) => {

            setFilme(resposta.data)
            setHorario(resposta.data)


        })
        promise.catch((erro) => {
            console.log(erro.resposta.data)
        })

    }, [])

    if (horario === undefined) {
        return (
            <div>Carregando...</div>
        )

    }

    return (
        <PageContainer>
            Selecione o horário

            <div>
                {horario.days.map(props =>

                    <SessionContainer key={props.date}>

                        <p> {`${props.weekday} - ${props.date}`}</p>


                        <ButtonsContainer >
                            {props.showtimes.map((props) =>
                                <Link to={`/assentos/${props.id}`} key={props.name} data-test="showtime">
                                    <button>{props.name}</button>
                                </Link>
                            )}
                        </ButtonsContainer>

                    </SessionContainer>


                )}
            </div>

            <FooterContainer>
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )

}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;

    
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        width: 83px;
        height: 43px;
        margin-right: 20px;
        
        color: #FFFFFF;
        background-color: #E8833A;
        border-radius: 3px ;
    }
    a {
        
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #DFE6ED;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    margin-left: -7px;
    border: 1px solid #9EADBA;

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