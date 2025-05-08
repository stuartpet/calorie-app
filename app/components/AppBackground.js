// app/components/AppBackground.js
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppBackground({ children }) {
    return (
        <LinearGradient
            colors={['#26c6da', '#ff8a65']} // Teal → Peach
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={styles.gradient}
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <View style={styles.overlay}>
                {children}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 24,
    },
});
