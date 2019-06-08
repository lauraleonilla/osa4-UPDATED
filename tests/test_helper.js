const Blog = require('../models/blog')
const User = require('../models/user')

const initalBlogs = [
  {
    title: 'Testi blogi 1',
    author: 'Laura',
    url: 'www.google.com',
    likes: 3
  },
  {
    title: 'Testi blogi 2',
    author: 'Heikki',
    url: 'www.google.com',
    likes: 6
  }
]

const blogsinDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(e => e.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initalBlogs,
  blogsinDb,
  usersInDb
}
