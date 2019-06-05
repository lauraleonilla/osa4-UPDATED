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

module.exports = {
  dummy,
  totalLikes,
  favoriteblog
}
