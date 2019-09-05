const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const populateQuery = [{ path:'user', username: 1, name: 1 }, { path: 'comments', content: 1 }]
    const blogs = await Blog.find({}).populate(populateQuery)
    res.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    const populateQuery = [{ path:'user', username: 1, name: 1 }, { path: 'comments', content: 1 }]
    const blogs = await Blog.find({}).populate(populateQuery)
    res.json(blogs.map(blog => blog.toJSON()))
    if (blog) res.json(blog.toJSON())
    else res.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      comments: body.comments,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (user.blogs.includes(req.params.id)) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } else {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    })
    res.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
  const body = req.body
  const blog = await Blog.findById(req.params.id)
  try {
    const comment = new Comment({ content: body.content })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    res.json(savedComment.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
