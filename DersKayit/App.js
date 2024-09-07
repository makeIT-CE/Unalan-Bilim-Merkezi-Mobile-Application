import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import AllImages from './components/AllImages';
import LoginScreen from './components/LoginScreen';
import Register from './components/Register';
import LessonRegister from './components/LessonRegister';
import Feedback from './components/Feedback';
import Staj from './components/Staj'
// Alt sekme navigatörü oluşturma
const Tab = createBottomTabNavigator();

// Yığın navigatörü oluşturma
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Detaylı Açıklama" component={AllImages} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="LessonRegister" component={LessonRegister} options={{headerShown: false}} />
      <Stack.Screen name="Çağrı/Öneri" component={Feedback} />
      <Stack.Screen name="Staj" component={Staj} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

 
            if (route.name === 'Anasayfa') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Rezervasyon') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            } else if (route.name === 'Staj Başvuru') {
              iconName = focused ? 'ios-document' : 'ios-document-text-outline';
            } else if (route.name === 'Çağrı/Öneri') {
              iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Anasayfa" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Rezervasyon" component={LessonRegister} options={{ headerShown: false }} />
        <Tab.Screen name="Staj Başvuru" component={Staj} />
        <Tab.Screen name="Çağrı/Öneri" component={Feedback} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Stil tanımlamaları buraya eklenebilir
});