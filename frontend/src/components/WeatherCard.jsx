import { useState, useEffect } from 'react'
import axios from 'axios'

export default function WeatherCard() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/weather')
        setWeather(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeather()
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="card weather-card loading">Loading weather...</div>
  if (error) return <div className="card weather-card error">{error}</div>

  return (
    <div className="card weather-card">
      <h3>Temperature</h3>
      <div className="card-content">
        <div className="main-value">
          <span className="value">{Math.round(weather.main.temp)}</span>
          <span className="unit">°C</span>
        </div>
        <div className="details">
          <div className="detail-item">
            <span className="label">Feels like:</span>
            <span className="value">{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Humidity:</span>
            <span className="value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Conditions:</span>
            <span className="value">{weather.weather[0].description}</span>
          </div>
        </div>
        <div className="location">Bangalore, India</div>
      </div>
    </div>
  )
}
