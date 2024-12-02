import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "./firebaseConfig";
import HomeScreen from "./screens/HomeScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AddEditEventScreen from "./screens/AddEditEventScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator for Home, Favorites, and Add/Edit Event screens
const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="AddEditEvent"
      component={AddEditEventScreen}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="add" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user); 
    });

   return unsubscribe;
  }, []);

  if (isAuthenticated === null) {
    
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            {}
            <Stack.Screen
              name="MainTab"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetail"
              component={EventDetailScreen}
              options={{ title: "Event Detail" }}
            />
            <Stack.Screen
              name="AddEditEvent"
              component={AddEditEventScreen}
              options={{ title: "Edit Event" }}
            />
          </>
        ) : (
          <>
            {}
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
