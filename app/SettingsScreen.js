import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function SettingsScreen({ navigation }) {
    const { dyslexiaMode, toggleDyslexia } = useTheme();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('authToken');
        Alert.alert('👋 Logged out');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={styles.title}>⚙️ Settings</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSetup')}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#f94144' }]} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: dyslexiaMode ? '#6c757d' : '#2a9d8f' }]}
                    onPress={toggleDyslexia}
                >
                    <Text style={styles.buttonText}>
                        {dyslexiaMode ? 'Disable Dyslexia Mode' : 'Enable Dyslexia Mode'}
                    </Text>
                </TouchableOpacity>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#34a0a4',
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
