// app/EditMealScreen.js
import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Alert,
    StyleSheet, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

const API_URL = 'http://192.168.0.127:3000';

export default function EditMealScreen({ route, navigation }) {
    const { meal } = route.params;
    const [name, setName] = useState(meal.name);
    const [calories, setCalories] = useState(String(meal.calories));
    const [loading, setLoading] = useState(false);
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const handleUpdate = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('authToken');

        try {
            await axios.patch(`${API_URL}/api/v1/meals/${meal.id}`, {
                name,
                calories: parseInt(calories, 10)
            }, {
                headers: { Authorization: token }
            });

            Alert.alert('✅ Meal updated');
            navigation.goBack();
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Could not update meal.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('authToken');

        Alert.alert('Delete Meal?', 'This cannot be undone.', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await axios.delete(`${API_URL}/api/v1/meals/${meal.id}`, {
                            headers: { Authorization: token }
                        });
                        Alert.alert('🗑️ Meal deleted');
                        navigation.goBack();
                    } catch (err) {
                        console.error(err);
                        Alert.alert('Error', 'Could not delete meal.');
                    }
                }
            }
        ]);
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Edit Meal</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Meal name"
                    placeholderTextColor="#666"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Calories"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={calories}
                    onChangeText={setCalories}
                />

                <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} disabled={loading}>
                    <Text style={styles.deleteText}>Delete Meal</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#fff',
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 16
    },
    button: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center'
    },
    deleteText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    }
});
