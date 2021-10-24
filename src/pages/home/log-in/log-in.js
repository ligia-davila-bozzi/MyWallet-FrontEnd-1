import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logIn } from "../../../services/API";
import {
    StyledButton,
    StyledContainer,
    StyledForm,
    StyledInput,
    StyledTitle,
} from '../style.js';
export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const requestBody = {
        "email": email,
        "password": password,
    }
    useEffect(() => {
        if (localStorage.getItem("session") !== null) {
            const userName = JSON.parse(localStorage.getItem("session")).user;
           const reponse = window.confirm(`Você deseja continuar como ${userName}?`);
            if (reponse) history.push("/carteira"); else localStorage.removeItem("session");
        }
    })

    function errorAlert(error) {
        if (error.status === 404) {
            alert("O e-mail não existe em nosso banco de dados");
        } else if (error.status === 401) {
            alert("Senha incorreta!")
        } else {
            alert("Não foi possível logar")
        };

    }
    function requestLogIn(e) {
        e.preventDefault();
        setIsLoading(true);
        const passwordRegex = new RegExp(/^[a-zA-Z0-9]{8,}$/);
        if (!passwordRegex.test(password)) {
            alert("A senha deve ser alfanuméria e ter pelo menos 8 dígitos");
            setIsLoading(false);
            return;
        }

        const request = logIn(requestBody);
        request.then((res) => {
            const session = JSON.stringify(res.data);
            localStorage.setItem('session', session);
            history.push("/carteira");
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
                requestLogIn(e);
            }}>
                <StyledInput placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <StyledInput placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <StyledButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Carregando..." : "Entrar"}</StyledButton>
            </StyledForm>
            <Link to="/cadastro"><strong>Primeira vez? Cadastre-se!</strong></Link>
        </StyledContainer>
    );
}