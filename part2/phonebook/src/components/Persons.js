import React from 'react';

const Persons = ({ contactList, onClick }) => {
  return (
    <>
      {contactList.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onClick(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
