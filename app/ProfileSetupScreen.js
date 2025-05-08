import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

const API_URL = 'http://192.168.0.127:3000';

const options = {
    gender: ['Male', 'Female', 'Other'],
    activity: ['Sedentary', 'Light', 'Moderate', 'Active'],
    goal: ['Lose', 'Maintain', 'Gain']
};

export default function ProfileSetupScreen({ navigation }) {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goal, setGoal] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const handleOpenModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const handleSelect = (value) => {
        if (modalType === 'gender') setGender(value.toLowerCase());
        if (modalType === 'activity') setActivityLevel(value.toLowerCase());
        if (modalType === 'goal') setGoal(value.toLowerCase());
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        if (!age || !height || !weight || !gender || !activityLevel || !goal) {
            return Alert.alert('Missing fields', 'Please complete all fields.');
        }

        const token = await AsyncStorage.getItem('authToken');
        try {
            await axios.put(`${API_URL}/api/v1/me`, {
                age, height, weight, gender, activity_level: activityLevel, goal
            }, {
                headers: { Authorization: token }
            });

            Alert.alert('✅ Profile saved');
            navigation.navigate('Dashboard');
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Could not save profile.');
        }
    };

    return (
        <AppBackground>
            <>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={[styles.title, { fontFamily }]}>Set Up Your Profile</Text>

                    <TextInput
                        placeholder="Age"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        style={[styles.input, { fontFamily }]}
                        value={age}
                        onChangeText={setAge}
                    />
                    <TextInput
                        placeholder="Height (cm)"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        style={[styles.input, { fontFamily }]}
                        value={height}
                        onChangeText={setHeight}
                    />
                    <TextInput
                        placeholder="Weight (kg)"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        style={[styles.input, { fontFamily }]}
                        value={weight}
                        onChangeText={setWeight}
                    />

                    <TouchableOpacity onPress={() => handleOpenModal('gender')} style={styles.dropdown}>
                        <Text style={[styles.dropdownText, { fontFamily }]}>
                            {gender ? gender : 'Select gender'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpenModal('activity')} style={styles.dropdown}>
                        <Text style={[styles.dropdownText, { fontFamily }]}>
                            {activityLevel ? activityLevel : 'Select activity level'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpenModal('goal')} style={styles.dropdown}>
                        <Text style={[styles.dropdownText, { fontFamily }]}>
                            {goal ? goal : 'Select goal'}
                        </Text>
                    </TouchableOpacity>

                    <Button title="Save Profile" onPress={handleSubmit} />
                </ScrollView>

                <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={options[modalType]}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelect(item)}>
                                        <Text style={[styles.modalItem, { fontFamily }]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 16
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#f9f9f9'
    },
    dropdownText: {
        fontSize: 16,
        color: '#333'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000aa'
    },
    modalContent: {
        backgroundColor: '#fff',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20
    },
    modalItem: {
        fontSize: 18,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee'
    }
});
