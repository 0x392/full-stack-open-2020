import React, { useState } from "react";
import { useField, useCountry } from "./hooks";

const Country = ({ country }) => {
  if (!country) return null;
  if (!country.found) return <div>Not found.</div>;

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>Capital: {country.data.capital} </div>
      <div>Population: {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`Flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState(""); // country name to search
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} />
    </>
  );
};

export default App;
