import React, { useState } from 'react';
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

export default function ManualLogScreen({ navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [meal, setMeal] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        sugar: '',
        salt: ''
    });

    const handleChange = (key, value) => {
        setMeal((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const res = await fetch('https://your-api.com/api/v1/food_items/create_custom', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                food_item: meal
            })
        });

        const json = await res.json();

        if (res.ok) {
            await fetch('https://your-api.com/api/v1/meals', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ food_item_id: json.id })
            });

            Alert.alert("Logged", "Meal added successfully!");
            navigation.navigate("Dashboard");
        } else {
            Alert.alert("Error", json.errors?.join(", ") || "Failed to log meal.");
        }
    };

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Manual Meal Entry</Text>

                {["name", "calories", "protein", "carbs", "fat", "sugar", "salt"].map((key) => (
                    <TextInput
                        key={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        style={[styles.input, { fontFamily }]}
                        keyboardType={key === "name" ? "default" : "numeric"}
                        value={meal[key]}
                        onChangeText={(text) => handleChange(key, text)}
                    />
                ))}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={[styles.buttonText, { fontFamily }]}>Add Meal</Text>
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
    submitButton: {
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
