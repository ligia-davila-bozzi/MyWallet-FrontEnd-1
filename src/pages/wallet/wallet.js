import { RiLogoutBoxRLine } from "react-icons/ri";
import {
    AiOutlinePlusCircle as PlusCircle,
    AiOutlineMinusCircle as MinusCircle
} from "react-icons/ai";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getWallet } from "../../services/API";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

export default function Wallet() {
    const [walletMovements, setWalletMovements] = useState([]);
    const history = useHistory();

    const { token, user } = JSON.parse(localStorage.getItem("session"));
    if (!token) history.push("/");

    useEffect(() => {
        const request = getWallet(token)
            .then(res => setWalletMovements(res.data))
            .catch(() => alert("Houve uma falha ao obter os registros, por favor atualize a página"));
    }, [])
    let totalMoney = 0;
    if(walletMovements.length) totalMoney = walletMovements.reduce((acc, curr) => acc + Number(curr.value), 0);
    
    return (
        <StyledContainer>
            <header>
                <h1><strong>Olá, {user}</strong></h1>
                <RiLogoutBoxRLine />
            </header>
            <StyledWallet isEmpty={!walletMovements.length}>
                {
                    walletMovements.length ?
                        <>
                            <StyledTransactions>
                                {
                                    walletMovements.map(({ date, description, value }, index) => {
                                        const isPositive = (value >= 0);
                                        if (!isPositive) value = -value;
                                        return (
                                            <StyledMove key={index} isPositive={isPositive}>
                                                <div>
                                                    <time date={date}>{dayjs(date).format("DD/MM")}</time>
                                                    <p>{description}</p>
                                                </div>
                                                <h3 >{value}</h3>
                                            </StyledMove>
                                        )
                                    })
                                }
                            </StyledTransactions>
                            <StyledBalance isPositive={totalMoney >= 0}>
                                <h3>SALDO</h3>
                                <h3 className="money">{totalMoney >= 0 ? totalMoney : -totalMoney}</h3>
                            </StyledBalance>
                        </>
                        :
                        <h2>
                            Não há registros de
                            entrada ou saída
                        </h2>
                }

            </StyledWallet>
            <StyledNav>
                <Link to="/entrada">
                    <button>
                        <PlusCircle />
                        Nova entrada
                    </button>
                </Link>
                <Link to="/saida">
                    <button>
                        <MinusCircle />
                        Nova saída
                    </button>
                </Link>
            </StyledNav>
        </StyledContainer>
    );
}

const StyledContainer = styled.main`
width: 85%;
max-width:326px;
height:100vh;
display: flex;
flex-direction: column;
justify-content:space-around;
margin: 0 auto;
    header{
     display:flex;
     justify-content:space-between;
     align-items:center;
     font-family: 'Raleway',sans-serif;
    font-style: normal;
    font-size: 26px;
    color: #FFFFFF;
    }
`
const StyledWallet = styled.ul`
    width: 100%;
    height: 446px;
    background-color:#fff;
    border-radius: 5px;
    padding: 23px 12px;
    display: flex;
    ${props => props.isEmpty ? `
    align-items: center;
    justify-content: center;`
        :
        `flex-direction: column;
    justify-content: space-between;`}
    
    h2{
        font-family: 'Raleway',sans-serif;
        font-size: 20px;
        text-align: center;
        color: #868686;
        width: 180px;
    }
`
const StyledTransactions = styled.div`
display:grid;
row-gap:8px;
`
const StyledBalance = styled.div`
display:flex;
justify-content:space-between;
h3{
    font-family: 'Raleway',sans-serif;
font-weight: bold;
font-size: 17px;
}
.money{
    ${props => props.isPositive ? "color:green;" : "color:red;"}
}
`
const StyledNav = styled.nav`
    display: flex;
    justify-content:space-between;
        a,button{
            display: flex;
            flex-direction: column;
            justify-content:space-around;
            font-family: 'Raleway',sans-serif;
            font-weight: bold;
            font-size: 20px;
            color: #fff;
            width: 48%;
            height: 114px;
            background: #A328D6;
            border-radius: 5px;
            border:none;
        }
`
const StyledMove = styled.li`
display: flex;
justify-content:space-between;
    div{
        display:flex;
        time {
            font-family: 'Raleway',sans-serif;
            font-size: 16px;
            color: #C6C6C6;
            margin-right:8px;
        }
        p{
            font-family: 'Raleway',sans-serif;
            font-size: 16px;
            color: #000000;
        }
    }
    h3{
        ${props => props.isPositive ? "color:green;" : "color:red;"}
    }
`