import React, { useState } from 'react';
import axios from 'axios';


const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '09c7f2a71bded1b49cae1aa3614f132d'; // Updated OpenWeatherMap API key

  const capitals = [
    'Kabul', 'Tirana', 'Algiers', 'Andorra la Vella', 'Luanda', 'Buenos Aires', 'Yerevan', 'Canberra', 'Vienna',
    'Baku', 'Nassau', 'Manama', 'Dhaka', 'Bridgetown', 'Minsk', 'Brussels', 'Belmopan', 'Porto-Novo', 'Thimphu',
    'La Paz', 'Sarajevo', 'Gaborone', 'Brasilia', 'Sofia', 'Ouagadougou', 'Gitega', 'Phnom Penh', 'Yaounde',
    'Ottawa', 'Praia', 'Bangui',
    'San Jose', 'Zagreb', 'Havana', 'Nicosia', 'Prague', 'Copenhagen', 'Djibouti', 'Roseau', 'Santo Domingo',
    'Quito', 'Cairo', 'San Salvador', 'Malabo', 'Asmara', 'Tallinn', 'Eswatini', 'Addis Ababa', 'Suva', 'Helsinki',
    'Paris', 'Libreville', 'Banjul', 'Tbilisi', 'Berlin', 'Accra', 'Athens', 'Saint George',
     'Bissau', 'Georgetown', 'Port-au-Prince', 'Tegucigalpa', 'Budapest', 'Reykjavik', 'New Delhi',
    'Jakarta', 'Tehran', 'Baghdad', 'Dublin', 'Jerusalem', 'Rome', 'Kingston', 'Tokyo', 'Amman', 'Astana',
    'Nairobi', 'Tarawa', 'Pyongyang', 'Seoul', 'Pristina', 'Kuwait City', 'Bishkek', 'Vientiane', 'Riga', 'Beirut',
    'Maseru', 'Monrovia', 'Tripoli', 'Vaduz', 'Vilnius', 'Luxembourg', 'Antananarivo', 'Lilongwe', 'Kuala Lumpur',
    'Male', 'Bamako', 'Valletta', 'Majuro', 'Nouakchott', 'Port Louis', 'Mexico City', 'Palikir', 'Chisinau',
    'Monaco', 'Ulaanbaatar', 'Podgorica', 'Rabat', 'Maputo', 'Naypyidaw', 'Windhoek', 'Yaren', 'Kathmandu',
    'Amsterdam', 'Wellington', 'Managua', 'Niamey', 'Abuja', 'Oslo', 'Muscat', 'Islamabad', 'Ngerulmud', 'Panama City',
    'Port Moresby', 'Asuncion', 'Lima', 'Manila', 'Warsaw', 'Lisbon', 'Doha', 'Bucharest', 'Moscow', 'Kigali',
    'Basseterre', 'Castries', 'Kingstown', 'Apia', 'San Marino', 'Riyadh', 'Dakar', 'Belgrade', 'Victoria', 'Freetown',
    'Singapore', 'Bratislava', 'Ljubljana', 'Honiara', 'Mogadishu', 'Pretoria', 'Seoul', 'Juba', 'Madrid', 'Colombo',
    'Khartoum', 'Paramaribo', 'Stockholm', 'Bern', 'Damascus', 'Taipei', 'Dushanbe', 'Dodoma', 'Bangkok', 'Dili',
    'Lome', 'Nukuʻalofa', 'Port of Spain', 'Tunis', 'Ankara', 'Ashgabat', 'Funafuti', 'Kampala', 'Kyiv', 'Abu Dhabi',
    'London', 'Washington, D.C.', 'Montevideo', 'Tashkent', 'Port Vila', 'Vatican City', 'Caracas', 'Hanoi',
    'Sanaa', 'Lusaka', 'Harare'
  ];
 
  const fetchWeather = async () => {
    if (!city) {
      setError('Please select a city.');
      return;
    }
  
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const filteredForecast = response.data.list.filter((item, index, self) => {
        // Extract unique days by comparing dates
        const currentDate = new Date(item.dt_txt).toDateString();
        return self.findIndex(f => new Date(f.dt_txt).toDateString() === currentDate) === index;
      });
      setForecast({ ...response.data, list: filteredForecast });
      setError(null);
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setForecast(null);
    }
  };
 

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()] || 'Unknown';
  };
  

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>7-Day Weather Forecast</h1>
      <div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '200px' }}
        >
          <option value="">Select a capital city</option>
          {capitals.map((capital, index) => (
            <option key={index} value={capital}>
              {capital}
            </option>
          ))}
        </select>
        <button onClick={fetchWeather} style={{ padding: '10px 15px', marginLeft: '10px' }}>
          Get Weather
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {forecast && (
        <div style={{ marginTop: '20px' }}>
          <h2>Weather in {forecast.city.name}</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {forecast.list.slice(0, 7).map((day, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{getDayOfWeek(day.dt_txt)}:</strong> {day.weather[0].description}, {day.main.temp}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
