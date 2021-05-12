import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneBookService from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    phoneBookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => {
        alert('The server is offline');
      });
  }, []);

  const nameIsAdded = () => {
    if (persons.some((person) => person.name === newName)) {
      return true;
    }
    return false;
  };

  const successMessage = (msg) => {
    setMessageType('success');
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const errorMessage = (msg) => {
    setMessageType('error');
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const resetForms = () => {
    setNewName('');
    setNewNumber('');
  };

  const addNumber = (e) => {
    e.preventDefault();

    if (nameIsAdded()) {
      if (
        window.confirm(
          `${newName} is already on the phone book, replace the old number with a new one?`
        )
      ) {
        const { id } = persons.find((p) => p.name === newName);
        const changedPerson = { name: newName, number: newNumber, id };

        phoneBookService
          .updatePerson(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === id ? returnedPerson : person
              )
            );
            successMessage(`Changed ${newName}`);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              errorMessage(
                `Information of ${newName} has already been removed from the server`
              );
              setPersons(
                persons.filter((person) => {
                  return person.id !== id;
                })
              );
            } else {
              errorMessage(error.response.data.message);
            }
          });
        resetForms();
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };

      phoneBookService
        .create(newContact)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact));
          successMessage(`Added ${newName}`);
          resetForms();
        })
        .catch((error) => {
          errorMessage(error.response.data.message);
        });
      return;
    }
  };

  const deleteNumber = (id, name) => {
    if (window.confirm(`Delete ${name} ?`))
      phoneBookService.deletePerson(id).then((response) => {
        const newPhoneBook = persons.filter((person) => person.id !== id);
        setPersons(newPhoneBook);
      });
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
      <h2>Phone book</h2>
      <Notification type={messageType} message={message} />
      <Filter search={search} onChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addNumber}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newNumber}
        onChangeNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons contactList={contactList} onClick={deleteNumber} />
    </div>
  );
};

export default App;
