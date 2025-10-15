const MoistureSensor = ({ value }) => {
  const getStatusColor = () => {
    if (value < 30) return '#e94560' // Too dry
    if (value > 80) return '#3498db' // Too wet
    return '#4ecca3' // Optimal
  }

  return (
    <div className="card">
      <h2>Soil Moisture</h2>
      <div className="reading" style={{ color: getStatusColor() }}>
        {value}%
      </div>
      <div className="status">
        {value < 30 && 'Low Moisture - Watering Recommended'}
        {value >= 30 && value <= 80 && 'Optimal Moisture Level'}
        {value > 80 && 'High Moisture - Reduce Watering'}
      </div>
    </div>
  )
}

export default MoistureSensor