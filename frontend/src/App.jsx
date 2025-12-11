import { useState, useEffect } from 'react'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import MoistureCard from './components/MoistureCard'
import IrrigationSchedule from './components/IrrigationSchedule'
import ManualControl from './components/ManualControl'
import './App.css'

export default function App(){
  const [irrigationActive, setIrrigationActive] = useState(false)

  return(
    <div className="app">
      <Header />
      <main className="bento-grid">
        <div className="bento-item bento-weather">
          <WeatherCard />
        </div>
        <div className="bento-item bento-moisture">
          <MoistureCard />
        </div>
        <div className="bento-item bento-schedule">
          <IrrigationSchedule />
        </div>
        <div className="bento-item bento-control">
          <ManualControl 
            irrigationActive={irrigationActive}
            setIrrigationActive={setIrrigationActive}
          />
        </div>
      </main>
    </div>
  )
}
