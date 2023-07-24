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
    const [seats, setSeat] = useState(undefined)
    const [seatSelected, setSeatSelected] = useState([])
    const [day, setDay] = useState([])
    const [movie, setMovie] = useState([])
    const [name, setName] = useState([])



    useEffect(() => {
        const URL = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)


        URL.then((res) =>
            setSeat(res.data)
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


    function choseSeat(chose) {
        
        if (!chose.isAvailable) {
            alert("Este assento não está disonível")
        } else {
            const Selected = seatSelected.some((s) => s.id === chose.id)

            if (Selected) {
                const newSeat = seatSelected.filter((s) => s.id !== chose.id)
                
                setSeatSelected(newSeat)

            } else {
                setSeatSelected([...seatSelected, chose])
            }

        }

    }
    


    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {seats && seats.seats.map((sts) =>
                    <Seat
                        seat={sts}
                        choseSeat={() => choseSeat(sts)}
                        Selected={seatSelected.some((s) => s.id === sts.id)}
                        key={sts.id}

                    />
                )}
            </SeatsContainer>

            <Caption />

            <Form
                seatSelected={seatSelected}
            />

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



