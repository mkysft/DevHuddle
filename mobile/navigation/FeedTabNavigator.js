import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { AuthContext } from "../contexts/AuthContext";

// Screens
import FeedScreen from "../screens/Main/Feed/FeedScreen";

// Stack
const FeedTab = createMaterialTopTabNavigator();

export default function FeedTabNavigator() {
    const { userProfile } = useContext(AuthContext);

    return (
        <FeedTab.Navigator
            tabBarOptions={{
                scrollEnabled: true,
                tabStyle: styles.tab,
                style: {},
            }}
        >
            {userProfile.tags.map((tag) => (
                <FeedTab.Screen key={tag} name={tag}>
                    {(props) => <FeedScreen {...props} tag={tag} />}
                </FeedTab.Screen>
            ))}
        </FeedTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        textTransform: "uppercase",
    },
});
