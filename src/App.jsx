import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { Route, Routes, BrowserRouter, Link } from "react-router-dom"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'ppKoYP82aNEpqAi1j0w5vqDw';
    return (
        <>
            <BrowserRouter>
                <Link to={"/"}>
                    <NavContainer>CINEFLEX</NavContainer>
                </Link>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessao/:idFilme" element={<SessionsPage />} />
                    <Route path="/acentos" element={<SeatsPage />} />
                    <Route path="/sucesso" element={<SuccessPage />} />
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
    margin-left: -7px;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
