import anecdoteService from "../services/anecdotes";

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({ type: "NEW_ANECDOTE", data: newAnecdote });
  };
};

export const voteOf = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id);
    dispatch({ type: "VOTE", data: { id } });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case "NEW_ANECDOTE":
      return [...state, action.data];
    default:
      return state;
  }
};

export default reducer;
