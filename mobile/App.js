import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

// Contexts
import { AuthContext } from "./contexts/AuthContext";
import { GlobalContext } from "./contexts/GlobalContext";
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

    // PREFERENCES
    const PREFERENCES_CONTEXT = useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    // GLOBAL
    const [snackbarMessage, setSnackbarMessage] = useState(false);
    const [snackbarAction, setSnackbarAction] = useState({ label: "Dismiss", onPress: () => {} });
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const onDismissSnackBar = () => setIsSnackbarVisible(false);

    const GLOBAL_CONTEXT = useMemo(
        () => ({
            setSnackbarMessage,
            setSnackbarAction,
            setIsSnackbarVisible,
        }),
        [setSnackbarMessage, setSnackbarAction, setIsSnackbarVisible]
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
                <GlobalContext.Provider value={GLOBAL_CONTEXT}>
                    <PaperProvider theme={HuddleTheme}>
                        <SafeAreaProvider>
                            <NavigationContainer theme={HuddleTheme}>
                                <Application />
                                {/* Global Notification */}
                            </NavigationContainer>
                            <Snackbar
                                visible={isSnackbarVisible}
                                onDismiss={onDismissSnackBar}
                                action={{ ...snackbarAction }}
                            >
                                {snackbarMessage}
                            </Snackbar>
                        </SafeAreaProvider>
                    </PaperProvider>
                </GlobalContext.Provider>
            </PreferencesContext.Provider>
        </AuthContext.Provider>
    );
}
