import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';

import { authOnStateChanged } from './redux/auth/authOperations';

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';

import Home from './screens/mainContent/Home';
import CreatePostScreen from './screens/mainContent/CreatePostsScreen';
import ProfileScreen from './/screens/mainContent/ProfileScreen';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default function RouterNavigator() {
  const dispatch = useDispatch();

  const { isAuth } = useSelector(state => state.auth);

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.41,
          color: '#212121',
        },
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.3)',
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          alignItems: 'center',
          borderTopWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.3)',
          backgroundColor: '#FFFFFF',
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          margin: 9,
          borderRadius: 20,
        },
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveTintColor: '#FFFFFF',
        tabBarActiveBackgroundColor: '#FF6C00',
      }}
    >
      <MainTab.Screen
        options={({ navigation }) => ({
          headerTitle: 'Publications',
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginRight: 10 }}
              onPress={() => dispatch(authOnStateChanged())}
            >
              <Feather name="log-out" size={24} color={'#BDBDBD'} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        })}
        name="Home"
        component={Home}
      />

      <MainTab.Screen
        options={{
          headerTitle: 'Create post',
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: 16 }}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={'rgba(33, 33, 33, 0.8)'}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostScreen}
      />

      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="md-person-outline" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
