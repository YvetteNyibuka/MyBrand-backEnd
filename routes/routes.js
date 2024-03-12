const express = require("express")
    const Blog = require("../models/blogmodel")
    const router = express.Router()
    
    router.get("/blogs", async (req, res) => {
        try {
          const blogs = await Blog.find();
          res.send(blogs);
        } catch (error) {
          res.status(500).send(error.message);
        }
      });

      // Create a new blog
    router.post("/blogs/add", async (req, res) => {
    try {
    
        const blog = new Blog({
            author: req.body.author,
            title: req.body.title,
            content: req.body.content,
        })
        await blog.save()
        res.send(blog)


    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id })
        res.send(blog)
    } catch {
        res.status(404)
        res.send({ error: "blog doesn't exist!" })
    }
})

// update blog
router.patch("/blogs/update/:id", async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id })

        if (req.body.author) {
            blog.author = req.body.author
        }
        if (req.body.title) {
            blog.title = req.body.title
        }

        if (req.body.content) {
            blog.content = req.body.content
        }

        await blog.save()
        res.send(blog)
    } catch {
        res.status(404)
        res.send({ error: "blog doesn't exist!" })
    }
})

//delete blog
router.delete("/blogs/delete/:id", async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
})
    
  module.exports = router
