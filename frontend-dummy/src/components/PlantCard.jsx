import React from 'react';

const PlantCard = ({ plantData }) => {
  if (!plantData) return null;

  const { moistureLevel, name, type, status, health, ph, lightLevel } = plantData;

  // Determine moisture bar color based on level
  const getMoistureColor = (level) => {
    if (level < 30) return '#ef4444'; // Red
    if (level < 60) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'low': return 'status-low';
      case 'medium': return 'status-medium';
      case 'good': return 'status-good';
      default: return 'status-medium';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">🌱</span>
        <div>
          <h2 className="card-title">{name}</h2>
          <p className="card-subtitle">{type}</p>
        </div>
      </div>

      <div className="moisture-level">
        <div className="moisture-value">
          {moistureLevel}%
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Soil Moisture Level
        </p>
        
        <div className="moisture-bar">
          <div 
            className="moisture-fill"
            style={{
              width: `${moistureLevel}%`,
              background: `linear-gradient(90deg, ${getMoistureColor(moistureLevel)}, ${getMoistureColor(moistureLevel)}99)`
            }}
          />
        </div>
        
        <div className={`moisture-status ${getStatusClass(status)}`}>
          Plant Status: {health}
        </div>
      </div>

      <div className="plant-details">
        <div className="weather-details">
          <div className="weather-detail">
            <div className="weather-detail-label">Light Level</div>
            <div className="weather-detail-value">{lightLevel}%</div>
          </div>
          <div className="weather-detail">
            <div className="weather-detail-label">Soil pH</div>
            <div className="weather-detail-value">{ph}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
