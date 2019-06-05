const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  const oneBlog = [
    {
      title: 'STORY',
      author: 'YOU',
      url: 'www.google.com',
      likes: 4,
      id: '5cf7b3ff873a17abef6e791c'
    }
  ]
  test('Returns likes of one blog', () => {
    const res = listHelper.totalLikes(oneBlog)
    expect(res).toBe(4)
  })
})

describe('Most likes', () => {
  const blogs = [
    {
      title: 'STORY',
      author: 'YOU',
      url: 'www.google.com',
      likes: 4,
      id: '5cf7b3ff873a17abef6e791c'
    },
    {
      title: 'STORY 2',
      author: 'ME',
      url: 'www.google.com',
      likes: 10,
      id: '5cf7c55ccfa27fcd6cbad160'
    }
  ]
  test('Returns object of the blog with most likes', () => {
    const res = listHelper.favoriteblog(blogs)
    expect(res).toEqual({
      title: 'STORY 2',
      author: 'ME',
      likes: 10
    })
  })
})

describe('Most blogs', () => {
  const blogs = [
    {
      title: 'STORY',
      author: 'YOU',
      url: 'www.google.com',
      likes: 4,
      id: '5cf7b3ff873a17abef6e791c'
    },
    {
      title: 'TEST',
      author: 'YOU',
      url: 'www.google.com',
      likes: 1,
      id: '5cf7c55ccfa27fcd6cbad160'
    },
    {
      title: 'STORY 3',
      author: 'YOU',
      url: 'www.google.com',
      likes: 130,
      id: '5cf7ea3dcb2d7c175de5805d'
    },
    {
      title: 'STORY 4',
      author: 'ME',
      url: 'www.google.com',
      likes: 1,
      id: '5cf7ea45cb2d7c175de5805e'
    }
  ]
  test('Returns author with most blogs', () => {
    const res = listHelper.mostBlogs(blogs)
    expect(res).toEqual({
      author: 'YOU',
      blogs: 3
    })
  })
})
