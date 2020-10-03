// Receives an array of blog posts as a parameter
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  let mostLikesCount = 0;
  let mostLikesIdx = 0;

  blogs.forEach((blog, i) => {
    if (blog.likes > mostLikesCount) {
      mostLikesCount = blog.likes;
      mostLikesIdx = i;
    }
  });

  return blogs.length === 0 ? null : blogs[mostLikesIdx];
};

const mostBlogs = (blogs) => {
  const blogsNum = {};
  let mostBlogsNum = 0;
  let result = null;

  blogs.forEach(({ author }) => {
    if (blogsNum[author]) blogsNum[author] += 1;
    else blogsNum[author] = 1;
  });

  for (author in blogsNum) {
    if (blogsNum[author] > mostBlogsNum) {
      mostBlogsNum = blogsNum[author];
      result = { author, blogs: mostBlogsNum };
    }
  }

  return result;
};

const mostLikes = (blogs) => {
  const likesNum = {};
  let mostLikesNum = 0;
  let result = null;

  blogs.forEach(({ author, likes }) => {
    if (likesNum[author]) likesNum[author] += likes;
    else likesNum[author] = likes;
  });

  for (author in likesNum) {
    if (likesNum[author] > mostLikesNum) {
      mostLikesNum = likesNum[author];
      result = { author, likes: mostLikesNum };
    }
  }

  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
