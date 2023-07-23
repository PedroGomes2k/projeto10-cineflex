import { useState } from "react"
import styled from "styled-components"

export default function Seat(props) {

    const { seat } = props

    const [background, setBackground] = useState("#C3CFD9")
    const [border, setBorder] = useState("#7B8B99")

    
    //isAvailable


    return (

        <SeatsContainer>
            {seat.map((s) =>

                <SeatItem
                    key={s.id}
                    background={background}
                    border={border}
                   
                //onClick={() => teste()}
                >

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
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color:  ${props => props.background};    // Essa cor deve mudar
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