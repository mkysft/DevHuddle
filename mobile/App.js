import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

// Contexts
import { AuthContext } from "./contexts/AuthContext";
import { PreferencesContext } from "./contexts/PreferencesContext";

// Theming
import { HuddleThemeLight, HuddleThemeDark } from "./theme";
import Application from "./screens";

import { setAuthorizationToken } from "./services/axios";

export default function App() {
    // PERFORMANCE OPTIMIZATIONS
    enableScreens();

    // THEMING
    const [isThemeDark, setIsThemeDark] = useState(false);
    const HuddleTheme = isThemeDark ? HuddleThemeDark : HuddleThemeLight;
    const toggleTheme = useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const PREFERENCES_CONTEXT = useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    // AUTHENTICATION
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setUserData = useCallback((userData) => {
        setUser({ ...userData });
    }, []);

    const setTokenData = useCallback((tokenData) => {
        setToken(tokenData);
    }, []);

    const setProfileData = useCallback((profileData) => {
        return setUserProfile({ ...profileData });
    }, []);

    const grantAccess = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const logoutUser = useCallback(() => {
        // Clear state and stuff
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        if (token) {
            setAuthorizationToken(token);
        }
        return () => {
            console.log("Exit");
        };
    }, [token]);

    const AUTH_CONTEXT = {
        user,
        setUserData,
        token,
        setTokenData,
        userProfile,
        setProfileData,
        isAuthenticated,
        grantAccess,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={AUTH_CONTEXT}>
            <PreferencesContext.Provider value={PREFERENCES_CONTEXT}>
                <PaperProvider theme={HuddleTheme}>
                    <SafeAreaProvider>
                        <NavigationContainer theme={HuddleTheme}>
                            <Application />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </PreferencesContext.Provider>
        </AuthContext.Provider>
    );
}
