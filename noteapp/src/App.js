 
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

const AppBg = styled.div`
 transition:0.5s;
  background:${(p)=> p.$even === 'false'   ? "rgba(255,255,255, 0.5)" : "rgba(0,0,0,0.5)"  }
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

function App() {
  const data = useFetch('http://localhost:3001/notes');
 const [item, setItem] = useState([]); 
  const navigate = useNavigate(null);
 const [latest, setLatest] = useState('latest')
 const [darkMode, setDarkMode] = useState(false);
 const [themeMode, setThemeMode] = useState('lightTheme');
 
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
  const theme = themeMode === 'lightTheme' ? lightTheme : darkTheme ;

  function onDarkMode(){
    setDarkMode(!darkMode);
    if(!darkMode){
      setThemeMode('darkTheme');  
    }else{
      setThemeMode('lightTheme');  
    } 
  }
  
 
  useEffect(()=>{
    const result = data.sort((a,b)=>new Date(b.day) - new Date(a.day))
    setItem(result);   

  },[data   ]); 
  
  return (
    <div className={!darkMode ? "App" : "App dark"}  > 
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
              <AppBg className='app_wrap' $even={`${darkMode}`}> 
                <Routes>
                    <Route path='/' element={<Home  latestData={latestData} item={item} delData={delData} goBack={goBack}  />}/>
                    <Route path='/edit/:id' element={<Edit editData={editData} goBack={goBack} item={item}  />} />
                    <Route path='/new' element={<New addData={addData} goBack={goBack} />} />
                    <Route path='/view/:id' element={<View   />}/>
                    <Route path='*' element={<Empty/>}/>
                </Routes>
                <StyledDarkBtn onClick={onDarkMode} className={!darkMode ? 'theme_btn' : 'theme_btn dark'}>{!darkMode ? "Light Mode" : "Dark Mode"}</StyledDarkBtn> 
            </AppBg>
         </ThemeProvider>
      </ThemeContext.Provider>
  </div>
  
  );
}

export default App;
