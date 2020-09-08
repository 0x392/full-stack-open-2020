import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => <h1>{text}</h1>;

const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
  const idx = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Title text="Anecdote with most votes" />
      <div>{anecdotes[idx]}</div>
      <div>
        has {votes[idx]} {votes[idx] > 1 ? "votes" : "vote"}
      </div>
    </div>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const AnecdoteOfTheDay = ({
  anecdotes,
  votes,
  selected,
  handleVote,
  handleNextAnecdote,
}) => {
  return (
    <div>
      <Title text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>
        has {votes[selected]} {votes[selected] > 1 ? "votes" : "vote"}
      </div>
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNextAnecdote} />
    </div>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const handleNextAnecdote = () => {
    const nextIdx = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextIdx);
  };

  return (
    <>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        selected={selected}
        votes={votes}
        handleVote={handleVote}
        handleNextAnecdote={handleNextAnecdote}
      />
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
