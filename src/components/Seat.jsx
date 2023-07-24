import { useState } from "react"
import styled from "styled-components"
import { Colors } from "../constantes/Colors"
import { useEffect } from "react"

export default function Seat(props) {

    const { seat, choseSeat, Selected } = props
    const { id, isAvailable, name } = seat
    const { isSelected, avilable, unAvilable } = Colors
    const [status, setStatus] = useState("available")

   
    useEffect(() => {
        if (Selected) {
            setStatus("selected")
        } else if (isAvailable) {
            setStatus("available")
        } else {
            setStatus("unAvilable")
        }
    }, [choseSeat]
    )



    return (

        <SeatItem

            status={status}
            isSelected={isSelected}
            avilable={avilable}
            unAvilable={unAvilable}
            onClick={() => choseSeat()}
            data-test="seat"
        >
            {name}
        </SeatItem>

    )
}


const SeatItem = styled.div`

    border: 1px solid ${props => {
        if (props.status === "selected") {
            return `${props.isSelected.border}`
        } else if (props.status === "available") {
            return `${props.avilable.border}`
        } else if (props.status === "unAvilable") {
            return `${props.unAvilable.border}`
        }
    }};
    background: ${props => {
        if (props.status === "selected") {
            return `${props.isSelected.background}`
        } else if (props.status === "available") {
            return `${props.avilable.background}`
        } else if (props.status === "unAvilable") {
            return `${props.unAvilable.background}`
        }
    }};
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