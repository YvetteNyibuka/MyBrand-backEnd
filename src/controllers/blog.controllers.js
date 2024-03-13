const Blog = require('../models/blogSchema.js');

// create a blog
const httpCreateBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
  });

  await blog.save();

  res.status(201).json({ message: 'Blog created', data: blog });
};

// get all blogs
const httpGetBlogs = async (req, res) => {
  const blog = await Blog.find({});

  res.status(200).json({ message: 'success', data: blog });
};

// get one blog
const  httpGetOneBlog = async (req, res) => {
  const oneBlog = await Blog.findOne({_id: req.params.id});
  res.status(200).json({message: "Success", data: oneBlog})
}
//update single blogs
const httpUpdateOneBlog = async (req, res) => {
  try {
      const blog = await Blog.findOne({ _id: req.params.id })

      if (req.body.title) {
          blog.author = req.body.title
      }
      if (req.body.description) {
          blog.title = req.body.description
      }

      await blog.save()
      res.send(blog)
  } catch {
      res.status(404)
      res.send({ error: "blog doesn't exist!" })
  }
}

//delete blog
const deletesingleBlog =  async (req, res) => {
  try {
      await Blog.deleteOne({ _id: req.params.id })
      res.status(204).send()
  } catch {
      res.status(404)
      res.send({ error: "Blog doesn't exist!" })
  }
}


module.exports = { httpCreateBlog, httpGetBlogs, httpGetOneBlog, httpUpdateOneBlog, deletesingleBlog};