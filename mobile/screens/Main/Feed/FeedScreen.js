import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { Caption } from "react-native-paper";
import ScreenContainer from "../../../components/ScreenContainer";
import { asyncGetTodaysFeed } from "../../../services/FeedServices";
import ArticleCard from "../../../components/Feed/ArticleCard";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function FeedScreen({ tag }) {
    const [articles, setArticles] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        getTagFeed();
    }, [tag]);

    const getTagFeed = async () => {
        const results = await asyncGetTodaysFeed({ tag });
        if (results?.success) {
            const { data } = results;
            console.log("@@@ LENGTH", data.length);
            setArticles(data);
            setLastUpdated(new Date());
        }
    };

    const renderArticle = ({ item, index }) => {
        return <ArticleCard article={item} />;
    };

    return (
        <ScreenContainer>
            <Caption>
                Last Update: {lastUpdated ? formatDistanceToNow(lastUpdated, { addSuffix: true }) : null}{" "}
            </Caption>
            <FlatList
                data={articles}
                extraData={articles}
                renderItem={renderArticle}
                initialNumToRender={5}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={300}
                windowSize={10}
                keyExtractor={(article) => article.guid}
                style={styles.container}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
