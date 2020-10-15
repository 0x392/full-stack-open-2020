import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

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
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const vote = ({ id, content }) => {
    dispatch(voteOf(id));
    dispatch(showNotification(`You voted "${content}"`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  const filteredAnecdotes = anecdotes.filter(
    (anecdote) => anecdote.content.indexOf(filter) !== -1
  );

  const compareFunc = (a, b) => b.votes - a.votes;
  const sortedAnecdotes = [...filteredAnecdotes].sort(compareFunc);

  return sortedAnecdotes.map((anecdote) => (
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => vote(anecdote)}
    />
  ));
};

export default AnecdoteList;
