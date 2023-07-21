import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function SessionsPage() {

    const { idFilme } = useParams()
    const [session, setSession] = useState([])
    const [time, setTime] = useState([])




    const URL = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)

    useEffect(() => {


        URL.then((resposta) =>
            setSession(resposta.data)

        )

        URL.catch((erro) =>
            console.log(erro.error)
        )

        URL.then((resposta) =>
            setTime(resposta.data.days)

        )



    }, [])

    const { posterURL, title } = session
    const { weekday, id, date ,days } = time

    




    return (
        <PageContainer>
            Selecione o horário


            <div >
                <SessionContainer >
                    { } - { }


                    <ButtonsContainer>

                        <button>{ }</button>
                        <button>15:00</button>


                    </ButtonsContainer>

                </SessionContainer>

            </div>








            <FooterContainer >
                <div>
                    <img src={posterURL} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
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
        width: 82px;
        height: 43px;
        margin-right: 20px;

        background-color: #E8833A;
        color: #FFFFFF;

        border: #E8833A;
        border-radius: 3px;
        font-weight: bold;
    }
    a {
        text-decoration: none;
    }
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