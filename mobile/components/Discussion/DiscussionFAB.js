import React, { useState } from "react";
import { useTheme, FAB, Portal, Provider } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function DiscussionFAB({}) {
    const theme = useTheme();
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    const styles = StyleSheet.create({
        fab: {
            backgroundColor: theme.colors.accent,
        },
    });

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? "close-thick" : "shape-plus"}
                    fabStyle={styles.fab}
                    actions={[
                        // {
                        //     icon: "head-question-outline",
                        //     label: "Question",
                        //     onPress: () => console.log("Pressed star"),
                        // },
                        {
                            icon: "align-horizontal-left",
                            label: "Poll",
                            onPress: () => console.log("Pressed star"),
                        },
                        {
                            icon: "ab-testing",
                            label: "Choice",
                            onPress: () => console.log("Pressed star"),
                        },
                        {
                            icon: "code-json",
                            label: "Code",
                            onPress: () => console.log("Pressed star"),
                        },
                        {
                            icon: "image-outline",
                            label: "Image",
                            onPress: () => console.log("Pressed email"),
                        },
                        {
                            icon: "link",
                            label: "Website",
                            onPress: () => console.log("Pressed email"),
                        },
                        {
                            icon: "form-textbox",
                            label: "Text",
                            onPress: () => console.log("Pressed notifications"),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
        </Provider>
    );
}
