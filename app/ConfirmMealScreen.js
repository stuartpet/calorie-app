import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function ConfirmMealScreen({ route, navigation }) {
    const { result, image } = route.params;
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';
    const [loading, setLoading] = useState(false);

    const [customFood, setCustomFood] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        sugar: '',
        salt: ''
    });

    const handleChange = (key, value) => {
        setCustomFood(prev => ({ ...prev, [key]: value }));
    };

    const logMeal = async (foodItemId) => {
        setLoading(true);
        try {
            const res = await fetch("https://your-api.com/api/v1/meals", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ food_item_id: foodItemId })
            });

            if (res.ok) {
                navigation.navigate("Dashboard");
            } else {
                const json = await res.json();
                Alert.alert("Error", json.error || "Could not log meal.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const submitCustomFood = async () => {
        const formData = new FormData();

        Object.keys(customFood).forEach(key => {
            formData.append(`food_item[${key}]`, customFood[key]);
        });

        formData.append("image", {
            uri: image,
            name: "custom.jpg",
            type: "image/jpeg"
        });

        setLoading(true);

        try {
            const res = await fetch("https://your-api.com/api/v1/food_items/create_custom", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data"
                },
                body: formData
            });

            const json = await res.json();

            if (res.ok) {
                await logMeal(json.id);
            } else {
                Alert.alert("Error", json.errors?.join(", ") || "Could not create food item.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const renderMacro = (label, value) => (
        <Text style={[styles.macro, { fontFamily }]}>
            {label}: {value}g
        </Text>
    );

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                <Text style={[styles.title, { fontFamily }]}>Confirm Your Meal</Text>

                <Image source={{ uri: image }} style={styles.image} />

                {result.confident ? (
                    <View style={styles.resultBox}>
                        <Text style={[styles.resultName, { fontFamily }]}>{result.match.name}</Text>
                        <Text style={[styles.calories, { fontFamily }]}>
                            {result.match.calories} kcal
                        </Text>

                        {renderMacro('Protein', result.match.protein)}
                        {renderMacro('Carbs', result.match.carbs)}
                        {renderMacro('Fat', result.match.fat)}
                        {renderMacro('Sugar', result.match.sugar)}
                        {renderMacro('Salt', result.match.salt)}

                        <TouchableOpacity style={styles.confirmButton} onPress={() => logMeal(result.match.id)}>
                            <Text style={[styles.buttonText, { fontFamily }]}>Log This Meal</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.resultBox}>
                        <Text style={[styles.resultName, { fontFamily }]}>No match found</Text>
                        <Text style={[styles.calories, { fontFamily }]}>
                            Add manually below:
                        </Text>

                        {Object.keys(customFood).map((key) => (
                            <TextInput
                                key={key}
                                placeholder={key}
                                keyboardType="numeric"
                                style={[styles.input, { fontFamily }]}
                                value={customFood[key]}
                                onChangeText={(text) => handleChange(key, text)}
                            />
                        ))}

                        <TouchableOpacity style={styles.confirmButton} onPress={submitCustomFood}>
                            <Text style={[styles.buttonText, { fontFamily }]}>Submit Custom Meal</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    backButton: {
        position: 'absolute',
        top: 50,
        left: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    image: {
        width: 320,
        height: 320,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 24
    },
    resultBox: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12
    },
    resultName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8
    },
    calories: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 8
    },
    macro: {
        fontSize: 16,
        color: '#fff'
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10,
        borderRadius: 8
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'
    }
});
