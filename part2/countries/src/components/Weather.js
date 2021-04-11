import React, { useState, useEffect } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
  
    useEffect(() => {
      const params = {
        access_key: api_key,
        query: country.capital,
      };
  
      axios
        .get("http://api.weatherstack.com/current", { params })
        .then((response) => {
          const apiResponse = response.data;
          setWeather(apiResponse.current);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [country]);
  
    return (
      <>
        <h2>Weather in {country.capital}</h2>
        <p>
          <strong>temperature:</strong> {weather.temperature} Celsius
        </p>
        {weather.weather_icons ? (
          <img src={weather.weather_icons[0]} alt="current weather" />
        ) : (
          <div></div>
        )}
        <p>
          <strong>wind:</strong>
          {weather.wind_speed} km/h direction {weather.wind_dir}
        </p>
      </>
    );
  };

  export default Weather
  