import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteOf(id));
  };

  const sortedAnecdotes = () => {
    const compareFunc = (a, b) => b.votes - a.votes;
    const sortedAnecdotes = [...anecdotes].sort(compareFunc);

    return sortedAnecdotes.map((anecdote) => (
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote.id)}
      />
    ));
  };

  return sortedAnecdotes();
};

export default AnecdoteList;
