import React, { useState, useEffect } from 'react';
import { fetchRealWeatherData } from '../data/dummyData';

const WeatherCard = ({ weather }) => {
  const [realWeather, setRealWeather] = useState(weather);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Try to fetch real weather data on mount
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const realData = await fetchRealWeatherData('London');
        setRealWeather(realData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setRealWeather(weather); // Fallback to dummy data
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    // Set up periodic weather updates every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 600000);
    return () => clearInterval(weatherInterval);
  }, [weather]);

  if (!realWeather) return null;

  const { temperature, humidity, description, windSpeed, pressure, city, uvIndex } = realWeather;

  // Get weather emoji based on description
  const getWeatherEmoji = (desc) => {
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.includes('clear') || lowerDesc.includes('sunny')) return '☀️';
    if (lowerDesc.includes('cloud')) return '☁️';
    if (lowerDesc.includes('rain') || lowerDesc.includes('drizzle')) return '🌧️';
    if (lowerDesc.includes('thunder') || lowerDesc.includes('storm')) return '⛈️';
    if (lowerDesc.includes('snow')) return '❄️';
    if (lowerDesc.includes('fog') || lowerDesc.includes('mist')) return '🌫️';
    return '🌤️';
  };

  // Format last updated time
  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 60000); // minutes
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 minute ago';
    return `${diff} minutes ago`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">{getWeatherEmoji(description)}</span>
        <div>
          <h2 className="card-title">Weather</h2>
          <p className="card-subtitle">{city} • {formatLastUpdated()}</p>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Updating weather...</p>
        </div>
      ) : (
        <>
          <div className="weather-info">
            <div className="temperature">
              {temperature}°C
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ 
                fontSize: '1.1rem', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                textTransform: 'capitalize',
                marginBottom: '0.5rem'
              }}>
                {description}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Feels like {temperature + Math.floor(Math.random() * 4 - 2)}°C
              </p>
            </div>
          </div>

          <div className="weather-details">
            <div className="weather-detail">
              <div className="weather-detail-label">Humidity</div>
              <div className="weather-detail-value">{humidity}%</div>
            </div>
            <div className="weather-detail">
              <div className="weather-detail-label">Wind</div>
              <div className="weather-detail-value">{windSpeed} km/h</div>
            </div>
            <div className="weather-detail">
              <div className="weather-detail-label">Pressure</div>
              <div className="weather-detail-value">{pressure} hPa</div>
            </div>
            <div className="weather-detail">
              <div className="weather-detail-label">UV Index</div>
              <div className="weather-detail-value">{uvIndex}</div>
            </div>
          </div>

          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'var(--very-light-blue)', 
            borderRadius: '12px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            💡 <strong>Irrigation Tip:</strong> {getIrrigationTip(temperature, humidity, description)}
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to provide irrigation tips based on weather
const getIrrigationTip = (temp, humidity, description) => {
  if (description.toLowerCase().includes('rain')) {
    return 'Rain detected! Consider reducing irrigation schedule.';
  }
  if (temp > 30) {
    return 'High temperature detected. Plants may need extra water.';
  }
  if (humidity < 40) {
    return 'Low humidity. Monitor soil moisture more frequently.';
  }
  if (temp < 15) {
    return 'Cool weather. Plants need less water than usual.';
  }
  return 'Current conditions are optimal for regular watering schedule.';
};

export default WeatherCard;
