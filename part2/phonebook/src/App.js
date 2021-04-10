import React, { useState } from "react";
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const nameIsAdded = () => {
    if (persons.some((person) => person.name === newName)) {
      return true;
    }
    return false;
  };

  const addNumber = (e) => {
    e.preventDefault();
    if (nameIsAdded()) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newContact));
    setNewName("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const contactList = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchChange}/>

      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addNumber}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newNumber}
        onChangeNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons contactList={contactList}/>
    </div>
  );
};

export default App;
