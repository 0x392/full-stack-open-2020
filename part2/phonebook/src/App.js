import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  onChangeNewName,
  onChangeNewNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onChangeNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonList = ({ persons, setPersons, filter }) => {
  const handleClick = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
    }
  };

  return persons
    .filter(
      (person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
    .map((filteredPerson) => (
      <Person
        key={filteredPerson.name}
        person={filteredPerson}
        onClick={handleClick(filteredPerson)}
      />
    ));
};

const Person = ({ person, onClick }) => {
  return (
    <p>
      {person.name} {person.number} <button onClick={onClick}>delete</button>
    </p>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const color = message.type === "successful" ? "green" : "red";
  const style = {
    border: `1px solid ${color}`,
    borderRadius: ".5rem",
    color: color,
    marginBottom: ".5rem",
    padding: ".5rem",
  };
  return <div style={style}>{message.content}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();

    const existingPerson = persons.find((person) => newName === person.name);
    if (existingPerson) {
      const confirmMsg = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(confirmMsg)) {
        const changedPerson = {
          ...existingPerson,
          number: newNumber,
        };
        personService
          .update(existingPerson.id, changedPerson)
          .then(() => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : changedPerson
              )
            );
            setMessage({
              type: "successful",
              content: `The number of ${newName} is changed`,
            });
            setTimeout(() => setMessage(null), 2500);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage({
              type: "unsuccessful",
              content: error.response.data.error,
            });
            setTimeout(() => setMessage(null), 2500);
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage({ type: "successful", content: `Added ${newName}` });
          setTimeout(() => setMessage(null), 2500);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage({
            type: "unsuccessful",
            content: error.response.data.error,
          });
          setTimeout(() => setMessage(null), 2500);
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onChangeNewName={handleNameChange}
        onChangeNewNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
