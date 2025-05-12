import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import AppBackground from './components/AppBackground';
import CalorieProgressCircle from './components/CalorieProgressCircle';
import { useTheme } from './contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
    const { dyslexiaMode } = useTheme();
    const fontFamily = dyslexiaMode ? 'OpenDyslexic' : 'System';

    // Example data (replace with live)
    const username = "Stuart";
    const calorieGoal = 2200;
    const caloriesConsumed = 1340;
    const protein = 70;
    const carbs = 120;
    const fat = 45;
    const meals = [
        {
            id: '1',
            name: 'Oats & Berries',
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 8,
            image: 'https://example.com/oats.jpg'
        },
        {
            id: '2',
            name: 'Tuna Wrap',
            calories: 420,
            protein: 30,
            carbs: 35,
            fat: 14,
            image: 'https://example.com/tuna.jpg'
        }
    ];

    const renderMeal = ({ item }) => (
        <View style={styles.mealItem}>
            <Image source={{ uri: item.image }} style={styles.mealImage} />
            <View style={styles.mealText}>
                <Text style={[styles.mealName, { fontFamily }]}>{item.name}</Text>
                <Text style={[styles.mealMacros, { fontFamily }]}>
                    {item.calories} kcal • P:{item.protein}g C:{item.carbs}g F:{item.fat}g
                </Text>
            </View>
        </View>
    );

    return (
        <AppBackground>
            <View style={styles.container}>
                <Text style={[styles.header, { fontFamily }]}>Welcome, {username}</Text>

                <CalorieProgressCircle consumed={caloriesConsumed} goal={calorieGoal} />

                <View style={styles.macroBar}>
                    <View style={[styles.macroBlock, { backgroundColor: '#00bfff' }]}>
                        <Text style={[styles.macroLabel, { fontFamily }]}>Protein: {protein}g</Text>
                    </View>
                    <View style={[styles.macroBlock, { backgroundColor: '#32cd32' }]}>
                        <Text style={[styles.macroLabel, { fontFamily }]}>Carbs: {carbs}g</Text>
                    </View>
                    <View style={[styles.macroBlock, { backgroundColor: '#ffa500' }]}>
                        <Text style={[styles.macroLabel, { fontFamily }]}>Fat: {fat}g</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { fontFamily }]}>Today’s Meals</Text>

                <FlatList
                    data={meals}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMeal}
                    style={{ width: '100%' }}
                />

                <View style={styles.bottomButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('PhotoMeal')}>
                        <Ionicons name="camera" size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
                        <Ionicons name="create" size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name="settings" size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
                        <Ionicons name="create" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 24,
        marginBottom: 16
    },
    macroBar: {
        width: '100%',
        marginBottom: 24
    },
    macroBlock: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 4
    },
    macroLabel: {
        color: '#fff',
        fontSize: 14
    },
    sectionTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 8,
        alignSelf: 'flex-start'
    },
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 10,
        marginVertical: 8
    },
    mealImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12
    },
    mealText: {
        flex: 1
    },
    mealName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    mealMacros: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30
    }
});
