import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from "./../../theme";
import Header from "../../components/Header";
import "./styles.css";
import "./alerts";
import { fetch_last } from "./alerts";


const Alerts = () => {
    //const theme = useTheme();
    //const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetch_last();
    });

    return (
        <Box sx={{margin: "20px"}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Header title="Powiadomienia"/>
            </Box>
            <div>
            <div id="alerts" style={{width: "50%"}}>
                <div className="alert_header">Sigma alerts v0.1</div>
                    <div id="alerts_wrapper" style={{width: "100%"}}>
                        <div id="alerts">
                        </div>
                    </div>
            </div>
            </div>
        </Box>  
    )
}

export default Alerts;