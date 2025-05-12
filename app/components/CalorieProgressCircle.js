import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function CalorieProgressCircle({ consumed, goal }) {
    const radius = 70;
    const strokeWidth = 10;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const progress = Math.min(consumed / goal, 1);
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <View style={styles.container}>
            <Svg height={radius * 2} width={radius * 2}>
                <Circle
                    stroke="#444"
                    fill="none"
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke="#00ffcc"
                    fill="none"
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${radius}, ${radius}`}
                />
            </Svg>
            <View style={styles.label}>
                <Text style={styles.caloriesText}>{consumed}</Text>
                <Text style={styles.goalText}>/ {goal} kcal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },
    label: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    caloriesText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold'
    },
    goalText: {
        color: '#ccc',
        fontSize: 14
    }
});
