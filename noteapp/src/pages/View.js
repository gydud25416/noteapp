import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import './View.css' 
import useFetch from "../hooks/useFetch";
export default function View( ){
    const {id} = useParams();
    
    const item = useFetch(`http://localhost:3001/notes/${id}`);

    return(
        <div className="view_wrap">
            <Header title={"Detail"} rightChild={<Link item={item} className="edit" to={`/edit/${item.id}`}>수정하기</Link>} leftChild={<Link className="goback" to={'/'}>돌아가기</Link>} />
            <div className="content_wrap" >
                <h1>{item.title}</h1>
                <p>{item.content?.split("\n").map((line) => { //this.props.data.content: 내용
            return (
              <span key={line}>
                {line}
                <br />
              </span>
            );
          })}</p>
            </div>
        </div>
    )
}