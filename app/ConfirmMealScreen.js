import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, StyleSheet,
    TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

const API_URL = 'http://192.168.0.127:3000';

export default function ConfirmMealScreen({ route, navigation }) {
    const { image, prediction = {} } = route.params;
    const [customName, setCustomName] = useState(prediction.name || '');
    const [loading, setLoading] = useState(false);
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const handleConfirm = async () => {
        const token = await AsyncStorage.getItem('authToken');
        const name = customName.trim();

        if (!name) return Alert.alert('Missing', 'Please enter a meal name.');

        try {
            setLoading(true);
            await axios.post(`${API_URL}/api/v1/meals`, { name }, {
                headers: { Authorization: token }
            });

            setLoading(false);
            Alert.alert('✅ Meal Logged', `You logged: ${name}`);
            navigation.navigate('Dashboard');
        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert('Error', 'Failed to log meal.');
        }
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                {/* ⬅️ Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <Text style={[styles.title, { fontFamily }]}>Confirm Your Meal</Text>

                {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                )}

                <Text style={[styles.label, { fontFamily }]}>Edit or confirm meal name:</Text>
                <TextInput
                    placeholder="Meal name"
                    placeholderTextColor="#999"
                    value={customName}
                    onChangeText={setCustomName}
                    style={[styles.input, { fontFamily }]}
                />

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={loading}>
                    <Text style={styles.confirmText}>Confirm Meal</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#fff" />}
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 12
    },
    backButtonText: {
        fontSize: 16,
        color: '#f4a261',
        fontWeight: '600'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 14,
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        color: '#eee',
        marginBottom: 6
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    confirmButton: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center'
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});
