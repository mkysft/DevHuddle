import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { Appbar, useTheme, Portal, Paragraph, Dialog, Button, List, Divider, Avatar } from "react-native-paper";
import { getUserInitials, getUserFullname } from "../../../utils/stringParsers";

import { AuthContext } from "../../../contexts/AuthContext";
import { PreferencesContext } from "../../../contexts/PreferencesContext";

export default function SettingsScreen() {
    const theme = useTheme();
    const { user, logoutUser } = useContext(AuthContext);

    const { isThemeDark, toggleTheme } = useContext(PreferencesContext);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function toggleDialog() {
        setIsDialogOpen(!isDialogOpen);
    }

    return (
        <>
            <Appbar theme={theme}>
                <Appbar.Content title="Settings" />
                <Appbar.Action icon={isThemeDark ? "white-balance-sunny" : "brightness-4"} onPress={toggleTheme} />
                <Appbar.Action icon="logout-variant" onPress={toggleDialog} />
            </Appbar>
            <List.Section>
                <List.Item
                    title={getUserFullname(user)}
                    description={user.emailAddress}
                    left={() => (
                        <Avatar.Text
                            size={56}
                            label={getUserInitials(user)}
                            style={{ backgroundColor: "whitesmoke", marginBottom: 8, marginHorizontal: 4 }}
                        />
                    )}
                />
                <Divider />
                <List.Item
                    title="Account"
                    description="Privacy, security, change details"
                    left={() => <List.Icon color={theme.colors.primary} icon="shield-account" />}
                />
                <List.Item
                    title="Chats"
                    description="Rules, chat history"
                    left={() => <List.Icon color={theme.colors.primary} icon="forum" />}
                />
                <List.Item
                    title="Notifications"
                    description="Message, feeds and huddles"
                    left={() => <List.Icon color={theme.colors.primary} icon="bell-ring" />}
                />
                <List.Item
                    title="Help"
                    description="Help centre, privacy policy"
                    left={() => <List.Icon color={theme.colors.primary} icon="help-circle" />}
                />
                <List.Item
                    title="About"
                    description="Developers, sources, open source"
                    left={() => <List.Icon color={theme.colors.primary} icon="book-information-variant" />}
                />
            </List.Section>
            <Divider />
            <Text style={styles.info}>{"Developed by \n @mikeysoftware"}</Text>

            {/* Logout Dialog */}
            <Portal>
                <Dialog visible={isDialogOpen} onDismiss={toggleDialog}>
                    <Dialog.Title>Logging Out</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Notifications will be disabled until you re-login.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={toggleDialog}>Cancel</Button>
                        <Button onPress={logoutUser}>Logout</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    info: {
        paddingTop: 48,
        textAlign: "center",
    },
});
