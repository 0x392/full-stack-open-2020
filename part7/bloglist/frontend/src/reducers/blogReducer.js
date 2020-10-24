export const initializeBlogs = (blogs) => ({ type: "INIT_BLOGS", data: blogs });

export const setBlogs = (blogs) => ({ type: "SET_BLOGS", data: blogs });

export const createBlog = (blog) => ({ type: "CREATE_BLOG", data: blog });

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "SET_BLOGS":
      return action.data;
    case "CREATE_BLOG":
      return state.concat(action.data);
    default:
      return state;
  }
};

export default reducer;
