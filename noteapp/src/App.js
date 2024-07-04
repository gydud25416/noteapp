 
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import View from './pages/View';

function App() {
  return (
    <div className="App" style={{backgroundImage:`url(` + process.env.PUBLIC_URL + `/assets/bg.jpg)`}}>
    
      <Routes>
          <Route path='/' element={<Home  />}/>
          <Route path='/edit' element={<Edit/>} />
          <Route path='/new' element={<New/>} />
          <Route path='/view/:id' element={<View/>}/>
      </Routes>
    </div>
  );
}

export default App;
