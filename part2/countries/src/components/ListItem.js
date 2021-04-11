import React from "react";

const ListItem = ({ country, setSearch }) => {
  return (
    <div key={country.name}>
      {country.name}{" "}
      <button onClick={() => setSearch(country.name)}>show</button>
    </div>
  );
};

export default ListItem;
