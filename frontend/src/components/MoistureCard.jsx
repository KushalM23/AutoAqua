import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MoistureCard() {
  const [moisture, setMoisture] = useState(65)
  const [lastUpdated, setLastUpdated] = useState('Just now')

  useEffect(() => {
    const fetchMoisture = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/moisture')
        setMoisture(response.data.moisture)
        setLastUpdated('Just now')
      } catch (err) {
        console.error('Failed to fetch moisture data:', err)
      }
    }

    fetchMoisture()
    const interval = setInterval(fetchMoisture, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const getMoistureStatus = (level) => {
    if (level < 40) return { status: 'Low', color: '#e74c3c' }
    if (level < 60) return { status: 'Moderate', color: '#f39c12' }
    return { status: 'Optimal', color: '#27ae60' }
  }

  const status = getMoistureStatus(moisture)

  return (
    <div className="card moisture-card">
      <h3>Soil Moisture</h3>
      <div className="card-content">
        <div className="main-value">
          <span className="value">{moisture}</span>
          <span className="unit">%</span>
        </div>
        <div className="moisture-status" style={{ color: status.color }}>
          <span className="status-text">{status.status}</span>
        </div>
        <div className="moisture-bar">
          <div 
            className="moisture-fill" 
            style={{ 
              width: `${moisture}%`,
              backgroundColor: status.color
            }}
          ></div>
        </div>
        <div className="details">
          <div className="detail-item">
            <span className="label">Sensor Status:</span>
            <span className="value">Active</span>
          </div>
          <div className="detail-item">
            <span className="label">Last Updated:</span>
            <span className="value">{lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
