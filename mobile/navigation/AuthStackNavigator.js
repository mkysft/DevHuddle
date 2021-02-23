import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SafeScreen from "../components/SafeScreen";
// Screens
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import OnboardingScreen from "../screens/Authentication/OnboardingScreen";

// Stack
const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
    return (
        <SafeScreen>
            <AuthStack.Navigator initialRouteName="Login" headerMode={"none"}>
                <AuthStack.Screen name="Login" component={LoginScreen} />
                <AuthStack.Screen name="Register" component={RegisterScreen} />
                <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
            </AuthStack.Navigator>
        </SafeScreen>
    );
}
