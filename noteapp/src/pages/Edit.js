 
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { useEffect,   useState } from "react";
import axios from "axios";

export default function Edit({goBack, editData}){
    const navigate = useNavigate(null);
    const {id} = useParams(); 
    const item = useFetch(`http://localhost:3001/notes/${id}`); 
    const [tit, setTit] = useState(''); 
    const [con, setCon] = useState('');

    useEffect(()=>{
        setTit(item.title)
        setCon(item.content) 
    },[item])
 
 
    function handleOnChageTit(e){
        setTit(e.target.value)
    }
    function handleOnChageCon(e){
        setCon(e.target.value)
    } 
    function onEdit(){
        if(window.confirm("수정하시겠습니까?")){
            axios.put(`http://localhost:3001/notes/${id}`,{
                ...item,
                title:tit,
                content:con 
            })
            .then(res=>{editData(res.data)})
        }
        alert("수정되었습니다.");
        navigate(`/view/${id}`);
    }
 

    return(
        <div className="edit_wrap">
            <Header title={"수정하기"} rightChild={<button onClick={onEdit}  className="add" >저장하기</button>} leftChild={<button onClick={goBack} className="goback" >돌아가기</button>} />
            <div className="new_wrap" >
                <input  value={tit || ''} onChange={handleOnChageTit} placeholder="제목을 입력해주세요."/>
                <textarea value={con || ''} onChange={handleOnChageCon} placeholder="내용을 입력해주세요." />
            </div>
        </div>
    )
}