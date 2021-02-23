import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import SafeScreen from "../components/SafeScreen";

// Screens
import FeedScreen from "../screens/Main/Feed";
import DiscussScreen from "../screens/Main/DiscussScreen";
import ChatScreen from "../screens/Main/ChatScreen";
import HuddlesScreen from "../screens/Main/HuddlesScreen";
import SettingsScreen from "../screens/Main/Settings";

// Stack
const MainTab = createMaterialBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <SafeScreen>
            <MainTab.Navigator initialRouteName="Feed">
                <MainTab.Screen
                    name="Feed"
                    component={FeedScreen}
                    options={{ tabBarIcon: () => <Entypo name="text-document-inverted" color="white" size={20} /> }}
                />
                <MainTab.Screen
                    name="Huddles"
                    component={HuddlesScreen}
                    options={{ tabBarIcon: () => <Entypo name="slideshare" color="white" size={20} /> }}
                />
                {/* <MainTab.Screen
                    name="Discuss"
                    component={DiscussScreen}
                    options={{ tabBarIcon: () => <Entypo name="typing" color="white" size={20} /> }}
                /> */}
                <MainTab.Screen
                    name="Discuss"
                    component={DiscussScreen}
                    options={{ tabBarIcon: () => <Material name="message-bulleted" color="white" size={20} /> }}
                />
                <MainTab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ tabBarIcon: () => <Entypo name="chat" color="white" size={20} /> }}
                />
                <MainTab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ tabBarIcon: () => <Entypo name="cog" color="white" size={20} /> }}
                />
            </MainTab.Navigator>
        </SafeScreen>
    );
}
