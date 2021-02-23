import React, { useContext } from "react";
import { Title, Subheading } from "react-native-paper";
import { Text } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../contexts/AuthContext";

export default function HuddlesScreen() {
    const { user } = useContext(AuthContext);

    return (
        <ScreenContainer>
            <Title> Huddles </Title>
            {/* <Title> Welcome back, {user.firstName} </Title>
            <Subheading> Here are the latest huddles as of </Subheading>
            <Text>{JSON.stringify(user)}</Text> */}
        </ScreenContainer>
    );
}
