import styled from "styled-components"
import { Colors } from "../../constantes/Colors"

export default function Caption() {

    const { isSelected, avilable, unAvilable } = Colors
    return (

        <CaptionContainer>
            <CaptionItem>
                <CaptionCircle status="selected" isSelected={isSelected} />
                Selecionado
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle status="avilable" avilable={avilable} />
                Disponível
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle status="unAvilable" unAvilable={unAvilable} />
                Indisponível
            </CaptionItem>
        </CaptionContainer>
    )
}

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => {
        if (props.status === "selected") {
            return `${props.isSelected.border}`
        } else if (props.status === "avilable") {
            return `${props.avilable.border}`
        } else {
            return `${props.unAvilable.border}`
        }
    }};         
    background-color: ${props => {
        if (props.status === "selected") {
            return `${props.isSelected.background}`
        } else if (props.status === "avilable") {
            return `${props.avilable.background}`
        } else {
            return `${props.unAvilable.background}`
        }
    }};    
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