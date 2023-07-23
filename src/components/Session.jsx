import styled from "styled-components"
import { Link } from "react-router-dom"


export default function Session(props) {

    const { date, weekday, showtimes } = props

   
    return (
        <SessionContainer >
            {date} - {weekday}


            <ButtonsContainer>
                {showtimes.map((s) =>
                    <Link to={`/assentos/${s.id}`}  key={s.id}>

                        <button >{s.name}</button>
                    </Link>
        
                )}
            </ButtonsContainer>

        </SessionContainer>

    )

}

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