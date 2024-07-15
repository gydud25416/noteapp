import { Link, useNavigate   } from 'react-router-dom'
import './NoteItem.css'
import axios from 'axios';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import {Tooltip} from  'react-tooltip';

const StyledDiv = styled.div`
    background:${(p)=>p.theme.colors.defaultBg}; 
    box-shadow:${(p)=>p.theme.colors.defaultShadow}; 

    h1{
        color:${(p)=>p.theme.colors.defaultFont}; 
    }

    a p{
        color:${(p)=>p.theme.colors.defaultLight}; 
    }

    button.delete{
        background:${(p)=>p.theme.colors.deleteBtn}; 
    }
    button.edit{
        background:${(p)=>p.theme.colors.editBtn}; 
    }

`

export default function NoteItem({delData,  it}){ 
    const theme = useContext(ThemeContext);
    const navigate = useNavigate(null);
    function onDelete(){
        if(window.confirm("해당 일기를 삭제하시겠습니까?")){
        axios.delete(`https://wobbly-literate-fight.glitch.me/notes/${it.id}`)
        .then(res=>{ delData(res.data)})
        alert("삭제되었습니다.")
    }
    } 
    function goEdit(){
        navigate(`/edit/${it.id}`)
    } 
    return(
        <StyledDiv  theme={theme} className="noteitem_wrap">
            <Link to={`/view/${it.id}`} 
            data-tooltip-id='my-tooltip' 
            data-tooltip-content={it.title}
            data-tooltip-place='bottom'
            className='note_title'
            > 
                <h1>{it.title}</h1>
                <p>{it.day}</p> 
            </Link>
            <Tooltip id='my-tooltip' classNameArrow='tooltip-arrow' />
            <div className='note_btn'>
                <button onClick={goEdit} className='edit' >수정</button>
                <button onClick={onDelete} className='delete'>삭제</button>
            </div>
       
        </StyledDiv>
    )
}