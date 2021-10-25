import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components"
import { postWallet } from "../../services/API";

export default function EntryTransaction() {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const history = useHistory();
    const { token } = JSON.parse(localStorage.getItem("session"));
    if (!token) history.push("/");

    function requestTransaction(e) {
        e.preventDefault();
        if (value <= 0) {
            setIsLoading(false);
            alert('Valor inválido, por favor digite um número maior que zero');
            return;
        }
        const body = {
            "value":Number(value),
            "description":description,
        }
        const request = postWallet(body,token)
        .then(()=>{
            alert('Valor registrádo com sucesso!');
            history.push("/carteira")
        })
        .catch((err)=>{
            console.log(err.message);
            alert("Houve um erro ao adicionar registro" );
            setIsLoading(false);
        })
    }
    return (
        <StyledContainer>
            <header>
                <h1><strong>Nova entrada</strong></h1>
            </header>
            <StyledForm onSubmit={(e) => {
                setIsLoading(true);
                requestTransaction(e);
            }}>
                <StyledInput placeholder="Valor" type="number" value={value} onChange={e => setValue(e.target.value)} required />
                <StyledInput placeholder="Descrição" type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                <StyledButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Carregando..." : "Salvar entrada"}</StyledButton>
            </StyledForm>
        </StyledContainer>

    )
}

const StyledContainer = styled.main`
width: 85%;
max-width:326px;
height:100vh;
margin: 0 auto;
    header{
        margin: 25px 0 40px;
     display:flex;
     justify-content:space-between;
     align-items:center;
     font-family: 'Raleway',sans-serif;
    font-style: normal;
    font-size: 26px;
    color: #FFFFFF;
    }
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