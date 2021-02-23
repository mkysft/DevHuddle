import React, { useState, useContext } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { AuthContext } from "../../contexts/AuthContext";

import { asyncRegisterUser } from "../../services/AuthServices";

export default function RegisterScreen({ navigation }) {
    // Context
    const { setUserData, setTokenData, setProfileData } = useContext(AuthContext);

    // State
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    //  UX State
    const [loading, setIsLoading] = useState(false);

    // Functions
    const registerUser = async () => {
        setIsLoading((prev) => true);
        console.log({ firstName, lastName, emailAddress, password });
        const results = await asyncRegisterUser({ firstName, lastName, emailAddress, password });
        if (results.success) {
            const { data, token } = results;
            setUserData(data);
            setTokenData(token);
            setProfileData(data?.profile);
            setTimeout(() => {
                gotoOnboarding();
            }, 250);
            // TODO: Error handling + Toast
        }
    };

    const gotoLogin = () => {
        navigation.navigate("Login");
    };

    const gotoOnboarding = () => {
        navigation.navigate("Onboarding");
    };

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <Text style={styles.header}>Sign Up</Text>
                <Text style={styles.subheader}>Create an account to start sharing with other developers</Text>
                <View style={styles.form}>
                    <TextInput
                        dense
                        label="Firstname"
                        value={firstName}
                        onChangeText={setFirstname}
                        style={styles.field}
                    />
                    <TextInput
                        dense
                        label="Lastname"
                        value={lastName}
                        onChangeText={setLastname}
                        style={styles.field}
                    />
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
                        secureTextEntry={true}
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        right={<TextInput.Icon name="lock-outline" />}
                        style={styles.field}
                    />
                    <Button mode="contained" loading={loading} onPress={registerUser} style={styles.field}>
                        Create Account
                    </Button>
                    <Text style={styles.info}>Already have an account?</Text>
                    <Button uppercase={false} onPress={gotoLogin} labelStyle={styles.linkButton}>
                        Sign In
                    </Button>

                    <Button
                        uppercase={false}
                        onPress={() => navigation.navigate("Onboarding")}
                        labelStyle={styles.linkButton}
                    >
                        ONB
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
        marginTop: 12,
        paddingHorizontal: 48,
        textAlign: "center",
    },
    info: {
        marginTop: 64,
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
});
