import { Request, Response } from 'express';
import Blog from '../models/blogSchema';

// create a blog
export const httpCreateBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created', data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get all blogs
export const httpGetBlogs = async (req: Request, res: Response) => {
  
  try {
    const blogs:any = await Blog.find({});    
    res.status(200).json({ message: "All blogs", data: blogs });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get one blog
export const httpGetOneBlog = async (req: Request, res: Response) => {
  try {
    const singleBlog = await Blog.findOne({ _id: req.params.id });
    res.status(200).json({ message: "Blog found", data: singleBlog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// update single blogs
export const httpUpdateOneBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

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
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// delete blog
export const deletesingleBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
