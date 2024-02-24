import styled from 'styled-components'
import * as Global from '../../styles/globalStyles'

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
    color: ${({ theme }) => theme.colors.textColor};  
`
export {
    Global,
    Container,
    Logo,
    Title
}