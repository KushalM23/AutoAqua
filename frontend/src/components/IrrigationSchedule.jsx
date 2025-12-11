import { useState, useEffect } from 'react'

export default function IrrigationSchedule() {
  const [currentWeek, setCurrentWeek] = useState([])

  useEffect(() => {
    generateCurrentWeek()
  }, [])

  const generateCurrentWeek = () => {
    const today = new Date()
    const currentDay = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - currentDay)

    const week = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      
      // Sample irrigation schedule (Mon, Wed, Fri at 6 AM and 6 PM)
      const schedules = []
      if ([1, 3, 5].includes(date.getDay())) {
        schedules.push({ time: '06:00 AM', duration: '30 min' })
        schedules.push({ time: '06:00 PM', duration: '30 min' })
      }

      week.push({
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        schedules: schedules
      })
    }
    setCurrentWeek(week)
  }

  return (
    <div className="irrigation-schedule">
      <h2>Irrigation Schedule</h2>
      <div className="schedule-calendar">
        {currentWeek.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day.isToday ? 'today' : ''} ${day.schedules.length > 0 ? 'has-schedule' : ''}`}
          >
            <div className="day-header">
              <div className="day-name">{day.day}</div>
              <div className="day-date">{day.dateNum}</div>
            </div>
            <div className="day-schedules">
              {day.schedules.length > 0 ? (
                day.schedules.map((schedule, idx) => (
                <div key={idx} className="schedule-item">
                    <div className="schedule-time">{schedule.time}</div>
                    <div className="schedule-duration">{schedule.duration}</div>
                  </div>
                ))
              ) : (
                <div className="no-schedule">No irrigation</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="schedule-legend">
        <div className="legend-item">
          <span className="legend-dot scheduled"></span>
          <span>Scheduled</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot today"></span>
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
