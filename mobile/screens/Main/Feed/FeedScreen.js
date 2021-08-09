import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { Caption } from "react-native-paper";
import ScreenContainer from "../../../components/ScreenContainer";
import { asyncGetFeed } from "../../../services/FeedServices";
import ArticleCard from "../../../components/Feed/ArticleCard";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function FeedScreen({ tag }) {
    const [articles, setArticles] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getPostFeed();
    }, []);

    const getPostFeed = async () => {
        setRefreshing(true);
        const results = await asyncGetFeed({ tag });
        if (results?.success) {
            const { data } = results;
            console.log("@@@ LENGTH", data.length);
            setArticles(data);
            setLastUpdated(new Date());
            setRefreshing(false);
        }
    };

    const renderArticle = ({ item, index }) => {
        return <ArticleCard article={item} />;
    };

    return (
        <ScreenContainer>
            <Caption style={styles.caption}>
                Placeholder
                {/* Last Update: {lastUpdated ? formatDistanceToNow(lastUpdated, { addSuffix: true }) : null}{" "} */}
            </Caption>
            {/* <FlatList
                data={articles}
                extraData={articles}
                renderItem={renderArticle}
                onRefresh={getTagFeed}
                refreshing={refreshing}
                initialNumToRender={6}
                removeClippedSubviews={true}
                keyExtractor={(article) => article.guid}
                style={styles.container}
            /> */}
            {/* <ScrollView>
                {articles.map((article) => (
                    <ArticleCard key={article.guid} article={article} />
                ))}
            </ScrollView> */}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    caption: {
        textAlign: "right",
    },
});
