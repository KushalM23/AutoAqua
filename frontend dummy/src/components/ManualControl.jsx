import { useState } from 'react'

const ManualControl = () => {
  const [isActive, setIsActive] = useState(false)
  const [lastActivated, setLastActivated] = useState(null)

  const handleToggle = () => {
    setIsActive(!isActive)
    setLastActivated(new Date().toLocaleTimeString())
  }

  return (
    <div className="card">
      <h2>Manual Control</h2>
      <button 
        className={`control-button ${isActive ? 'active' : ''}`}
        onClick={handleToggle}
      >
        {isActive ? 'Turn Off' : 'Turn On'} Irrigation
      </button>
      <div className="status">
        Status: {isActive ? 'System Running' : 'System Idle'}
        {lastActivated && <div>Last activated: {lastActivated}</div>}
      </div>
    </div>
  )
}

export default ManualControl