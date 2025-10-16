import React, { useState, useEffect } from 'react';

const IrrigationControl = ({ isManualIrrigation, onToggle, lastIrrigation, nextIrrigation }) => {
  const [irrigationDuration, setIrrigationDuration] = useState(0);
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [lastManualIrrigation, setLastManualIrrigation] = useState(null);
  const [waterUsed, setWaterUsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isManualIrrigation) {
      // Start irrigation
      setIsIrrigating(true);
      setIrrigationDuration(0);
      setLastManualIrrigation(new Date());
      
      // Timer for irrigation duration
      interval = setInterval(() => {
        setIrrigationDuration(prev => {
          const newDuration = prev + 1;
          setWaterUsed(Math.floor(newDuration * 2)); // 2L per second simulation
          
          // Auto-stop after 20 minutes (1200 seconds) for safety
          if (newDuration >= 1200) {
            onToggle(false);
            return newDuration;
          }
          
          return newDuration;
        });
      }, 1000);
    } else {
      // Stop irrigation
      setIsIrrigating(false);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isManualIrrigation, onToggle]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    onToggle(!isManualIrrigation);
  };

  const getIrrigationProgress = () => {
    const maxDuration = 1200; // 20 minutes max
    return Math.min((irrigationDuration / maxDuration) * 100, 100);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">🚿</span>
        <div>
          <h2 className="card-title">Manual Control</h2>
          <p className="card-subtitle">Override automatic irrigation</p>
        </div>
      </div>

      <div className="irrigation-controls">
        {/* Main Toggle */}
        <div className="toggle-container">
          <div>
            <div className="toggle-label">Manual Irrigation</div>
            <div style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-secondary)',
              marginTop: '0.25rem'
            }}>
              {isManualIrrigation ? 'System overridden' : 'Automatic mode active'}
            </div>
          </div>
          <div 
            className={`toggle-switch ${isManualIrrigation ? 'active' : ''}`}
            onClick={handleToggle}
          >
            <div className="toggle-knob"></div>
          </div>
        </div>

        {/* Irrigation Status */}
        <div className={`irrigation-status ${isManualIrrigation ? 'status-on' : 'status-off'}`}>
          {isManualIrrigation ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span>💧</span>
                <strong>Irrigation Active</strong>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Duration: {formatDuration(irrigationDuration)}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span>⏸️</span>
                <strong>System Standby</strong>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Automatic scheduling enabled
              </div>
            </>
          )}
        </div>

        {/* Progress Bar (when irrigating) */}
        {isManualIrrigation && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <span>Progress</span>
              <span>{waterUsed}L used</span>
            </div>
            <div className="moisture-bar">
              <div 
                className="moisture-fill"
                style={{
                  width: `${getIrrigationProgress()}%`,
                  background: 'linear-gradient(90deg, var(--secondary-blue), var(--light-blue))'
                }}
              />
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: '0.5rem'
            }}>
              Auto-stop at 20:00 minutes
            </div>
          </div>
        )}

        {/* Last Manual Irrigation Info */}
        {lastManualIrrigation && !isManualIrrigation && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            background: 'var(--very-light-blue)', 
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
              Last Manual Irrigation
            </div>
            <div>
              {lastManualIrrigation.toLocaleString()} • {formatDuration(irrigationDuration)} • {waterUsed}L
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <button 
              onClick={() => !isManualIrrigation && onToggle(true)}
              disabled={isManualIrrigation}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: isManualIrrigation ? 'var(--border-color)' : 'var(--secondary-blue)',
                color: isManualIrrigation ? 'var(--text-secondary)' : 'white',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: isManualIrrigation ? 'not-allowed' : 'pointer',
                opacity: isManualIrrigation ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              Quick Start
            </button>
            <button 
              onClick={() => isManualIrrigation && onToggle(false)}
              disabled={!isManualIrrigation}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: !isManualIrrigation ? 'var(--border-color)' : 'var(--danger-red)',
                color: !isManualIrrigation ? 'var(--text-secondary)' : 'white',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: !isManualIrrigation ? 'not-allowed' : 'pointer',
                opacity: !isManualIrrigation ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              Stop Now
            </button>
          </div>
        </div>

        {/* Safety Information */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: '#fef3c7', 
          borderRadius: '12px',
          fontSize: '0.8rem',
          color: '#92400e',
          border: '1px solid #fcd34d'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
            <span>⚠️</span>
            Safety Features Active
          </div>
          <ul style={{ 
            marginTop: '0.5rem', 
            marginLeft: '1.25rem',
            lineHeight: '1.4'
          }}>
            <li>Auto-stop at 20 minutes maximum</li>
            <li>Moisture sensors monitor overflow</li>
            <li>Manual override available anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IrrigationControl;
