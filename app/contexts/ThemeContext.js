import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
    const [dyslexiaMode, setDyslexiaMode] = useState(false);

    const toggleDyslexia = () => setDyslexiaMode(!dyslexiaMode);

    return (
        <ThemeContext.Provider value={{ dyslexiaMode, toggleDyslexia }}>
            {children}
        </ThemeContext.Provider>
    );
}
