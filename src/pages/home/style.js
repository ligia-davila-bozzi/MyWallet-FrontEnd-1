import styled from "styled-components";

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
export {
    StyledButton,
    StyledContainer,
    StyledForm,
    StyledInput,
    StyledTitle,
}