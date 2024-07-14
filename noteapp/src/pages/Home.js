import { Link } from "react-router-dom";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import { useContext, useEffect,   useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";
 
 const StyledInput =styled.input.attrs({
    placeholder:"검색어를 입력해주세요.",
    type:"text",
    className:"search"
})`
     color:${(p)=>p.theme.colors.defaultFont};
    border-bottom:1px solid ${(p)=>p.theme.colors.defaultLight};
     &::placeholder {
         color:${(p)=>p.theme.colors.defaultFont}; 
    }
 ` 
export default function Home({item ,delData, latestData  }){
    const theme = useContext(ThemeContext);
    const [ser, setSer] =useState();
    const [data, setData] = useState(item); 
 
    
    function handleOnChangeSelect(e){
        latestData(e.target.value)
    }
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
                <StyledInput theme={theme} onChange={handleOnChangeSearch}  />
                <select   onChange={handleOnChangeSelect}>
                    <option value={'latest'}>최신순</option>
                    <option value={'oldest'}>오래된순</option>
                </select>
            </div>
            <NoteList data={data} delData={delData}/>
            
        </>
    )
}