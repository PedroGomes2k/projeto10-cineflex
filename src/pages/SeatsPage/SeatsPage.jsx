import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Seat from "../../components/Seat"
import FooterSeat from "../../components/FooterSeat"
import Form from "./Form"

import Caption from "./Caption"

export default function SeatsPage() {

    const { idSessao } = useParams()
    const [seat, setSeat] = useState([])
    const [day, setDay] = useState([])
    const [movie, setMovie] = useState([])
    const [name, setName] = useState([])
    


    useEffect(() => {
        const URL = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)


        URL.then((res) =>
            setSeat(res.data.seats)
        )
        URL.then((res) =>
            setName(res.data)
        )

        URL.then((res) =>
            setDay(res.data.day)
        )

        URL.then((res) =>
            setMovie(res.data.movie)
        )

        URL.catch((erro) =>
            console.log(erro.error)
        )

        


    }, [])

    
    function choseSeat(s){
      if(!seat.isAvailable){
        alert("Este ascento esta indisponivel!!")
      } else {
        console.log("esse esta disponivel")
      }

    }


    return (
        <PageContainer>
            Selecione o(s) assento(s)


            <Seat seat={seat} choseSeat={choseSeat}/>

            <Caption />

            <Form />

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




