import { useState, useEffect } from 'react'
import MoistureSensor from './MoistureSensor'
import TemperatureSensor from './TemperatureSensor'
import ManualControl from './ManualControl'

const Dashboard = () => {
  const [moistureLevel, setMoistureLevel] = useState(0)
  const [temperature, setTemperature] = useState(0)
  
  // Simulate sensor data updates
  useEffect(() => {
    const updateSensorData = () => {
      // Simulate moisture reading (0-100%)
      setMoistureLevel(Math.floor(Math.random() * (100 - 20) + 20))
      // Simulate temperature reading (20-35°C)
      setTemperature((Math.random() * (35 - 20) + 20).toFixed(1))
    }

    // Update every 5 seconds
    const interval = setInterval(updateSensorData, 5000)
    updateSensorData() // Initial update

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard">
      <MoistureSensor value={moistureLevel} />
      <TemperatureSensor value={temperature} />
      <ManualControl />
    </div>
  )
}

export default Dashboard