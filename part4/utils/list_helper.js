// Receives an array of blog posts as a parameter
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const mostLikes = { count: 0, blogIdx: 0 };

  blogs.forEach((blog, idx) => {
    if (blog.likes > mostLikes.count) {
      mostLikes.count = blog.likes;
      mostLikes.blogIdx = idx;
    }
  });

  return blogs.length === 0 ? null : blogs[mostLikes.blogIdx];
};

// Returns the author who has most blog posts
const mostBlogs = (blogs) => {
  // Mapping author to its number of blog posts
  const blogsNumDict = {};
  let mostBlogsNum = 0;
  let result = null;

  blogs.forEach(({ author }) => {
    if (blogsNumDict[author]) blogsNumDict[author] += 1;
    else blogsNumDict[author] = 1;
  });

  for (let author in blogsNumDict) {
    if (blogsNumDict[author] > mostBlogsNum) {
      mostBlogsNum = blogsNumDict[author];
      result = { author, blogs: mostBlogsNum };
    }
  }

  return result;
};

// Returns the author who has most likes
const mostLikes = (blogs) => {
  const likesNumDict = {};
  let mostLikesNum = 0;
  let result = null;

  blogs.forEach(({ author, likes }) => {
    if (likesNumDict[author]) likesNumDict[author] += likes;
    else likesNumDict[author] = likes;
  });

  for (let author in likesNumDict) {
    if (likesNumDict[author] > mostLikesNum) {
      mostLikesNum = likesNumDict[author];
      result = { author, likes: mostLikesNum };
    }
  }

  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
