import React, { useState, useCallback, useMemo } from "react";
import { enableScreens } from "react-native-screens";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import { PreferencesContext } from "./contexts/PreferencesContext";
import { HuddleThemeLight, HuddleThemeDark } from "./theme";
import Main from "./screens/Main";

export default function App() {
    // PERFORMANCE OPTIMIZATIONS
    enableScreens();

    // THEMING
    const [isThemeDark, setIsThemeDark] = useState(false);
    const HuddleTheme = isThemeDark ? HuddleThemeDark : HuddleThemeLight;
    const toggleTheme = useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const USER_PREFERENCES = useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    return (
        <PreferencesContext.Provider value={USER_PREFERENCES}>
            <PaperProvider theme={HuddleTheme}>
                <NavigationContainer theme={HuddleTheme}>
                    <Main />
                </NavigationContainer>
            </PaperProvider>
        </PreferencesContext.Provider>
    );
}
