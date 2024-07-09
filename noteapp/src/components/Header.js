import styled  from 'styled-components'
import './Header.css' 
import { useContext } from 'react'
import { ThemeContext } from '../App'

const StyledHeader = styled.header`
    color:${(p)=>p.theme.colors.defaultFont};
    h1{
        background:${(p)=>p.theme.colors.headerH1};
        font-weight:${(p)=>p.theme.colors.h1Weight}
    }
`

export default function Header({title, leftChild, rightChild }){
    const theme = useContext(ThemeContext);
    console.log(theme.colors.headerH1)
    return(
        <StyledHeader id="header" theme={theme}>
            
            <div className='leftChild'>{leftChild}</div>
            <h1>{title}</h1>
            <div className='rightChild'>{rightChild}</div>
        </StyledHeader>
    )
}