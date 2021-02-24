import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { Caption } from "react-native-paper";
import ScreenContainer from "../../../components/ScreenContainer";
import { asyncGetTodaysFeed } from "../../../services/FeedServices";
import ArticleCard from "../../../components/Feed/ArticleCard";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function FeedScreen({ articleID }) {
    const [articles, setArticles] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getTagFeed();
    }, [tag]);

    const getTagFeed = async () => {
        // setRefreshing(true);
        // const results = await asyncGetTodaysFeed({ tag });
        // if (results?.success) {
        //     const { data } = results;
        //     console.log("@@@ LENGTH", data.length);
        //     setArticles(data);
        //     setLastUpdated(new Date());
        //     setRefreshing(false);
        // }
    };

    const renderArticle = ({ item, index }) => {
        return <ArticleCard article={item} />;
    };

    return (
        <ScreenContainer>
            <Caption>
                Last Update: {lastUpdated ? formatDistanceToNow(lastUpdated, { addSuffix: true }) : null}{" "}
            </Caption>
            <ScrollView />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
