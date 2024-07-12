import styled  from 'styled-components'
import './Header.css' 
import { useContext } from 'react'
import {  ThemeContext } from '../App'

const StyledHeader = styled.header`
    color:${(p)=>p.theme.colors.defaultFont};
    h1{
        background:${(p)=>p.theme.colors.headerH1};
        font-weight:${(p)=>p.theme.colors.h1Weight}
    }
    a{
        box-shadow:${(p)=>p.theme.colors.defaultShadow}; 
    }
    a.edit{
        background:${(p)=>p.theme.colors.editBtn}; 
    }
    a.add{
        background:${(p)=>p.theme.colors.addBtn}; 
    }
 
    button.add{
        background:${(p)=>p.theme.colors.addBtn}; 
    }
`

export default function Header({title, leftChild, rightChild }){
    const theme = useContext(ThemeContext); 
 
    return(
        <StyledHeader  id="header" theme={theme}>
            
            <div className='leftChild'>{leftChild}</div>
            <h1>{title}</h1>
            <div className='rightChild'>{rightChild}</div>
        </StyledHeader>
    )
}