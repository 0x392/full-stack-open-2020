import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchField = ({ query, setQuery, detailMode, setDetailMode }) => {
  const changeHandler = (e) => {
    setQuery(e.target.value);
    setDetailMode({ ...detailMode, active: false });
  };

  return (
    <div>
      Find countries <input value={query} onChange={changeHandler} />
    </div>
  );
};

const SearchResult = ({ query, countries, detailMode, setDetailMode }) => {
  if (detailMode.active) {
    return <CountryDetail country={detailMode.country} />;
  }

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  } else {
    const clickHandler = (country) => () => {
      setDetailMode({ ...detailMode, active: true, country });
    };
    return filteredCountries.map((country) => (
      <div key={country.name}>
        {country.name} <button onClick={clickHandler(country)}>show</button>
      </div>
    ));
  }
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="360" height="240" alt="Flag" />
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [detailMode, setDetailMode] = useState({
    active: false,
    country: undefined,
  });

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <SearchField
        query={query}
        setQuery={setQuery}
        detailMode={detailMode}
        setDetailMode={setDetailMode}
      />
      <SearchResult
        query={query}
        countries={countries}
        detailMode={detailMode}
        setDetailMode={setDetailMode}
      />
    </>
  );
};

export default App;
