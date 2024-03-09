import styled from 'styled-components'
import * as Global from '../../styles/globalStyles'

const Header = styled.div`
    display: flex;  
    flex-direction: row-reverse;  
    width: 100%;
    align-items: center;
    position: fixed;
    height: 40px;
    padding: 0 10px;
    background-color: #001529;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    `
const Logo = styled.img`
    width: 280px;
    margin: 30px 0;
    align-self: center;
`

const Title = styled.h1`
    margin-top: 20px;      
    font-size: 25px;
    margin: 0;
    padding: 0;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;  
    width: 90%;
    max-width: 300px;  
    border-radius: 25px;
`
export {
    Global,
    Container,
    Logo,
    Title,
    Form,
    Header
}