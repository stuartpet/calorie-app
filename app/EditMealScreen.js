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

export default function EditMealScreen({ route, navigation }) {
    const { meal } = route.params;
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [form, setForm] = useState({
        name: meal.name,
        calories: String(meal.calories),
        protein: String(meal.protein),
        carbs: String(meal.carbs),
        fat: String(meal.fat),
        sugar: String(meal.sugar),
        salt: String(meal.salt)
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`https://your-api.com/api/v1/meals/${meal.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const json = await res.json();

            if (res.ok) {
                Alert.alert('Saved', 'Meal updated successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', json.error || 'Update failed');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Edit Meal</Text>

                {Object.keys(form).map((key) => (
                    <TextInput
                        key={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        style={[styles.input, { fontFamily }]}
                        keyboardType={key === 'name' ? 'default' : 'numeric'}
                        value={form[key]}
                        onChangeText={(text) => handleChange(key, text)}
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        fontSize: 16
    },
    saveButton: {
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
