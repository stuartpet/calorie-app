import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function CustomText({ style, children, ...props }) {
    const { dyslexiaMode } = useTheme();

    return (
        <Text
            style={[
                style,
                dyslexiaMode && { fontFamily: 'OpenDyslexic' },
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}
