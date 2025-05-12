import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    Switch,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function SettingsScreen({ navigation }) {
    const { dyslexiaMode, toggleDyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [settings, setSettings] = useState({
        calorieGoal: '2200',
        age: '30',
        weight: '70',
        gender: 'male',
        activity: 'moderate'
    });

    const handleChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        // TODO: Send to backend
        Alert.alert("Saved", "Your settings have been updated.");
    };

    const handleLogout = () => {
        // TODO: Clear token and redirect to login
        Alert.alert("Logged out");
    };

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Settings</Text>

                <View style={styles.section}>
                    <Text style={[styles.label, { fontFamily }]}>Dyslexia Mode</Text>
                    <Switch
                        value={dyslexiaMode}
                        onValueChange={toggleDyslexiaMode}
                        thumbColor="#fff"
                    />
                </View>

                <Text style={[styles.subtitle, { fontFamily }]}>Profile Info</Text>

                {["calorieGoal", "age", "weight", "gender", "activity"].map((field) => (
                    <TextInput
                        key={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={settings[field]}
                        onChangeText={(text) => handleChange(field, text)}
                        style={[styles.input, { fontFamily }]}
                    />
                ))}

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={[styles.buttonText, { fontFamily }]}>Save Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={[styles.logoutText, { fontFamily }]}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    label: {
        fontSize: 18,
        color: '#fff'
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
        alignSelf: 'flex-start'
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    logoutButton: {
        marginTop: 30,
        alignItems: 'center'
    },
    logoutText: {
        fontSize: 16,
        color: '#fff',
        textDecorationLine: 'underline'
    }
});
