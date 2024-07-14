 
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect,   useRef,   useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { PageContext } from "../App";

const StyledBoard =styled.input`
  color:${(p)=>p.theme.colors.defaultFont};
  background:${(p)=>p.theme.colors.defaultBg};
  box-shadow:${(p)=>p.theme.colors.defaultShadow}; 
 
  &::placeholder{
    color:${(p)=>p.theme.colors.defaultFont};
  }
` 

const StyledBoard2 =styled.textarea`
  color:${(p)=>p.theme.colors.defaultFont};
  background:${(p)=>p.theme.colors.defaultBg}; 
  box-shadow:${(p)=>p.theme.colors.defaultShadow}; 
 
  &::placeholder{
    color:${(p)=>p.theme.colors.defaultFont};
  }
` 
export default function Edit( editData ){
    const {goBack} = useContext(PageContext);
    const navigate = useNavigate(null);
    const {id} = useParams(); 
    const item = useFetch(`http://localhost:3001/notes/${id}`); 
    const [tit, setTit] = useState(''); 
    const [con, setCon] = useState('');
    const titRef = useRef(null);

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
        if(!tit){
            alert("제목을 입력해주세요.");
            titRef.current.focus();
            return false;
        }
        if(!con){
            if(window.confirm("내용이 없습니다. 그대로 저장하시겠습니까?")){
                axios.put(`http://localhost:3001/notes/${id}`,{
                    ...item,
                    title:tit,
                    content:con 
                })
                .then(res=>{
                    editData(res.data);
                    alert("수정되었습니다.");
                    navigate(`/view/${item.id}`);
                })
            }
        }else{
            if(window.confirm("수정하시겠습니까?")){
                axios.put(`http://localhost:3001/notes/${id}`,{
                    ...item,
                    title:tit,
                    content:con 
                })
                .then(res=>{
                    editData(res.data);
                    alert("수정되었습니다.");
                    navigate(`/view/${item.id}`);
                }) 
            }
        }
    } 
    return(
        <div className="edit_wrap">
            <Header title={"수정하기"} rightChild={<button onClick={onEdit}  className="add" >저장하기</button>} leftChild={<button onClick={goBack} className="goback" >돌아가기</button>} />
            <div className="new_wrap" >
                <StyledBoard  value={tit || ''} ref={titRef} onChange={handleOnChageTit} placeholder="제목을 입력해주세요."/>
                <StyledBoard2 value={con || ''} onChange={handleOnChageCon} placeholder="내용을 입력해주세요." />
            </div>
        </div>
    )
}