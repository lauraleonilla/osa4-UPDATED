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
  let counts = {}
  let compare = 0
  let mostFrequent
  for (let i = 0, len = authors.length; i < len; i++) {
    let word = authors[i]
    if (counts[word] === undefined) {
      counts[word] = 1
    } else {
      counts[word] = counts[word] + 1
    }
    if (counts[word] > compare) {
      compare = counts[word]
      mostFrequent = authors[i]
    }
  }
  let finalObject = {
    author: '',
    blogs: 0
  }
  authors.map(e => {
    if (e === mostFrequent) finalObject.blogs++, (finalObject.author = e)
    return finalObject
  })
  return finalObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteblog,
  mostBlogs
}
