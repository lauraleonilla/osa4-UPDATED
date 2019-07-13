const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (a, c) => {
    return a + c
  }
  const likes = blogs.map(e => e.likes)
  const totalLikes = likes.reduce(reducer)
  return totalLikes
}

const favoriteblog = blogs => {
  const likes = blogs.map(e => e.likes)
  const mostLikes = Math.max(...likes)
  const faveBlog = blogs.filter(e => e.likes === mostLikes)
  let final = {}
  faveBlog.map(
    e =>
      (final = {
        title: e.title,
        author: e.author,
        likes: e.likes
      })
  )
  return final
}

const mostBlogs = blogs => {
  const authors = blogs.map(e => e.author)
  const counts = {}
  let compare = 0
  let mostFrequent
  for (let i = 0; i < authors.length; i++) {
    const currentBlog = authors[i]
    if (counts[currentBlog] === undefined) {
      counts[currentBlog] = 1
    } else {
      counts[currentBlog] = counts[currentBlog] + 1
    }
    if (counts[currentBlog] > compare) {
      compare = counts[currentBlog]
      mostFrequent = currentBlog
    }
  }
  const finalObject = {
    author: '',
    blogs: 0
  }
  authors.map(e => {
    if (e === mostFrequent) finalObject.blogs++, (finalObject.author = e)
    return finalObject
  })
  return finalObject
}

const mostLikes = blogs => {
  const authorLikes = blogs.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  }, {})

  const mostLikes = Object.keys(authorLikes).sort(
    (a, b) => authorLikes[b] - authorLikes[a]
  )[0]

  const finalObject = {
    author: mostLikes,
    likes: authorLikes[mostLikes]
  }
  return finalObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteblog,
  mostBlogs,
  mostLikes
}
