import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import merge from "deepmerge";

export const CustomTheme = {
    roundness: 4,
    colors: {
        primary: "#C62828",
        primaryLight: "#FF5F52",
        primaryDark: "#8E0000",
        accent: "#FF7213",
        background: "white",
    },
};

export const HuddleThemeLight = merge.all([PaperDefaultTheme, NavigationDefaultTheme, CustomTheme]);
export const HuddleThemeDark = merge.all([PaperDarkTheme, NavigationDarkTheme, CustomTheme]);

export default HuddleThemeLight;
