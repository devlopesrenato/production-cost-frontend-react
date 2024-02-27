import styled from 'styled-components'
import * as Global from '../../../styles/globalStyles'

const ActionArea = styled.div`
    display: flex;
    width: 100%;
    max-width: 760px;
    justify-content: flex-end;
    margin-bottom: 10px;
`
const ButtonEdit = styled.div`
    color: #000091;
    &:hover {
        cursor: pointer; 
    }
`

const ButtonDelete = styled.div`
    color: #ab0000;
    &:hover {
        cursor: pointer; 
    }
`

export {
    Global,
    ActionArea,
    ButtonEdit,
    ButtonDelete
}