// app/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Button, ActivityIndicator, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

const API_URL = 'http://192.168.0.127:3000';

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('authToken');
            try {
                const res = await axios.get(`${API_URL}/api/v1/me`, {
                    headers: { Authorization: token }
                });
                setUser(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <AppBackground>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2a9d8f" />
                </View>
            </AppBackground>
        );
    }

    return (
        <AppBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.title, { fontFamily }]}>👤 Your Profile</Text>

                <View style={styles.card}>
                    <Text style={[styles.item, { fontFamily }]}>Email: {user?.email}</Text>
                    <Text style={[styles.item, { fontFamily }]}>Age: {user?.age}</Text>
                    <Text style={[styles.item, { fontFamily }]}>Height: {user?.height} cm</Text>
                    <Text style={[styles.item, { fontFamily }]}>Weight: {user?.weight} kg</Text>
                    <Text style={[styles.item, { fontFamily }]}>Gender: {user?.gender}</Text>
                    <Text style={[styles.item, { fontFamily }]}>Activity: {user?.activity_level}</Text>
                    <Text style={[styles.item, { fontFamily }]}>Goal: {user?.goal}</Text>
                </View>

                <Button title="✏️ Edit Profile" onPress={() => navigation.navigate('ProfileSetup')} />
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 24,
        flexGrow: 1
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        backgroundColor: '#ffffffaa',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 2
    },
    item: {
        fontSize: 16,
        marginBottom: 8
    }
});
