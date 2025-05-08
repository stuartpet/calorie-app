// app/MealLogScreen.js
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

const API_URL = 'http://192.168.0.127:3000';

export default function MealLogScreen({ navigation }) {
    const [meals, setMeals] = useState([]);
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const fetchMeals = async () => {
        const token = await AsyncStorage.getItem('authToken');
        try {
            const response = await axios.get(`${API_URL}/api/v1/meals/today`, {
                headers: { Authorization: token }
            });
            setMeals(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to load meals.');
        }
    };

    const addMeal = async () => {
        if (!name) return Alert.alert('Missing', 'Please enter a meal name.');
        const token = await AsyncStorage.getItem('authToken');
        try {
            await axios.post(`${API_URL}/api/v1/meals`, {
                name,
                calories: parseInt(calories, 10) || 0
            }, {
                headers: { Authorization: token }
            });
            setName('');
            setCalories('');
            fetchMeals();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to log meal.');
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Log a Meal</Text>

                <View style={styles.card}>
                    <TextInput
                        placeholder="Meal name"
                        placeholderTextColor="#888"
                        style={[styles.input, { fontFamily }]}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder="Calories (optional)"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        style={[styles.input, { fontFamily }]}
                        value={calories}
                        onChangeText={setCalories}
                    />
                    <TouchableOpacity style={styles.button} onPress={addMeal}>
                        <Text style={styles.buttonText}>Add Meal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('PhotoMeal')}>
                        <Text style={styles.secondaryButtonText}>Snap a Photo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.subtitle, { fontFamily }]}>Today's Meals</Text>

                <FlatList
                    data={meals}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.mealItem}>
                            <Text style={[styles.mealText, { fontFamily }]}>{item.name}</Text>
                            <Text style={[styles.caloriesText, { fontFamily }]}>{item.calories} kcal</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#ccc' }}>No meals logged yet.</Text>}
                />

                <Text style={[styles.total, { fontFamily }]}>Total Today: {totalCalories} kcal</Text>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 24 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
    card: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 12
    },
    button: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    secondaryButton: {
        borderColor: '#2a9d8f',
        borderWidth: 1.5,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    secondaryButtonText: {
        color: '#2a9d8f',
        fontWeight: '600',
        fontSize: 16
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 12,
        fontWeight: '600'
    },
    mealItem: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mealText: { fontSize: 16 },
    caloriesText: { fontSize: 16, fontWeight: '600', color: '#e76f51' },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20
    }
});
