import { Link } from "react-router-dom";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import { useEffect, useState } from "react";
 


export default function Home({item ,delData }){
    const [ser, setSer] =useState();
    const [data, setData] = useState(item); 

    function handleOnChangeSearch(e){
        search(e.target.value); 
    }
    function search(e){
        const result = item.filter((it)=>it.title.includes(e)); 
        setSer(result)
      }
    useEffect(()=>{
        setData(ser); 
      },[ser])

      useEffect(()=>{
        setData(item)
      },[item])

    return(
        <>
            <Header title={"노트필기 앱"} rightChild={<Link to={'/new'}  className="add" >새 노트</Link>} />
            <div className="filter-wrap">
                <input type="text"   onChange={handleOnChangeSearch} className="search" placeholder="검색어를 입력해주세요." />
                <select>
                    <option value={'latest'}>최신순</option>
                    <option value={'oldest'}>오래된순</option>
                </select>
            </div>
            <NoteList data={data} delData={delData}/>
            
        </>
    )
}