import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function ProfileScreen({ navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [profile, setProfile] = useState({
        username: '',
        age: '',
        weight: '',
        gender: '',
        activity_level: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetch("https://your-api.com/api/v1/me", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const json = await res.json();
                if (res.ok) setProfile(json);
                else Alert.alert("Error", json.error || "Could not load profile.");
            } catch (err) {
                console.error(err);
                Alert.alert("Error", "Failed to fetch profile.");
            }
        };

        loadProfile();
    }, []);

    const handleChange = (key, value) => {
        setProfile(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch("https://your-api.com/api/v1/me", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            });

            const json = await res.json();

            if (res.ok) {
                Alert.alert("Saved", "Your profile has been updated.");
                navigation.goBack();
            } else {
                Alert.alert("Error", json.error || "Could not update profile.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        }
    };

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Edit Profile</Text>

                {["username", "age", "weight", "gender", "activity_level"].map((field) => (
                    <TextInput
                        key={field}
                        placeholder={field.replace('_', ' ').toUpperCase()}
                        value={profile[field]}
                        onChangeText={(text) => handleChange(field, text)}
                        style={[styles.input, { fontFamily }]}
                    />
                ))}

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={[styles.buttonText, { fontFamily }]}>Save Changes</Text>
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
    saveButton: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginTop: 16,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
