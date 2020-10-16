export const initializeAnecdotes = (anecdotes) => {
  return { type: "INIT_ANECDOTES", data: anecdotes };
};

export const createAnecdote = (data) => {
  return { type: "NEW_ANECDOTE", data };
};

export const voteOf = (id) => {
  return { type: "VOTE", data: { id } };
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
