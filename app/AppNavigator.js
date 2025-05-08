// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ProfileSetupScreen from './ProfileSetupScreen';
import ConfirmMealScreen from './ConfirmMealScreen';
import PhotoMealScreen from './PhotoMealScreen';
import ResultScreen from './ResultScreen';
import SettingsScreen from './SettingsScreen';
import DashboardScreen from "./DashboardScreen";
import EditMealScreen from "./EditMealScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="PhotoMeal" component={PhotoMealScreen} />
            <Stack.Screen name="ConfirmMeal" component={ConfirmMealScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="EditMeal" component={EditMealScreen} />

        </Stack.Navigator>
    );
}
