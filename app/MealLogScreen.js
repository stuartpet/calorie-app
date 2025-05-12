import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function MealLogScreen({ navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const [meals, setMeals] = useState([]);

    const fetchMeals = async () => {
        try {
            const res = await fetch("https://your-api.com/api/v1/meals/today", {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            const json = await res.json();
            if (res.ok) setMeals(json);
            else Alert.alert("Error", json.error || "Could not load meals.");
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to fetch meals.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://your-api.com/api/v1/meals/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setMeals(meals.filter((m) => m.id !== id));
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Could not delete meal.");
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const renderMeal = ({ item }) => (
        <View style={styles.mealItem}>
            <Image source={{ uri: item.food_item.supabase_url }} style={styles.mealImage} />
            <View style={styles.mealText}>
                <Text style={[styles.mealName, { fontFamily }]}>{item.name}</Text>
                <Text style={[styles.mealMacros, { fontFamily }]}>
                    {item.calories} kcal • P:{item.protein}g C:{item.carbs}g F:{item.fat}g
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => navigation.navigate('EditMeal', { meal: item })}>
                    <Ionicons name="pencil" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 12 }}>
                    <Ionicons name="trash" size={22} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>Meal Log</Text>

                <FlatList
                    data={meals}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMeal}
                    style={{ width: '100%' }}
                />
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20
    },
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 10,
        marginVertical: 8
    },
    mealImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12
    },
    mealText: {
        flex: 1
    },
    mealName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    mealMacros: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4
    },
    actions: {
        flexDirection: 'row'
    }
});
