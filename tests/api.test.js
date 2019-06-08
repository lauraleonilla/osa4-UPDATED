const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = helper.initalBlogs.map(e => new Blog(e))
  const promiseArray = blogObjects.map(e => e.save())
  await Promise.all(promiseArray)
})
describe('Blog api tests', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initalBlogs.length)
  })

  test('The field name is id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })

  test('A blog can be added', async () => {
    const initialLength = helper.initalBlogs.length
    const newBlog = {
      title: 'Add a blog test',
      author: 'Author',
      url: 'url',
      likes: 8
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsinDb()
    expect(finalBlogs.length).toBe(initialLength + 1)

    const blogContent = finalBlogs.map(e => e.title)
    expect(blogContent).toContain('Add a blog test')
  })

  test('If !likes likes = 0', async () => {
    const newBlog = {
      title: 'Test likes',
      author: 'Author',
      url: 'url'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
    const finalBlogs = await helper.blogsinDb()
    const lastBlog = finalBlogs.length - 1
    expect(finalBlogs[lastBlog].likes).toBe(0)
  })

  test('If !title or !url, res.status(400)', async () => {
    const newBlog = {
      title: 'Test likes',
      author: 'Author',
      likes: 9
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('A blog can be deleted', async () => {
    const blogs = await helper.blogsinDb()
    const blogToDelete = blogs[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  })

  test('A blog can be updated', async () => {
    const blogs = await helper.blogsinDb()
    const blogToUpdate = blogs[0]
    const newBlog = {
      title: 'Updated blog title',
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 10
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
    const updated = await helper.blogsinDb()
    const final = updated.map(e => e.title)
    expect(final).toContain('Updated blog title')
  })
})

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'TestUser', password: 'sekret' })
  await user.save()
})

describe('User validation', () => {
  test('A non-valid user cannot be added', async () => {
    const newUser = {
      username: 'TestUser',
      name: 'Tesing',
      password: 's',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'Give a password with at least three characters'
      })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
