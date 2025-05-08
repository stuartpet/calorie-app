import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBackground from './components/AppBackground';

const API_URL = 'http://192.168.0.127:3000';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !username || !password) {
            return Alert.alert('Missing fields', 'Please fill in all fields.');
        }

        try {
            const response = await axios.post(`${API_URL}/api/v1/signup`, {
                email,
                username,
                password
            });

            const token = response.data.auth_token;
            await AsyncStorage.setItem('authToken', token);

            Alert.alert('✅ Account created');
            navigation.navigate('ProfileSetup');
        } catch (err) {
            const msg = err.response?.data?.error || 'Signup failed. Try again.';
            Alert.alert('Error', msg);
        }
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={styles.title}>Create an Account 📝</Text>
                <Text style={styles.subtitle}>Start your journey toward better meal tracking</Text>

                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />

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

                <Button title="Sign Up" onPress={handleSignup} />

                <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                        Log In
                    </Text>
                </Text>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        color: '#666'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        marginBottom: 16,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
        color: '#555'
    },
    link: {
        color: '#007bff',
        fontWeight: '600'
    }
});
