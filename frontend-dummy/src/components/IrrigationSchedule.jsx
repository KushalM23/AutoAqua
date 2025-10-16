import React from 'react';

const IrrigationSchedule = ({ lastIrrigation, nextIrrigation }) => {
  // Format date and time
  const formatDateTime = (isoString) => {
    if (!isoString) return 'Not scheduled';
    
    const date = new Date(isoString);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);
    
    // If within 24 hours, show relative time
    if (diffInHours < 24) {
      const diffInMinutes = Math.floor(Math.abs(now - date) / (1000 * 60));
      if (diffInMinutes < 60) {
        if (diffInMinutes < 1) return 'Just now';
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ${date < now ? 'ago' : 'from now'}`;
      }
      const diffInHoursRounded = Math.floor(diffInHours);
      return `${diffInHoursRounded} hour${diffInHoursRounded === 1 ? '' : 's'} ${date < now ? 'ago' : 'from now'}`;
    }
    
    // Otherwise show date and time
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get time until next irrigation
  const getTimeUntilNext = () => {
    if (!nextIrrigation) return null;
    
    const next = new Date(nextIrrigation);
    const now = new Date();
    const diffMs = next - now;
    
    if (diffMs <= 0) return 'Irrigation due now!';
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    }
    return `in ${minutes}m`;
  };

  // Get irrigation status color
  const getIrrigationStatus = () => {
    if (!nextIrrigation) return { status: 'Not scheduled', color: '#6b7280' };
    
    const next = new Date(nextIrrigation);
    const now = new Date();
    const diffHours = (next - now) / (1000 * 60 * 60);
    
    if (diffHours <= 0) return { status: 'Overdue', color: '#ef4444' };
    if (diffHours <= 1) return { status: 'Due soon', color: '#f59e0b' };
    if (diffHours <= 6) return { status: 'Scheduled', color: '#3b82f6' };
    return { status: 'Upcoming', color: '#10b981' };
  };

  const status = getIrrigationStatus();

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">💧</span>
        <div>
          <h2 className="card-title">Irrigation Schedule</h2>
          <p className="card-subtitle">Watering timeline & history</p>
        </div>
      </div>

      <div className="schedule-container">
        {/* Last Irrigation */}
        <div className="schedule-item">
          <div className="schedule-info">
            <div className="schedule-label">
              <span style={{ marginRight: '0.5rem' }}>🕒</span>
              Last Watered
            </div>
            <div className="schedule-time">
              {formatDateTime(lastIrrigation)}
            </div>
          </div>
        </div>

        {/* Next Irrigation */}
        <div className="schedule-item">
          <div className="schedule-info" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="schedule-label">
                  <span style={{ marginRight: '0.5rem' }}>⏰</span>
                  Next Irrigation
                </div>
                <div className="schedule-time">
                  {formatDateTime(nextIrrigation)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div 
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    backgroundColor: `${status.color}20`,
                    color: status.color
                  }}
                >
                  {status.status}
                </div>
                {nextIrrigation && (
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)',
                    marginTop: '0.25rem'
                  }}>
                    {getTimeUntilNext()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Schedule Preview */}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: 'var(--text-primary)', 
            marginBottom: '1rem' 
          }}>
            📅 This Week's Schedule
          </h3>
          <div className="weekly-schedule">
            {getWeeklySchedule().map((day, index) => (
              <div key={index} className="daily-schedule">
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-secondary)', 
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {day.dayName}
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: day.hasIrrigation ? 'var(--secondary-blue)' : 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  {day.hasIrrigation ? '8:00 AM, 6:00 PM' : 'Rest day'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        background: 'var(--very-light-blue)', 
        borderRadius: '12px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🔔</span>
          <strong>Auto-scheduling active</strong>
        </div>
        <div style={{ marginTop: '0.25rem' }}>
          Based on soil moisture, weather conditions, and plant needs
        </div>
      </div>
    </div>
  );
};

// Helper function to generate weekly schedule
const getWeeklySchedule = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  return days.map((day, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - today.getDay());
    
    // Simulate irrigation schedule (every other day)
    const hasIrrigation = index % 2 === 0;
    
    return {
      dayName: day,
      date,
      hasIrrigation
    };
  });
};

/* Additional CSS for schedule components */
const scheduleStyles = `
.schedule-container {
  margin-top: 1rem;
}

.schedule-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weekly-schedule {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.daily-schedule {
  text-align: center;
  padding: 0.75rem 0.25rem;
  background: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

@media (max-width: 480px) {
  .weekly-schedule {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .daily-schedule:nth-child(n+5) {
    margin-top: 0.5rem;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('schedule-styles')) {
  const style = document.createElement('style');
  style.id = 'schedule-styles';
  style.textContent = scheduleStyles;
  document.head.appendChild(style);
}

export default IrrigationSchedule;
