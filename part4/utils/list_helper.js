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

module.exports = { dummy, totalLikes, favoriteBlog };
