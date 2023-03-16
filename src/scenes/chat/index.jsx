import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { Box, useTheme } from "@mui/material";
import { tokens } from "./../../theme";
import Header from "../../components/Header";
import "./styles.css";
import "./chat";
import { fetch_last, set_interval, clear_message_divs } from "./chat.js";



const Chat = () => {

    const location = useLocation();

    useEffect(() => {
        set_interval(false);
        if(location.pathname == "/chat"){
            clear_message_divs();
            //set_interval(true);
            fetch_last();
        }
    });

    return (
        <Box sx={{margin: "20px"}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Header title="Chat"/>
            </Box>
            <div>
            <div id="chat" style={{width: "50%"}}>
                <div className="chat_header">Sigma chat v0.1</div>
                    <div id="mes_wrapper" style={{height: "400px", width: "100%", overflow: "auto", display: "flex", flexDirection: "column-reverse"}}>
                        <div id="messages">
                        </div>
                    </div>
            </div>
            <div id="chat_input" style={{width: "50%"}}>
                <textarea id="chat_text" style={{width: "75%", resize: "none"}}></textarea><br/>
            </div>
            </div>
        </Box>  
    )
}

export default Chat;