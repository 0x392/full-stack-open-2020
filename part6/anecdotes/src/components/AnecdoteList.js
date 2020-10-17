import React from "react";
import { connect } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
);

const AnecdoteList = (props) => {
  const vote = ({ id, content }) => {
    props.voteOf(id);
    props.setNotification(`You voted "${content}"`, 5);
  };

  const filteredAnecdotes = props.anecdotes.filter(
    (anecdote) => anecdote.content.indexOf(props.filter) !== -1
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = { voteOf, setNotification };

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
