import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
    return (
        <StyledContainer>
            <StyledTitle>
                MyWallet
            </StyledTitle>
            <StyledForm>
                <StyledInput type="text" placeholder="Nome" required />
                <StyledInput type="email" placeholder="E-mail" required />
                <StyledInput type="password" placeholder="Senha" required />
                <StyledButton type="submit">Entrar</StyledButton>
            </StyledForm>
            <Link to="/"><strong>Já tem uma conta? Entre agora!</strong></Link>
        </StyledContainer>
    );
}

const StyledContainer = styled.main`
display:flex;
flex-direction:column;
width:100%;
height:100vh;
justify-content: center;
align-items: center;
a{
    font-family: 'Raleway',cursive;
    margin-top: 36px;
    font-size: 15px;
    color:#FFFFFF;
}
`

const StyledTitle = styled.h1`
font-family: 'Saira Stencil One',cursive;
font-size: 32px;
color: #FFFFFF;
margin-bottom:24px;
`
const StyledForm = styled.form`
display:grid;
width: 90%;
max-width:326px;
row-gap:13px;

`

const StyledInput = styled.input`
height: 58px;
background: #FFFFFF;
border-radius: 5px;
border:none;
padding-left: 15px;

::placeholder{
    font-family: 'Raleway',cursive;
    font-size: 20px;
    color: #000000;
}

:focus {
    outline-color: #A328D6;
}
`

const StyledButton = styled.button`
height: 46px;
background: #A328D6;
border-radius: 5px;
border:none;
font-family: 'Raleway',cursive;
font-weight:bold;
font-size: 20px;
color:#fff;
`
