import React, { useState, useContext } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { StyleSheet, View, Text } from "react-native";
import { useTheme, TextInput, Button, Chip } from "react-native-paper";

import { AuthContext } from "../../contexts/AuthContext";

import { asyncUpdateProfile } from "../../services/ProfileServices";

import { INTEREST_TAGS } from "../../data/interestTags";

export default function OnboardingScreen({ navigation }) {
    const theme = useTheme();
    const { user, userProfile, setProfileData, grantAccess } = useContext(AuthContext);
    console.log(userProfile);
    // State
    const [interestTags, setInterestTags] = useState([...(userProfile?.interests || [])]);
    const [loading, setIsLoading] = useState(false);

    // Update user profile
    const updateUserProfile = async () => {
        setIsLoading((prev) => true);
        const { id } = user?.profile;
        const results = await asyncUpdateProfile(id, { interests: [...interestTags] });
        if (results?.success) {
            const { data, token } = results;
            console.log(data);
            setProfileData(data);
            setTimeout(() => {
                grantAccess();
            }, 250);
        }
        // TODO: Error handling + Toast
    };

    const toggleTag = (tag) => {
        if (interestTags.includes(tag)) {
            const newTags = interestTags.filter((iTag) => iTag !== tag);
            setInterestTags([...newTags]);
        } else {
            const newTags = [...interestTags];
            newTags.push(tag);
            setInterestTags([...newTags]);
        }
    };

    const isTagSelected = (tag) => {
        return interestTags.includes(tag);
    };

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <Text style={styles.header}>Huddle Up!</Text>
                <Text style={styles.subheader}>
                    {`What peaks your interest? \n Pick 5 or more topics to get started.`}
                </Text>
                <View style={styles.techContainer}>
                    {INTEREST_TAGS.map((tag) => {
                        const selected = isTagSelected(tag);
                        return (
                            <Chip
                                key={tag}
                                icon={selected ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"}
                                selected={selected}
                                onPress={() => toggleTag(tag)}
                                textStyle={selected && { color: "white" }}
                                style={selected ? { ...styles.tag, backgroundColor: theme.colors.primary } : styles.tag}
                            >
                                {tag}
                            </Chip>
                        );
                    })}
                </View>
                <Button
                    mode="contained"
                    uppercase={false}
                    loading={loading}
                    disabled={interestTags.length < 5}
                    onPress={updateUserProfile}
                    labelStyle={styles.linkButton}
                >
                    Update Preferences
                </Button>
                <Button
                    uppercase={false}
                    disabled={interestTags.length >= 5}
                    onPress={() => grantAccess()}
                    labelStyle={styles.linkButton}
                >
                    SKIP
                </Button>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
    },
    header: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "700",
    },
    subheader: {
        marginTop: 12,
        textAlign: "center",
    },
    techContainer: {
        marginVertical: 24,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        margin: 4,
    },
    linkButton: {
        letterSpacing: 0.4,
    },
});
