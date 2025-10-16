import React from 'react';

const MoistureMonitor = ({ plantData }) => {
  if (!plantData) return null;

  const { moistureLevel, status, health } = plantData;

  // Calculate circle parameters for the chart
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (moistureLevel / 100) * circumference;

  // Get color based on moisture level
  const getMoistureColor = (level) => {
    if (level < 30) return '#ef4444'; // Red
    if (level < 60) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'low': return '🚨';
      case 'medium': return '⚠️';
      case 'good': return '✅';
      default: return '📊';
    }
  };

  return (
    <div className="moisture-monitor">
      <h2>Soil Moisture</h2>
      
      <div className="moisture-display">
        <div className="moisture-chart">
          <svg width="220" height="220" viewBox="0 0 220 220">
            {/* Background circle */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="16"
            />
            
            {/* Progress circle */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={getMoistureColor(moistureLevel)}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 110 110)"
              className="progress-circle"
            />
          </svg>
          
          <div className="chart-center">
            <div className="moisture-percentage">
              {moistureLevel}%
            </div>
          </div>
        </div>
        
        <div className="moisture-status">
          <span className={`status-indicator status-${status}`}>
            {getStatusIcon(status)} {health}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoistureMonitor;