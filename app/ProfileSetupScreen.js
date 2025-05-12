import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function ProfileSetupScreen({ navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [form, setForm] = useState({
        username: '',
        age: '',
        weight: '',
        gender: '',
        activity_level: ''
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('https://your-api.com/api/v1/me', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const json = await res.json();

            if (res.ok) {
                Alert.alert("Profile set up", "You're ready to go!");
                navigation.navigate("Dashboard");
            } else {
                Alert.alert("Error", json.error || "Setup failed.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        }
    };

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Set Up Your Profile</Text>

                {["username", "age", "weight", "gender", "activity_level"].map((key) => (
                    <TextInput
                        key={key}
                        placeholder={key.replace('_', ' ').toUpperCase()}
                        style={[styles.input, { fontFamily }]}
                        value={form[key]}
                        onChangeText={(text) => handleChange(key, text)}
                    />
                ))}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={[styles.buttonText, { fontFamily }]}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 24
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12
    },
    button: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
