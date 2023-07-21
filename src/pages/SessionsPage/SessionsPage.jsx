import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Session from "../../components/Session"

export default function SessionsPage() {

    const { idFilme } = useParams()
    const [session, setSession] = useState([])
    const [time, setTime] = useState([])
    const { posterURL, title } = session

    useEffect(() => {
        const URL = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)


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
    

    return (
        <PageContainer>
            Selecione o horário

            {time.map((t) =>
                <Session
                    key={t.id}
                    date={t.date}
                    weekday={t.weekday}
                    showtimes={t.showtimes}
                />
            )}


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