import { createStackNavigator } from "@react-navigation/stack";

// Screens
import LoginScreen from "../screens/Authentication/LoginScreen";

// Stack
const MainTab = createStackNavigator();

export default function MainTabNavigator() {
    return (
        <MainTab.Navigator initialRouteName="LoginScreen">
            <MainTab.Screen name="LoginScreen" component={LoginScreen} />
        </MainTab.Navigator>
    );
}
