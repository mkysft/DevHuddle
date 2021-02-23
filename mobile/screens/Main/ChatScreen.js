import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Appbar, useTheme, Portal, Paragraph, Dialog, Button } from "react-native-paper";

import { AuthContext } from "../../contexts/AuthContext";

export default function ChatScreen() {
    const theme = useTheme();
    const { user } = useContext(AuthContext);

    return (
        <>
            <Appbar theme={theme}>
                <Appbar.Content title={"Conversations"} />
                <Appbar.Action icon="magnify" onPress={() => {}} />
                <Appbar.Action icon="dots-vertical" onPress={() => {}} />
            </Appbar>
            <SafeAreaView>
                <Text> Chat Screen </Text>
            </SafeAreaView>
        </>
    );
}
