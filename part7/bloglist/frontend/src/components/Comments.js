import React from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const CreateCommentForm = ({ blogId }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.persist();

    try {
      await blogService.addComment(blogId, comment);
      event.target.comment.value = "";
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="comment" />
      <button>Add</button>
    </form>
  );
};

const Comments = ({ blog }) => {
  const { id, comments } = blog;

  return (
    <div>
      <h3>Comments</h3>
      <CreateCommentForm blogId={id} />
      <ul>
        {comments.map((comment, idx) => (
          <li key={`comment-${idx}`}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
