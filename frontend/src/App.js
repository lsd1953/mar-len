import "./App.css";


import React, {useEffect } from 'react'
import RoutesApp from "./routes/index.js";
import { AuthProvider } from "./contexts/auth";
import { ThemeProvider } from '@mui/material/styles';
import { themeOptions } from "./assets/themeOptions";
import CssBaseline from "@mui/material/CssBaseline";

function App() {

    useEffect(() => {
        console.log(`Version: ${process.env.REACT_APP_VERSION_APP}`)
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider theme={themeOptions}>
                <CssBaseline />
                <RoutesApp />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;