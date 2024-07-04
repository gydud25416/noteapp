import { Link } from 'react-router-dom'
import './NoteItem.css'
export default function NoteItem({id}){

    return(
        <Link to={`/view/${id}`} className="noteitem_wrap">
            <div>
                <h1>새로운 내용</h1>
                <p>새로운 내용입니다.</p>
            </div>
            <p>24.7.4</p>
        </Link>
    )
}