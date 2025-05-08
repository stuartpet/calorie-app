// app/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const API_URL = 'http://192.168.0.127:3000'; // Replace for production

export default function DashboardScreen({ navigation }) {
    const [calories, setCalories] = useState(0);
    const [goal, setGoal] = useState(1800); // fallback
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('authToken');
            try {
                const [mealRes, userRes] = await Promise.all([
                    axios.get(`${API_URL}/api/v1/meals/today`, { headers: { Authorization: token } }),
                    axios.get(`${API_URL}/api/v1/me`, { headers: { Authorization: token } })
                ]);
                const total = mealRes.data.reduce((sum, m) => sum + (m.calories || 0), 0);
                setCalories(total);
                setMeals(mealRes.data);
                setGoal(userRes.data.calorie_goal || 1800);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const percentage = Math.min(calories / goal, 1);
    const remaining = goal - calories;

    if (loading) {
        return (
            <AppBackground>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#2a9d8f" />
                </View>
            </AppBackground>
        );
    }

    return (
        <AppBackground>
            <View style={styles.header}>
                <Text style={[styles.welcome, { fontFamily }]}>Welcome back </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.progressBox}>
                <Text style={[styles.calories, { fontFamily }]}>{calories} kcal</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.filledBar, { width: `${percentage * 100}%` }]} />
                </View>
                <Text style={styles.goalLabel}>
                    Goal: {goal} kcal ({remaining >= 0 ? `${remaining} left` : `${-remaining} over`})
                </Text>
            </View>

            <FlatList
                style={styles.mealList}
                data={meals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('EditMeal', { meal: item })}>
                        <View style={styles.mealItem}>
                            <Text style={styles.mealText}>{item.name}</Text>
                            <Text style={styles.mealCalories}>{item.calories} kcal</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.noMeals}>No meals logged today</Text>}
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('PhotoMeal')}>
                    <MaterialCommunityIcons name="camera-outline" size={26} color="#fff" />
                    <Text style={styles.buttonLabel}>Snap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('Meals')}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={26} color="#fff" />
                    <Text style={styles.buttonLabel}>Log</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={26} color="#fff" />
                    <Text style={styles.buttonLabel}>Settings</Text>
                </TouchableOpacity>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 20,
    },
    welcome: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    progressBox: {
        marginBottom: 24,
    },
    calories: {
        fontSize: 48,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    progressBar: {
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 12,
    },
    filledBar: {
        height: '100%',
        backgroundColor: '#00d4ff',
    },
    goalLabel: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        opacity: 0.9,
    },
    mealList: {
        flex: 1,
        marginBottom: 20,
    },
    mealItem: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mealText: {
        color: '#fff',
        fontSize: 16,
    },
    mealCalories: {
        color: '#fff',
        fontWeight: '600',
    },
    noMeals: {
        color: '#ccc',
        textAlign: 'center',
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
        paddingVertical: 10,
    },
    circleButton: {
        alignItems: 'center',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
    },
});
