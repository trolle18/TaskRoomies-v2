import React, { useState } from "react";
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
        } else { setTheme('light') }
        
        console.log(theme)
        localStorage.setItem('theme', theme);
        button.classList.add(theme)
    };

    return (
        <>
            <div >                
                <div className={`darkmode-btn-box ${theme}`} id="darkModeBtn">
                    <button id="DarkModeButton" onClick={toggleTheme}>
                        <WiSolarEclipse />
                    </button>
                </div>
            </div>
             
        </>
    );
};
