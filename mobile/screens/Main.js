import React from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Test" onPress={() => navigation.navigate("Test")} />
        </View>
    );
}

function TestScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

export default function Main() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "DevHuddle",
                }}
            />
            <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
