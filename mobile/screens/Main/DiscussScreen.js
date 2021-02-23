import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
// Components
import DiscussionFAB from "../../components/Discussion/DiscussionFAB";

export default function ComposeScreen() {
    const [isFabOpen, setIsFabOpen] = useState(false);

    function toggleFAB({ open }) {
        setIsFabOpen(open);
    }

    return (
        <ScreenContainer>
            <Text> ComposeScreen </Text>
            <DiscussionFAB open={isFabOpen} onStateChange={toggleFAB} />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
