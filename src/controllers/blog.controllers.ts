import { Request, Response } from "express";
import Blog from "../models/blogSchema";
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";

// create a blog
export const httpCreateBlog = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
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
        if (error) {
          console.error(error);
          res.status(500).json({
            status: false,
            message:
              "An error occurred while uploading the image to Cloudinary",
          });
        } else {
          const blog = new Blog({
            title: title,
            description: description,
            coverImage: cloudinaryResult.secure_url,
          });
          await blog.save();
          res.status(201).json({ message: "Blog created", data: blog });
        }
      }
    );
    if (!result) {
      throw new Error("Cloudinary upload failed");
    }

    streamifier.createReadStream(imageFile.buffer).pipe(result);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all blogs
export const httpGetBlogs = async (req: Request, res: Response) => {
  try {
    const blogs: any = await Blog.find({});
    res.status(200).json({ message: "All blogs", data: blogs });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const httpGetOneBlog = async (req: Request, res: Response) => {
  try {
    const singleBlog = await Blog.findOne({ _id: req.params.id });

    if (!singleBlog) {
      return res.status(404).json({ message: "Blog not found", data: {} });
    }

    res.status(200).json({ message: "Blog found", data: singleBlog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update single blogs
export const httpUpdateOneBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id.trim();

    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", data: null });
    }

    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", data: blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete blog
export const deletesingleBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
