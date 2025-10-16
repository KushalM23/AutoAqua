import React, { useState, useEffect } from 'react';
import { fetchRealWeatherData } from '../data/dummyData';

const WeatherInfo = ({ weather }) => {
  const [realWeather, setRealWeather] = useState(weather);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Try to fetch real weather data for Dehradun
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const realData = await fetchRealWeatherData('Dehradun');
        setRealWeather({
          ...realData,
          monsoonCondition: weather?.monsoonCondition || 'Active monsoon'
        });
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setRealWeather(weather);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    // Update every 15 minutes
    const weatherInterval = setInterval(fetchWeather, 900000);
    return () => clearInterval(weatherInterval);
  }, [weather]);

  if (!realWeather) return null;

  const { temperature, humidity, description, city, monsoonCondition } = realWeather;

  // Get weather emoji
  const getWeatherEmoji = (desc) => {
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.includes('rain') || lowerDesc.includes('drizzle')) return '🌧️';
    if (lowerDesc.includes('thunder') || lowerDesc.includes('storm')) return '⛈️';
    if (lowerDesc.includes('cloud')) return '☁️';
    if (lowerDesc.includes('clear') || lowerDesc.includes('sunny')) return '☀️';
    return '🌤️';
  };

  // Format last updated
  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 60000);
    if (diff < 1) return 'Just now';
    return `${diff}m ago`;
  };

  // Check if it's raining
  const isRaining = description.toLowerCase().includes('rain') || 
                   description.toLowerCase().includes('drizzle') || 
                   description.toLowerCase().includes('shower');

  return (
    <div className="weather-info">
      <h3>Weather</h3>
      
      {isLoading ? (
        <div className="weather-loading">
          <div className="loading-dot"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="weather-grid">
          <div className="weather-item">
            <span className="weather-label">Temperature</span>
            <span className="weather-value">{temperature}°C</span>
          </div>
          
          <div className="weather-item">
            <span className="weather-label">Humidity</span>
            <span className="weather-value">{humidity}%</span>
          </div>
          
          <div className="weather-item">
            <span className="weather-label">Rain Status</span>
            <span className={`weather-value ${isRaining ? 'rain-active' : 'rain-inactive'}`}>
              {isRaining ? '🌧️ Raining' : '☀️ No Rain'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for paddy-specific weather advice
const getWeatherAdvice = (temp, humidity, description) => {
  if (description.toLowerCase().includes('rain')) {
    return 'Rain detected! Reduce irrigation frequency.';
  }
  if (temp > 30) {
    return 'High temperature. Increase water levels for paddy cooling.';
  }
  if (humidity > 85) {
    return 'High humidity. Monitor for fungal diseases.';
  }
  if (temp < 20) {
    return 'Cool weather. Reduce irrigation needs.';
  }
  return 'Weather conditions are optimal for paddy growth.';
};

export default WeatherInfo;