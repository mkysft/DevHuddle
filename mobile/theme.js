import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import merge from "deepmerge";

export const HuddleThemeLight = merge(PaperDefaultTheme, NavigationDefaultTheme);
export const HuddleThemeDark = merge(PaperDarkTheme, NavigationDarkTheme);

export default HuddleThemeLight;
