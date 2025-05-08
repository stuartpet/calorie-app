// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/AppNavigator';
import { useFonts } from 'expo-font';
import ThemeProvider from './app/contexts/ThemeContext';

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenDyslexic: require('./assets/fonts/OpenDyslexic-Regular.otf'),
    });
    if (!fontsLoaded) return null;

    return (
        <ThemeProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </ThemeProvider>
    );
}