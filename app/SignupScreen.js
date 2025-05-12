import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function SignupScreen({ navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !password || !username) {
            return Alert.alert("Missing info", "Please fill in all fields.");
        }

        try {
            const res = await fetch('https://your-api.com/api/v1/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            const json = await res.json();

            if (res.ok && json.auth_token) {
                // TODO: store auth_token and redirect
                Alert.alert("Account created", "Welcome!");
                navigation.navigate("Dashboard");
            } else {
                Alert.alert("Signup failed", json.error || "Please check your info.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        }
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Sign Up</Text>

                <TextInput
                    placeholder="Email"
                    style={[styles.input, { fontFamily }]}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    placeholder="Username"
                    style={[styles.input, { fontFamily }]}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    style={[styles.input, { fontFamily }]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={[styles.buttonText, { fontFamily }]}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.linkText, { fontFamily }]}>
                        Already have an account? Log in
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
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 32
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        fontSize: 16
    },
    signupButton: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    },
    linkText: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});
