import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import signUp from "../../../services/API";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const requestBody = {
        "email": email,
        "password": password,
        "name": username,
        "repeat_password": repeatPassword,
    }
    function errorAlert(error) {
        console.log(error);
        if (error.status === 409) {
            alert("O e-mail escolhido já está em uso. Por favor escolha outro.");
        }
        else {
            alert("Não foi possível concluir o cadastro")
        };

    }
    function requestSignUp(e) {
        e.preventDefault();
        setIsLoading(true);
        const passwordRegex = new RegExp(/^[a-zA-Z0-9]{8,}$/);
        if (password !== repeatPassword) {
            alert("A senha e a confirmação devem ser iguais");
            setIsLoading(false);
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("A senha deve ser alfanuméria e ter pelo menos 8 dígitos");
            setIsLoading(false);
            return;
        }

        const request = signUp(requestBody);
        request.then((res) => {
            const token = JSON.stringify(res.data);
            localStorage.setItem('token', token);
            history.push("/");
        })
            .catch(err => {
                errorAlert(err.response)
                setIsLoading(false);
            });
    }

    return (
        <StyledContainer>
            <StyledTitle>
                MyWallet
            </StyledTitle>
            <StyledForm onSubmit={(e) => {
                setIsLoading(true);
                requestSignUp(e);
            }}>
                <StyledInput type="text" placeholder="Nome" value={username} onChange={e => setUsername(e.target.value)} required />
                <StyledInput placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <StyledInput placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <StyledInput placeholder="Confirme a senha" type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} required />
                <StyledButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Carregando..." : "Entrar"}</StyledButton>
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
font-family: 'Raleway',cursive;
font-size: 20px;
color: #000000;

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
