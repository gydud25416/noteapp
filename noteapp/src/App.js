 
import { Route, Routes, useNavigate   } from 'react-router-dom';
import './App.css'; 
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import View from './pages/View';
import useFetch from './hooks/useFetch';
import { useEffect, useState } from 'react';
import Empty from './components/Empty';

function App() {
  const data = useFetch('http://localhost:3001/notes');
 const [item, setItem] = useState([]); 
  const navigate = useNavigate(null);
  function goBack(){
    navigate(-1)
  }

  function delData(e){
    const result = item.filter((it)=>it.id !== e.id);
    setItem(result);
  }

  function addData(e){
    const result = [...item, e]
    setItem(result); 
  }

  function editData(e){  
    console.log(e) 
  }
 
 
  useEffect(()=>{
    const result = data.sort((a,b)=>new Date(b.day) - new Date(a.day))
    setItem(result);  

  },[data]); 
  return (
    <div className="App" style={{backgroundImage:`url(` + process.env.PUBLIC_URL + `/assets/bg.jpg)`}}>
    
      <Routes>
          <Route path='/' element={<Home   item={item} delData={delData} goBack={goBack}  />}/>
          <Route path='/edit/:id' element={<Edit editData={editData} goBack={goBack} item={item}  />} />
          <Route path='/new' element={<New addData={addData} goBack={goBack} />} />
          <Route path='/view/:id' element={<View   />}/>
          <Route path='*' element={<Empty/>}/>
      </Routes>
      <button className='theme_btn '>White mode</button>
    </div>
  );
}

export default App;
