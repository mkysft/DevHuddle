import React from "react";
import { StyleSheet, View } from "react-native";

export default function ScreenContainer({ children }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 16,
    },
});
