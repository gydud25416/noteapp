 
import { useRef } from "react";
import Header from "../components/Header";
import './New.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function New({goBack, addData}){
    const navigate = useNavigate(null);
    const titRef = useRef(null);
    const contRef = useRef(null);
    function onAdd(){
        if(!titRef.current.value){
            alert("제목을 입력해주세요.");
            titRef.current.focus()
            return false;
        }
        if(!contRef.current.value){
            if(window.confirm("내용이 없습니다. 그대로 저장하시겠습니까?")){
                axios.post('http://localhost:3001/notes',{
                    title:titRef.current.value,
                    content:contRef.current.value,
                    day:new Date().toLocaleDateString()
                })
                .then(res=>{addData(res.data)})
            } 
            }else{
                if(window.confirm("저장하시겠습니까?")){
                    axios.post('http://localhost:3001/notes',{
                        title:titRef.current.value,
                        content:contRef.current.value,
                        day:new Date().toLocaleDateString()
                    })
                    .then(res=>{addData(res.data)})
                } 
            }
            alert("저장되었습니다.")
            navigate('/')
    }
    return(
        <>
            <Header title={"새 노트 추가"} rightChild={<button onClick={onAdd}  className="add" >저장하기</button>}  leftChild={<button onClick={goBack} className="goback" >돌아가기</button>} />
            <div className="new_wrap" >
                <input ref={titRef} placeholder="제목을 입력해주세요."/>
                <textarea ref={contRef}   wrap="hard" cols={1000}  placeholder="내용을 입력해주세요." />
            </div>
        </>
    )
}