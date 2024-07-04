import { useNavigate } from "react-router-dom"

export default function Empty(){
    const navigate = useNavigate(null);
    function goback(){
        navigate(-1)
    }
    return(
        <>
            <button style={{background:"#555", color:"#fff", padding:"10px", borderRadius:"5px", marginBottom:"30px"}} onClick={goback}>돌아가기</button>
            <h1 style={{textAlign:"center", marginBottom:"30px"}}>잘못된 경로입니다.</h1>
        </>
    )
}