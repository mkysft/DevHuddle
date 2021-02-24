import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useTheme, Surface, Card, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function ArticleCard({ article }) {
    const theme = useTheme();
    const { title, pubDate, thumbnail } = article;

    return (
        <View>
            <Card style={styles.card}>
                <Image source={{ uri: thumbnail }} resizeMode="cover" resizeMethod="resize" style={styles.image} />
                <Card.Title title={title} titleNumberOfLines={2} titleStyle={styles.title} />
                <Card.Actions style={styles.actions}>
                    <Caption>{pubDate ? format(new Date(pubDate), "LLL dd y") : null}</Caption>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="share-outline" color={theme.colors.primary} size={20} style={styles.action} />
                        <Icon name="bookmark-outline" color={theme.colors.primary} size={20} style={styles.action} />
                    </View>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    card: {
        height: 108,
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 8,
        marginLeft: 50,
        elevation: 4,
    },
    image: {
        height: 92,
        width: 92,
        position: "absolute",
        zIndex: 1,
        marginLeft: -54,
        borderRadius: 4,
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        flexWrap: "wrap",
        margin: 0,
        marginLeft: 32,
        marginRight: 8,
    },
    actions: {
        justifyContent: "space-between",
        marginLeft: 40,
    },
    action: {
        marginLeft: 8,
    },
});
