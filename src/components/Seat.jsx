import { useState } from "react"
import styled from "styled-components"
import { Colors } from "../constantes/Colors"

export default function Seat(props) {

    const { isSelected, avilable, unAvilable } = Colors
    const { seat, choseSeat } = props


    //isAvailable


    return (

        <SeatsContainer>
            {seat.map((s) =>

                <SeatItem key={s.id}  onClick={() => choseSeat(s.id)}>

                    {s.name}
                </SeatItem>
            )}
        </SeatsContainer>




    )
}
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const SeatItem = styled.div`
    border: 1px solid ;
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