import NoteItem from "./NoteItem";
import './NoteList.css'
export default function NoteList({data, delData}){

    return(
        <div className="notelist_wrap">
            
            <div className="list_wrap">
            {data?.map((it)=>(
                <NoteItem delData={delData} key={it.id} it={it} />
            ))}
                 
            </div>
        </div>
    )
}