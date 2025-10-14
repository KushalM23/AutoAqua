const TemperatureSensor = ({ value }) => {
  const getStatusColor = () => {
    if (value < 15) return '#3498db' // Too cold
    if (value > 30) return '#e94560' // Too hot
    return '#4ecca3' // Optimal
  }

  return (
    <div className="card">
      <h2>Temperature</h2>
      <div className="reading" style={{ color: getStatusColor() }}>
        {value}°C
      </div>
      <div className="status">
        {value < 15 && 'Low Temperature'}
        {value >= 15 && value <= 30 && 'Optimal Temperature'}
        {value > 30 && 'High Temperature - Consider Cooling'}
      </div>
    </div>
  )
}

export default TemperatureSensor