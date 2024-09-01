 
import { Route, Routes, useNavigate   } from 'react-router-dom';
import styled,{ThemeProvider} from "styled-components";
import './App.css'; 
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import View from './pages/View';
import useFetch from './hooks/useFetch';
import React,{ useEffect, useState } from 'react';
import Empty from './components/Empty';
import axios from 'axios';
import './components/theme'
import { darkTheme, lightTheme } from './components/theme';

const StyledApp = styled.div` 
 background:${(p)=> p.theme.colors.BgDim   }
`

const AppBg = styled.div`
 transition:0.5s;
  background:${(p)=> p.theme.colors.BgDimDiv  }
`

const StyledDarkBtn = styled.button`
  background:${(p)=>p.theme.colors.defaultBg}; 
  color:${(p)=>p.theme.colors.defaultFont};
    box-shadow:${(p)=>p.theme.colors.defaultShadow}; 
  &:after{
    background:${(p)=>p.theme.colors.darkModeBtn};
  }
`

export  const ThemeContext = React.createContext(); 
export  const PageContext = React.createContext(); 

function App() { 
  const data = useFetch(`${process.env.REACT_APP_API_URL}/notes/`);
 const [item, setItem] = useState([]); 
  const navigate = useNavigate(null);
 const [latest, setLatest] = useState('latest')
 const [darkMode, setDarkMode] = useState(false);
 const [themeMode, setThemeMode] = useState('lightTheme'); 
 function latestData(e){
  setLatest(e);
  if(e === 'latest'){
    const result = item.sort((a,b)=>{
      if(a.day === b.day){
        return b.timestamp - a.timestamp;
      }
      return new Date(b.day) - new Date(a.day);
    })
    setItem(result)
  }else{
    const result = item.sort((a,b)=>{
      if(a.day === b.day){
        return a.timestamp - b.timestamp;
      }
      return new Date(a.day) - new Date(b.day);
    })
    setItem(result)
  }
 }

 

  function goBack(){
    navigate(-1)
  }

  function delData(e){ 
    setItem(result => result.filter((it)=>it.id !== e.id));
  }

  function addData(e){
    const result = [e, ...item] 
    setItem(result); 
  }

  function editData(e){  
    const resultTit = e.title; 
    axios.put(`${process.env.REACT_APP_API_URL}/notes/${e.id}`, {
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
  const theme = themeMode === 'lightTheme' ? lightTheme : darkTheme ;

  function onDarkMode(){
    setDarkMode(!darkMode);
    localStorage.setItem('localMode', darkMode);
    if(!darkMode){
      setThemeMode('darkTheme');  
    }else{
      setThemeMode('lightTheme');  
    } 
  } 
  useEffect(()=>{
    const result = data.sort((a,b)=>{
      if(a.day === b.day){
        return b.timestamp - a.timestamp;
      }
      return new Date(b.day) - new Date(a.day)}
    )
    setItem(result);  
  },[data   ]); 

  useEffect(()=>{ 
    const LocalMode = localStorage.getItem('localMode'); 
    if(LocalMode === 'false'){ 
      setDarkMode(true);  
      setThemeMode('darkTheme');
    }else{ 
      setDarkMode(false );  
      setThemeMode('lightTheme'); 
    } 
  },[ ]); 
  
  return (
    <>
    {data.length === 0 ? ( 
      <div className="loading-container">
        <div>
      <div className="loading"></div>
      <div id="loading-text">LOADING<br/><span style={{fontSize:"14px"}}>JSON-SERVER를 시작하는 중입니다.</span></div>
      </div>
      </div> 
    ):(
      <div style={{display:'none'}}></div>
    )}
    <PageContext.Provider value={ {item, goBack}} >
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
      <StyledApp theme={theme} className='App' > 
              <AppBg className='app_wrap' > 
                <Routes>
                    <Route path='/' element={<Home  latestData={latestData} latest={latest}  delData={delData}   />}/>
                    <Route path='/edit/:id' element={<Edit editData={editData}  />} />
                    <Route path='/new' element={<New addData={addData} />} />
                    <Route path='/view/:id' element={<View   />}/>
                    <Route path='*' element={<Empty/>}/>
                </Routes>
                <StyledDarkBtn onClick={onDarkMode} className={!darkMode ? 'theme_btn' : 'theme_btn dark'}>{!darkMode ? "Light Mode" : "Dark Mode"}</StyledDarkBtn> 
            </AppBg>
        </StyledApp>
         </ThemeProvider>
      </ThemeContext.Provider>
      </PageContext.Provider>
      </>
  );
}

export default App;
