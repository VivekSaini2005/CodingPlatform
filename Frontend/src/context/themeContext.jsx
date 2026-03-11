import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "system"
    );

    useEffect(() => {

        const root = document.documentElement;

        const applyTheme = () => {
            root.classList.remove("light", "dark");

            if (theme === "system") {
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                root.classList.add(systemDark ? "dark" : "light");
            }
            else {
                root.classList.add(theme);
            }
        };

        applyTheme();
        localStorage.setItem("theme", theme);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);