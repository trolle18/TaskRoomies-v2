import React from "react";
import useLocalStorage from "use-local-storage";
import { WiSolarEclipse } from "react-icons/wi";
import "./DarkMode.css";


export default function DarkMode() {

    //Dark mode function der med en knap gør det muligt at skifte mellem 2 forskellige farvetemaer
        const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const [theme, setTheme] = useLocalStorage(
            "theme",
            defaultDark ? "dark" : "light"
        );

        const switchTheme = () => {
            const newTheme = theme === "light" ? "dark" : "light";
            setTheme(newTheme);
        };



    return (
        <>
            <div data-theme={theme}>                
                <div className="darkmode-btn-box">
                    <button id="DarkModeButton" onClick={switchTheme}>
                        <WiSolarEclipse />
                    </button>
                </div>
            </div>
             
        </>
    );
};