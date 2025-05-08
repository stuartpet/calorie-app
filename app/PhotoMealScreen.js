import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from './components/AppBackground';
import { useTheme } from './contexts/ThemeContext';

export default function PhotoMealScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            return Alert.alert('Permission required', 'Camera access is needed to take meal photos.');
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleSubmit(result.assets[0].uri);
        }
    };

    const handleSubmit = async (imageUri) => {
        if (!imageUri) return Alert.alert('No image selected');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('ConfirmMeal', {
                image: imageUri,
                prediction: { name: 'Pasta', calories: 450 } // Replace with real API call
            });
        }, 1000);
    };

    return (
        <AppBackground>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                <Text style={[styles.title, { fontFamily }]}>Snap Your Meal</Text>

                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.placeholderBox}>
                        <Text style={[styles.placeholderText, { fontFamily }]}>Ready to capture your meal</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                    <View style={styles.innerCircle} />
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
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
    placeholderBox: {
        width: 320,
        height: 320,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 24
    },
    placeholderText: {
        color: '#fff',
        fontSize: 16,
        fontStyle: 'italic'
    },
    cameraButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    innerCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20
    }
});
