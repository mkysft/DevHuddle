import React, { useState, useContext } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";

import { asyncLoginUser } from "../../services/AuthServices";

export default function LoginScreen({ navigation }) {
    // Context
    const { setUserData, setTokenData, setProfileData, grantAccess } = useContext(AuthContext);
    const { setSnackbarMessage, setSnackbarAction, setIsSnackbarVisible } = useContext(GlobalContext);
    // State

    const [emailAddress, setEmailAddress] = useState("evertonmichael.dev@gmail.com");
    const [password, setPassword] = useState("mikado24");

    // UX State
    const [loading, setIsLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    //  Functions
    const authenticateUser = async () => {
        setIsLoading((prev) => true);
        const results = await asyncLoginUser({ emailAddress, password });

        if (results?.success) {
            const { data, token } = results;
            setUserData(data);
            setTokenData(token);
            setProfileData(data?.profile);
            setTimeout(() => {
                grantAccess();
            }, 250);
            // TODO: Error handling + Toast
        } else {
            setIsLoading((prev) => false);
            setSnackbarMessage("Failed to Authenticate!");
            setSnackbarAction({ label: "Retry", onPress: authenticateUser });
            setIsSnackbarVisible(true);
        }
    };

    const gotoRegister = () => {
        navigation.navigate("Register");
    };

    const toggleHidePassword = () => setHidePassword(!hidePassword);

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <Text style={styles.header}>Welcome 127.0.0.1</Text>
                <Text style={styles.subheader}>Log in to access your feed</Text>
                <View style={styles.form}>
                    <TextInput
                        dense
                        label="Email"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                        right={<TextInput.Icon name="at" />}
                        style={styles.field}
                    />
                    <TextInput
                        dense
                        secureTextEntry={hidePassword}
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        right={
                            <TextInput.Icon
                                name={hidePassword ? "eye-outline" : "eye-off-outline"}
                                onPress={toggleHidePassword}
                            />
                        }
                        style={styles.field}
                    />
                    <Button mode="contained" loading={loading} onPress={authenticateUser} style={styles.field}>
                        Log In
                    </Button>
                    <Text style={styles.info}>New to this experience?</Text>
                    <Button uppercase={false} onPress={gotoRegister} labelStyle={styles.linkButton}>
                        Create an Account
                    </Button>
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
    },
    header: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "700",
    },
    subheader: {
        textAlign: "center",
    },
    info: {
        marginTop: 48,
        textAlign: "center",
    },
    form: {
        marginTop: 24,
        paddingHorizontal: 32,
    },
    field: {
        marginTop: 12,
    },
    linkButton: {
        letterSpacing: 0.4,
    },
    snackbarWrapper: {
        // position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
    },
    snackbar: {
        // backgroundColor: "red",
    },
});
