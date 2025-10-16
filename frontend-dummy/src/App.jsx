import { useState, useEffect } from 'react';
import './App.css';
import MoistureMonitor from './components/MoistureMonitor';
import WeatherInfo from './components/WeatherInfo';
import IrrigationControl from './components/IrrigationControl';
import { generateDummyData } from './data/dummyData';

function App() {
  const [plantData, setPlantData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isManualIrrigation, setIsManualIrrigation] = useState(false);
  const [lastIrrigation, setLastIrrigation] = useState(null);
  const [nextIrrigation, setNextIrrigation] = useState(null);

  useEffect(() => {
    // Generate dummy data
    const dummyData = generateDummyData();
    setPlantData(dummyData.plant);
    setWeather(dummyData.weather);
    setLastIrrigation(dummyData.lastIrrigation);
    setNextIrrigation(dummyData.nextIrrigation);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const updatedData = generateDummyData();
      setPlantData(updatedData.plant);
      setWeather(updatedData.weather);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleManualIrrigation = (enabled) => {
    setIsManualIrrigation(enabled);
    if (enabled) {
      setLastIrrigation(new Date().toISOString());
      // Update plant moisture after irrigation
      setPlantData(prev => ({
        ...prev,
        moistureLevel: Math.min(95, prev.moistureLevel + 20)
      }));
    }
  };

  if (!plantData || !weather) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading AutoAqua Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-icon">💧</span>
          <h1>AutoAqua</h1>
          <span className="nav-subtitle">Smart Irrigation System</span>
        </div>
        <div className="nav-info">
          <span className="field-info">{plantData?.name}</span>
          <span className="location-info">📍 {weather?.city}</span>
        </div>
      </nav>

      <main className="main-container">
        <div className="primary-section">
          <MoistureMonitor plantData={plantData} />
          <IrrigationControl 
            isManualIrrigation={isManualIrrigation}
            onToggle={handleManualIrrigation}
            lastIrrigation={lastIrrigation}
            nextIrrigation={nextIrrigation}
          />
        </div>
        
        <div className="secondary-section">
          <WeatherInfo weather={weather} />
          
          <div className="schedule-info">
            <h3>Irrigation Schedule</h3>
            <div className="schedule-line">
              <span className="schedule-label">Last watered:</span>
              <span className="schedule-value">{formatDateTime(lastIrrigation)}</span>
            </div>
            <div className="schedule-line">
              <span className="schedule-label">Next irrigation:</span>
              <span className="schedule-value">{formatDateTime(nextIrrigation)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  function formatDateTime(isoString) {
    if (!isoString) return 'Not scheduled';
    const date = new Date(isoString);
    
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

export default App;