import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Alert, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBackground from './components/AppBackground';

const API_URL = 'http://192.168.0.127:3000';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/login`, { email, password });
            const token = response.data.auth_token;
            await AsyncStorage.setItem('authToken', token);

            const profileRes = await axios.get(`${API_URL}/api/v1/me`, {
                headers: { Authorization: token }
            });

            const { age, height, weight, gender, activity_level, goal } = profileRes.data;
            const isProfileComplete = [age, height, weight, gender, activity_level, goal].every(Boolean);

            navigation.navigate(isProfileComplete ? 'Dashboard' : 'ProfileSetup');
        } catch (error) {
            console.error(error);
            Alert.alert('Login failed', 'Check your email or password.');
        }
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Log in to track your meals</Text>

                <View style={styles.card}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666"
                        secureTextEntry
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>
                    Don't have an account?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24,
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: '#ddd',
        textAlign: 'center',
        marginBottom: 24
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 20,
        borderRadius: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        fontSize: 16
    },
    button: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    footerText: {
        marginTop: 24,
        fontSize: 14,
        textAlign: 'center',
        color: '#eee'
    },
    link: {
        color: '#f4a261',
        fontWeight: '600'
    }
});
