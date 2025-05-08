// app/components/CalorieProgressCircle.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 200;
const STROKE_WIDTH = 14;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CalorieProgressCircle({ value, max }) {
    const progress = Math.min(value / max, 1);
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

    return (
        <View style={styles.container}>
            <Svg width={SIZE} height={SIZE}>
                <Circle
                    stroke="#eee"
                    fill="none"
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE_WIDTH}
                />
                <Circle
                    stroke="#2a9d8f"
                    fill="none"
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE_WIDTH}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${SIZE / 2}, ${SIZE / 2}`}
                />
            </Svg>
            <View style={styles.labelContainer}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>/ {max} kcal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24
    },
    labelContainer: {
        position: 'absolute',
        alignItems: 'center'
    },
    value: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2a9d8f'
    },
    unit: {
        fontSize: 14,
        color: '#666'
    }
});
