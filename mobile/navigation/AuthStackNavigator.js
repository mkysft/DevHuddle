import { createStackNavigator } from "@react-navigation/stack";

// Screens
import LoginScreen from "../screens/Authentication/LoginScreen";

// Stack
const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator initialRouteName="LoginScreen">
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        </AuthStack.Navigator>
    );
}
