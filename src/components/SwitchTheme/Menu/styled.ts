import styled from 'styled-components'
import * as Global from '../../../styles/globalStyles'

const NavBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 1001;
    padding: 0 10px;
    height: 40px;
    background-color: #001529;
    gap: 5px;
`

const NavBarMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const Menu = styled.div`
    top: 40px;
    position: fixed;
    z-index: 1001;
`

const Title = styled.h2`
   color: #FFFFFF !important;
`
const MenuBackground = styled.div`
    @media (max-width: 1250px) {
        display: flex;
        background-color: #0403036e;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
    }
  
    @media (min-width: 701px) and (max-width: 1250px) {
    }
`;

export {
    Global,
    NavBar,
    NavBarMenu,
    Title,
    Menu,
    MenuBackground,
}