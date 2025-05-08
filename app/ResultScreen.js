import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppBackground from './components/AppBackground';

export default function ResultScreen({ route, navigation }) {
    const { recommendedCalories } = route.params || {};

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={styles.title}>🎯 Daily Calorie Goal</Text>

                <View style={styles.resultBox}>
                    <Text style={styles.calories}>{recommendedCalories} kcal</Text>
                    <Text style={styles.label}>based on your profile</Text>
                </View>

                <Text style={styles.tip}>✅ Keep logging your meals to stay on track!</Text>

                <View style={styles.buttonGroup}>
                    <Button
                        title="Log Meals"
                        onPress={() => navigation.navigate('Meals')}
                        color="#2a9d8f"
                    />
                    <View style={{ height: 12 }} />
                    <Button
                        title="Snap Meal"
                        onPress={() => navigation.navigate('PhotoMeal')}
                        color="#34a0a4"
                    />
                </View>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    resultBox: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 32,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20
    },
    calories: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#e76f51'
    },
    label: {
        fontSize: 16,
        color: '#555'
    },
    tip: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 30,
        fontStyle: 'italic'
    },
    buttonGroup: {
        width: '80%',
        marginTop: 10
    }
});
