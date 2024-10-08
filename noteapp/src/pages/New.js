 
import { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import './New.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageContext } from "../App";
import { getFormattedDate, getShowDate } from "../components/util";
import ImageUpload from "../components/ImageUpload";

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

export default function New({  addData}){
    const [showImg, setShowImg] = useState([]);
    const {goBack} = useContext(PageContext)
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
                axios.post(`${process.env.REACT_APP_API_URL}/notes`,{
                    title:titRef.current.value,
                    content:contRef.current.value,
                    day:getFormattedDate(new Date()),
                    showDay:getShowDate(new Date()),
                    timestamp:new Date().getTime(),
                    images:showImg
                })
                .then(res=>{addData(res.data)})
            } 
            }else{
                if(window.confirm("저장하시겠습니까?")){
                    axios.post(`${process.env.REACT_APP_API_URL}/notes`,{ 
                        title:titRef.current.value,
                        content:contRef.current.value,
                        day:getFormattedDate(new Date()),
                        showDay:getShowDate(new Date()),
                        timestamp:new Date().getTime(),
                        images:showImg
                    })
                    .then(res=>{addData(res.data);})
                } 
            }
            alert("저장되었습니다.")
            navigate('/')
    }
    return(
        <>
            <Header title={"새 노트 추가"} rightChild={<button onClick={onAdd}  className="add" >저장하기</button>}  leftChild={<button onClick={goBack} className="goback" >돌아가기</button>} />
            <div className="new_wrap" >
                <StyledBoard ref={titRef} maxLength={30} placeholder="제목을 입력해주세요. (최대 30자)"/>
                <StyledBoard2 ref={contRef}   wrap="hard" cols={1000}  placeholder="내용을 입력해주세요." />
                <ImageUpload showImg={showImg} setShowImg={setShowImg} />
            </div>
        </>
    )
}