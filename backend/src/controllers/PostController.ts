import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import { UserRequest } from "../interfaces/UserRequestInterface";
import { Post } from "../entities/Post";

class PostController {
    static getPostFeed = async (req: Request, res: Response) => {
        const { where, order, page = 1, limit = 10, cache = true }: any = req.params;
        const query: FindManyOptions<Post> = {
            where: { ...where },
            order: { ...order },
            skip: (page - 1) * limit,
            take: limit,
            cache: cache,
        };

        // Get users from database
        const postRepository = getRepository(Post);
        const [posts, count] = await postRepository.findAndCount(query);

        // Do pagination stuff I guess

        // Send the users object
        res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                count: count,
            },
        });
    };

    static getAllPosts = async (req: Request, res: Response) => {
        const { where, order, page = 1, limit = 10, cache = true }: any = req.params;
        const query: FindManyOptions<Post> = {
            where: { ...where },
            order: { ...order },
            skip: (page - 1) * limit,
            take: limit,
            cache: cache,
        };

        // Get users from database
        const postRepository = getRepository(Post);
        const [posts, count] = await postRepository.findAndCount(query);

        // Do pagination stuff I guess

        // Send the users object
        res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                count: count,
            },
        });
    };

    static createPost = async (req: UserRequest, res: Response) => {
        // Get parameters from the request body
        let { title, slug, description, contentMarkdown, tags } = req.body;

        // Create a new User
        let post = new Post();
        post.title = title;
        post.slug = slug;
        post.description = description;
        post.contentMarkdown = contentMarkdown;
        post.tags = tags;
        post.user = req.user;

        // Get the user from database
        const postRepository = getRepository(Post);
        try {
            const newPost = await postRepository.save(post);
            return res.status(200).json({
                success: "true",
                message: "Post was successfully created!",
                data: newPost,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to create post. Try again.`,
            });
        }
    };

    static getPostByID = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No Post ID provided in parameters.",
            });
        }

        // Get the user from database
        const postRepository = getRepository(Post);
        try {
            const post = await postRepository.findOneOrFail(id);
            return res.status(200).json({
                success: "true",
                message: "Post was successfully found!",
                data: post,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Posts found with ID: ${id}`,
            });
        }
    };

    static updatePostByID = async (req: UserRequest, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No Post ID provided in parameters.",
            });
        }

        // Fetch the post from database
        const postRepository = getRepository(Post);
        let post;
        try {
            post = await postRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Posts found with ID: ${id}`,
            });
        }

        // Update user with parameters from the request body
        try {
            let updatedPost = await postRepository.save({ id, ...post, ...req.body });
            return res.status(200).json({
                success: "true",
                message: "Post was successfully updated!",
                data: updatedPost,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to update Post. Try again.`,
            });
        }
    };

    static deletePostByID = async (req: UserRequest, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No Post ID provided in parameters.",
            });
        }

        // Get the user from database
        const postRepository = getRepository(Post);
        try {
            await postRepository.delete(id);
            return res.status(200).json({
                success: "true",
                message: "Post was successfully deleted!",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to create post. Try again.`,
            });
        }
    };

    static getCurrentUserPosts = async (req: UserRequest, res: Response) => {
        // Get the user ID from the authentication middleware
        const id: string = req.user.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in token.",
            });
        }

        // Fetch and return the user from database
        const postRepository = getRepository(Post);
        try {
            const posts = await postRepository.find({ user: { id: id } });

            if (posts.length === 0) {
                return res.status(404).json({
                    success: true,
                    message: "No Posts currently associated with this account.",
                });
            }

            return res.status(200).json({
                success: "true",
                message: "Posts were successfully found!",
                data: posts,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "Failed to load posts for your account.",
            });
        }
    };
}

export default PostController;
