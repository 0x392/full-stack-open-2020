import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, val }) => (
  <tr>
    <td>{text}</td>
    <td>{val}</td>
  </tr>
);

const StatisticsTable = ({ data: { good, neutral, bad } }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = `${(good / total) * 100}%`;

  return (
    <table>
      <tbody>
        <Statistic text="good" val={good} />
        <Statistic text="neutral" val={neutral} />
        <Statistic text="bad" val={bad} />
        <Statistic text="average" val={average} />
        <Statistic text="positive" val={positive} />
      </tbody>
    </table>
  );
};

const Title = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ data }) => {
  if (data.good + data.neutral + data.bad > 0) {
    return (
      <div>
        <Title text="statistics" />
        <StatisticsTable data={data} />
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const ButtonRow = ({
  data: { good, neutral, bad },
  handlers: { setGood, setNeutral, setBad },
}) => (
  <div>
    <Button text="good" onClick={() => setGood(good + 1)} />
    <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
    <Button text="bad" onClick={() => setBad(bad + 1)} />
  </div>
);

const GiveFeedback = ({ data, handlers }) => {
  return (
    <div>
      <Title text="give feedback" />
      <ButtonRow data={data} handlers={handlers} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const statisticData = { good, neutral, bad };
  const handlers = { setGood, setNeutral, setBad };

  return (
    <div>
      <GiveFeedback data={statisticData} handlers={handlers} />
      <Statistics data={statisticData} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
