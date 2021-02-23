import React, { useContext } from "react";

import AuthStackNavigator from "../navigation/AuthStackNavigator";
import MainTabNavigator from "../navigation/MainTabNavigator";

import { AuthContext } from "../contexts/AuthContext";

export default function Application() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />;
}
