import React, { useEffect, useState } from "react";
import { WiSolarEclipse } from "react-icons/wi";


export default function DarkMode() {
    const [theme, setTheme] = useState( localStorage.getItem('theme') || 'light');
    const button = document.getElementById("darkModeBtn")

    const toggleTheme = () => {
        if (theme !== 'dark') {
            setTheme('dark');
        }
        if (theme !== 'light') {
            setTheme('light');
        }
        console.log(theme)
        button.classList.add(theme)
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    return (
        <>
            <div data-theme={theme} >
                <div className={`darkmode-btn-box ${theme}`} id="darkModeBtn">
                    <button id="DarkModeButton" onClick={toggleTheme}>
                        <WiSolarEclipse />
                    </button>
                </div>
            </div>

        </>
    );
};
