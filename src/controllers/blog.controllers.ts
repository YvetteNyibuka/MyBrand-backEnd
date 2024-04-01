import { Request, Response } from "express";
import Blog from "../models/blogSchema";
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import Comment from "../models/commentSchema";
import Like from "../models/likeSchema";

export const httpCreateBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, category, author } = req.body;
    const imageFile = req.file;
    if (!imageFile) {
      res.status(400).json({
        status: "failed",
        message: "Please provide an image file",
      });
      return;
    }
    const result: UploadStream = cloudinaryV2.uploader.upload_stream(
      { folder: "myPortfolio" },
      async (error, cloudinaryResult: any) => {
       
          const blog = new Blog({
            category: category,
            author: author,
            title: title,
            description: description,
            coverImage: cloudinaryResult.secure_url,
          });
          await blog.save();
          res.status(201).json({ message: "Blog created successfuly", data: blog });
        }
      
    );
  
    streamifier.createReadStream(imageFile.buffer).pipe(result);
  } catch (error) {
    res.status(500).json({message: "internal server error", error})
  }
};


export const httpGetBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found", data: null });
    }

    const blogsWithComments = await Promise.all(blogs.map(async (blog) => {
      const comments = await Comment.find({ blogId: blog._id });
      const likes = await Like.find({ blogId: blog._id });
      return {
        ...blog.toObject(),
        comments: comments,
        likes: likes
      };
    }));
``
    return res.status(200).json({ message: "Blogs with comments", data: blogsWithComments });
  } 
  catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const httpGetOneBlog = async (req: Request, res: Response) => {
  try {
    const singleBlog: any = await Blog.findOne({ _id: req.params.id });
    if (!singleBlog) {
      return res.status(404).json({ message: "Blog not found", data: {} });
    }
    const singleBlogComments = await Comment.find({blogId: singleBlog._id})
    const singleBloglikes = await Like.find({blogId: singleBlog._id})
    res.status(200).json({ message: "Blog found", data: {singleBlog, singleBlogComments, singleBloglikes} });
  }
   catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const httpUpdateOneBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id.trim();

    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", data: null });
    }
    await blog.save();
    res.status(201).json({ message: "Blog updated successfully", data: blog });
  }
   catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletesingleBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
    if(deletedBlog.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found"});
    }
    return res.status(204).json({ message: "Blog deleted successfully"});;
  }
   catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
