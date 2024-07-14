import { useContext } from "react";
import NoteItem from "./NoteItem";
import './NoteList.css'
import styled from "styled-components";
import { ThemeContext } from "../App";

const StyledH2 = styled.h2`
    text-align:center; 
    position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
` 

const ListWrap = styled.div`
    height:480px; 
    overflow: auto; 
    padding:8px;
    background:${(p)=>p.theme.colors.BgDimDiv};
    border-radius:5px;
    position:relative; 
`

export default function NoteList({data, delData}){ 
    const theme = useContext(ThemeContext);
    return(
        <div className="notelist_wrap">
            
            <ListWrap theme={theme} className="list_wrap">
            {data.length === 0 ? (
                <StyledH2>저장된 노트가 없습니다.</StyledH2>
            ):(data?.map((it)=>(
                <NoteItem delData={delData} key={it.id} it={it} />
            )))} 
            </ListWrap>
        </div>
    )
}