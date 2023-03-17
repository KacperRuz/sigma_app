import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { studenci } from "./data/studenci.js";
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

import { set_interval } from "./scenes/chat/chat";

function App() {
  const [theme, colorMode] = useMode();
  const [selected, setSelected] = useState("Dashboard");
  const [login, setLogin] = useState(null);
  const [access, setAccess] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  axios.get('api/auth')
  .then(res => {
      axios.defaults.withCredentials = true;
      const data = res.data;
      if(data.context == false){
        if(location.pathname != "/login"){
          navigate("/login");
          setLogin(null); // <---------
        }
      }
      else{
        setLogin(data.context);
        setAccess(data.access);
      }
      if(location.pathname != "/chat"){
        set_interval(false);
      }
  })
  }, []);

  useEffect(() => {
    axios.get('/get_groups_data')
    .then(res => {
        const data = res.data;
        //console.log(data.context);
        var temp_students = []
        for(var i=0; i < data.context.length; i++){
          var student = {
              id: data.context[i].pk,
              name: data.context[i].first_name,
              surname: data.context[i].last_name,
              sex: data.context[i].euser__sex,
              access: "user",
              group: data.context[i].euser__group,
          }
          if(student.name != "admin")
            temp_students.push(student);
        }
        setStudents([...students,temp_students]);
        setLoading(false);
    });
  }, []);


  if (isLoading) {
    return <div className="App">Loading...</div>;
  }


  console.log(students);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar selected={selected} setSelected={setSelected} login={login} />
          <main className='content'>
            <Topbar selected={selected} setSelected={setSelected} login={login} setLogin={setLogin} setAccess={setAccess} />
            <Routes>
              <Route path='/login' element={<Login setLogin={setLogin} setAccess={setAccess} />} />
              <Route path='/' element={<HomePage selected={selected} setSelected={setSelected} students={students[0]} />} />
              <Route path='/teams' element={<Teams students={students[0]} login={login} access={access} />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/alerts' element={<Alerts />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/bar' element={<Bar students={students[0]} />} />
              <Route path='/pie' element={<Pie students={students[0]} />} />
            </Routes>
          </main>  
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
