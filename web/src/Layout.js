import React, { useState } from "react"
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { lightTheme, darkTheme, GlobalStyles } from './theme';

import { useHistory } from 'react-router-dom';

function LayoutContent({toggleDarkMode, darkMode}) {
    const history = useHistory();
    return (
    <App
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        history={history}
    />
    )
}

export default function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <BrowserRouter>
                    <GlobalStyles />
                    <LayoutContent toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
            </BrowserRouter>
        </ThemeProvider>
    )
}
