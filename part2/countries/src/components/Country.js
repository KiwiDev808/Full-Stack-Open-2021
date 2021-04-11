import React from "react";

const Country = ({ country }) => { 
    return (
      <>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img width="150" src={country.flag} alt="country flag" />
      </>
    );
  };
  
  export default Country