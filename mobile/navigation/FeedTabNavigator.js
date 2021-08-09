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

    const FEED_TYPES = ["Feed", "Popular"];

    return (
        <FeedTab.Navigator
            tabBarOptions={{
                scrollEnabled: true,
                tabStyle: styles.tab,
                style: {},
            }}
        >
            {FEED_TYPES.map((tag) => (
                <FeedTab.Screen key={tag} name={tag}>
                    {(props) => <FeedScreen {...props} tag={tag} />}
                </FeedTab.Screen>
            ))}
            {/* <FeedTab.Screen name={"dailyFeed"} component={FeedScreen} /> */}
        </FeedTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        fontWeight: "bold",
    },
});
