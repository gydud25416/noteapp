import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import './View.css' 
import useFetch from "../hooks/useFetch";
import styled from "styled-components";

const StyledBoard =styled.div`
  color:${(p)=>p.theme.colors.defaultFont};
  background:${(p)=>p.theme.colors.defaultBg};
  box-shadow:${(p)=>p.theme.colors.defaultShadow};

  h1{
    border-bottom:2px solid ${(p)=>p.theme.colors.defaultFont};
  }

  p.date{
    color:${(p)=>p.theme.colors.defaultFont};
    border-top:1px solid ${(p)=>p.theme.colors.defaultLight};
  }
` 

export default function View( ){
    const {id} = useParams();
    
    const item = useFetch(`${process.env.REACT_APP_API_URL}/notes/${id}`);
    
     
    return(
      <>

        <div className="view_wrap">
     
            <Header title={"Detail"} rightChild={<Link item={item} className="edit" to={`/edit/${item.id}`}>수정하기</Link>} leftChild={<Link className="goback" to={'/'}>돌아가기</Link>} />
            <StyledBoard className="content_wrap" >
              {!item || item.length === 0 ? (
                <h1>불러오는 중...</h1>
              ):(
                <>
              <h1>{item.title}</h1>
              <p>{item.content?.split("\n").map((line, idx) => ( //this.props.data.content: 내용 
                  <span key={idx} >
                    {line}
                    <br />
                  </span> 
              ))}</p>
              <p className="date">{item.showDay}</p>
              </>
                  )} 
            </StyledBoard>
          {item.images?.length > 0 ? 
          (
            <div className="img_wrap">
                
                {item.images?.map((it)=>(
                <img key={it} src={`https://noteapp-hyjang.web.app/static/media/bg.e1bc0f73ec1b5cdcace9.jpg`} alt="it" /> 
                ))}
            </div>
          ) :(
            <></>
          ) 
        }
            
        </div>
        </>
    )
}
 