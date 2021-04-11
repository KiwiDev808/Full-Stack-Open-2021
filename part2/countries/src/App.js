import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Weather from "./components/Weather";
import ListItem from "./components/ListItem";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const showCountry = () => {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );

    const length = filteredCountries.length;

    if (length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (length > 1) {
      return filteredCountries.map((country) => (
        <ListItem key={country.name} country={country} setSearch={setSearch} />
      ));
    } else if (length === 1) {
      return (
        <>
          <Country country={filteredCountries[0]} />
          <Weather country={filteredCountries[0]} />
        </>
      );
    }
  };

  return (
    <div className="App">
      <div>
        find countries
        <input value={search} onChange={handleChangeSearch} />
      </div>
      {showCountry()}
    </div>
  );
}
export default App;
