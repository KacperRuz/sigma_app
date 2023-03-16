import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import { useState } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import HomePage from './scenes/homePage';
import Teams from './scenes/teams';
import Chat from './scenes/chat';
import Alerts from './scenes/alerts';
import Profile from './scenes/profile';
import Bar from './scenes/bar';
import Pie from './scenes/pie';
import Login from './scenes/login';

function App() {
  const [theme, colorMode] = useMode();
  const [selected, setSelected] = useState("Dashboard");
  const [login, setLogin] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  axios.get('api/auth')
  .then(res => {
      axios.defaults.withCredentials = true;
      const data = res.data;
      if(data.context == false){
        if(location.pathname != "/login")
          navigate("/login");
          setLogin(null); // <---------
      }
      else{
        setLogin(true);
      }
  })

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar selected={selected} setSelected={setSelected}/>
          <main className='content'>
            <Topbar selected={selected} setSelected={setSelected} login={login} setLogin={setLogin} />
            <Routes>
              <Route path='/' element={<HomePage selected={selected} setSelected={setSelected} />} />
              <Route path='/teams' element={<Teams />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/alerts' element={<Alerts />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/login' element={<Login login={login} setLogin={setLogin} />} />
            </Routes>
          </main>  
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
