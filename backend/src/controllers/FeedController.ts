import { Request, Response } from "express";
import axios from "axios";
import xmlParser from "fast-xml-parser";
import FEED_PUBLISHERS from "../config/feedsources";

class UserController {
    static getTodaysFeed = async (req: Request, res: Response) => {
        const { tags }: any = req.params;

        let articles = [];

        // Send the users object
        res.status(200).json({
            success: true,
            message: "Feed provided",
            data: articles,
        });
    };

    static getTagFeed = async (req: Request, res: Response) => {
        const { tag }: any = req.body;

        // Get RSS feed things
        const TAG_SOURCES = FEED_PUBLISHERS.map((publisher) => axios.get(publisher + "/" + tag));

        let articleSets = [];

        await axios
            .all(TAG_SOURCES)
            .then(
                axios.spread((...responses) => {
                    responses.forEach((response, index) => {
                        let articles = xmlParser.parse(response.data).rss.channel.item;
                        if (articles.length > 5) articleSets.slice(0, 4);
                        if (Array.isArray(articles)) {
                            let articlesWithImage = articles.map((article) => {
                                let content = article["content:encoded"];
                                if (content) {
                                    let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
                                    let urls = content.match(urlRegex);
                                    // TODO: Make sure is link to image
                                    article.thumbnail = urls[0].replace(/['"]+/g, "");
                                }
                                return article;
                            });
                            articleSets = [...articleSets, ...articlesWithImage];
                        }
                    });
                })
            )
            .catch((errors) => {
                console.log(errors);
            });

        // Send the users object
        res.status(200).json({
            success: true,
            message: "Tag feed provided",
            data: articleSets,
        });
    };
}

export default UserController;
