import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "./../../theme";
import getCookie from "../../components/csrftoken";
import Header from "../../components/Header";
import axios from 'axios';

const Login = ({ login, setLogin }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [ user, setUser ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    function handleLogin(){
        axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
        axios.defaults.withCredentials = true;
        axios.post('api/login', {username: user, password: pwd})
        .then(res => {
            const data = res.data;
            console.log(data);
            if(data.context == "false"){
                setErrMsg("Niepoprawny login/hasło.");
            }
            else{
                navigate("/");
                setSuccess(true);
            }
        })
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [ user, pwd ])

    return (
        <Box sx={{margin: "20px"}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Header title="Logowanie" subtitle="Zaloguj się do serwisu"/>
            </Box>
            <Box sx={{ 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "space-evenly",
                width: "400px",
                padding: "40px",
                fontSize: "20px",
                borderRadius: "10px"
                }}>
                <Box>
                    <label htmlFor="username" style={{marginRight: "11px"}} >Login</label>
                    <input 
                        type="text" 
                        id="username" 
                        ref={userRef} 
                        autoComplete="off" 
                        onChange={(e)=> setUser(e.target.value)}
                        value={user}
                        required
                    />
                </Box>
                <Box>
                    <label htmlFor="password" style={{marginRight: "10px"}} >Hasło</label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e)=> setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </Box>
                <button id="loginSubmitButton" onClick={handleLogin}>Zaloguj</button>
                <p ref={errRef} style={{color: colors.redAccent[600]}} >{errMsg}</p>
            </Box>
        </Box>  
    )
}

export default Login;