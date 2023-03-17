import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../components/csrftoken";
import { Box, useTheme } from "@mui/material";
import { tokens } from "./../../theme";
import Header from "../../components/Header";
import axios from 'axios';
import trans_logo from "../../assets/images/trans_sigma.png";
import { height } from "@mui/system";

const Login = ({ setLogin, setAccess }) => {

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
                setSuccess(data.context);
                setAccess(data.access);
                navigate("/");
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
        <Box sx={{width: "100%", height: "100%", display: "flex", allignitems: "center", justifyContent: "center"}}>
            <Box sx={{ 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center",
                width: "400px",
                padding: "40px",
                fontSize: "20px",
                borderRadius: "10px",
                }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Header title="Logowanie" subtitle="Zaloguj się do serwisu"/>
                </Box>
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
                <Box>
                    <Box>
                        <button id="loginSubmitButton" onClick={handleLogin}>Zaloguj</button>
                    </Box>
                </Box>
                <p ref={errRef} style={{color: colors.redAccent[600]}} >{errMsg}</p>
            </Box>
        </Box>
    )
}

export default Login;