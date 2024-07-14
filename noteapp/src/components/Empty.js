import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { ThemeContext } from "../App";
const StyledH1= styled.h1 `
    color:${(p)=>p.theme.colors.defaultFont}
`

export default function Empty(){
    const theme = useContext(ThemeContext)
    const navigate = useNavigate(null);
    function goback(){
        navigate(-1)
    }
    return(
        <>
            <button style={{background:"#555", color:"#fff", padding:"10px", borderRadius:"5px", marginBottom:"30px"}} onClick={goback}>돌아가기</button>
            <StyledH1 theme={theme} style={{textAlign:"center", marginBottom:"30px"}}>잘못된 경로입니다.</StyledH1>
        </>
    )
}