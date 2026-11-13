import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import PaymentPage from "./pages/PaymentPage/PaymentPage"
import { Link, Route, BrowserRouter, Routes } from "react-router-dom"
import { useState } from "react"
import ResetStyle from "./style/ResetStyle"
import GlobalStyle from "./style/GlobalStyle"

export default function App() {

    const [order, setOrder] = useState(undefined)
    const [success, setSuccess] = useState(undefined)

    return (
        <>
            <ResetStyle />
            <GlobalStyle />
            <BrowserRouter>
                <Link to={"/"}>
                    <NavContainer>CINEFLEX</NavContainer>
                </Link>
                <Routes>
                    <Route path="/" element={<HomePage  />}></Route>
                    <Route path="/sessoes/:idFilme" element={<SessionsPage />}></Route>
                    <Route path="/assentos/:idSessao" element={<SeatsPage setOrder={setOrder} />}></Route>
                    <Route path="/pagamento" element={<PaymentPage order={order} setSuccess={setSuccess} />}></Route>
                    <Route path="/sucesso" element={<SuccessPage success={success} />}></Route>

                </Routes>


            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
