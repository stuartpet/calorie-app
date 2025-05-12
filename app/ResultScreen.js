import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen({ route, navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';
    const { meal } = route.params;

    return (
        <AppBackground>
            <View style={styles.container}>
                <Ionicons name="checkmark-circle" size={80} color="#00ffcc" style={{ marginBottom: 20 }} />

                <Text style={[styles.title, { fontFamily }]}>Meal Logged</Text>

                <View style={styles.summaryBox}>
                    <Text style={[styles.mealName, { fontFamily }]}>{meal.name}</Text>
                    <Text style={[styles.macro, { fontFamily }]}>Calories: {meal.calories} kcal</Text>
                    <Text style={[styles.macro, { fontFamily }]}>Protein: {meal.protein}g</Text>
                    <Text style={[styles.macro, { fontFamily }]}>Carbs: {meal.carbs}g</Text>
                    <Text style={[styles.macro, { fontFamily }]}>Fat: {meal.fat}g</Text>
                    <Text style={[styles.macro, { fontFamily }]}>Sugar: {meal.sugar}g</Text>
                    <Text style={[styles.macro, { fontFamily }]}>Salt: {meal.salt}g</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={[styles.buttonText, { fontFamily }]}>Back to Dashboard</Text>
                </TouchableOpacity>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20
    },
    summaryBox: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        marginBottom: 30
    },
    mealName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10
    },
    macro: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 2
    },
    button: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
