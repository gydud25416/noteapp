 
import { Route, Routes, useNavigate   } from 'react-router-dom';
import './App.css'; 
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import View from './pages/View';
import useFetch from './hooks/useFetch';
import { useEffect, useState } from 'react';
import Empty from './components/Empty';
import axios from 'axios';

function App() {
  const data = useFetch('http://localhost:3001/notes');
 const [item, setItem] = useState([]); 
  const navigate = useNavigate(null);
 const [latest, setLatest] = useState('latest')
 
 function latestData(e){
  setLatest(e);
  if(e === 'latest'){
    setItem(it => it.sort((a,b)=>new Date(b.day) - new Date(a.day)))
  }else{
    setItem(it => it.sort((a,b)=>new Date(a.day) - new Date(b.day)))
  }
 }

  function goBack(){
    navigate(-1)
  }

  function delData(e){
    const result = item.filter((it)=>it.id !== e.id);
    setItem(result);
  }

  function addData(e){
    const result = [e, ...item] 
    setItem(result); 
  }

  function editData(e){  
    const resultTit = e.title; 
    axios.put(`http://localhost:3001/notes/${e.id}`, {
      title:resultTit ,
      ...e
    })
    .then(res=>{
      setItem((prevItem)=>
        prevItem.map((it)=>
         ( it.id === e.id ? {...it, title: res.data.title} : it )
        )
      ); 
    })   
  }
 
 
 
  useEffect(()=>{
    const result = data.sort((a,b)=>new Date(b.day) - new Date(a.day))
    setItem(result);   
  },[data]); 
  
  return (
    <div className="App"  >
        <div className='app_wrap'>
        <Routes>
            <Route path='/' element={<Home  latestData={latestData} item={item} delData={delData} goBack={goBack}  />}/>
            <Route path='/edit/:id' element={<Edit editData={editData} goBack={goBack} item={item}  />} />
            <Route path='/new' element={<New addData={addData} goBack={goBack} />} />
            <Route path='/view/:id' element={<View   />}/>
            <Route path='*' element={<Empty/>}/>
        </Routes>
        <button className='theme_btn '>White mode</button>
      </div>
    </div>
  );
}

export default App;
