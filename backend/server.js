const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simulated sensor data
let sensorData = {
  moisture: 65,
  lastUpdated: new Date()
};

// Update sensor data periodically (simulate sensor readings)
setInterval(() => {
  sensorData.moisture = Math.floor(Math.random() * 30) + 50; // 50-80%
  sensorData.lastUpdated = new Date();
}, 5000);

// Weather endpoint - proxies OpenWeather API
app.get('/api/weather', async (req, res) => {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const city = 'Bangalore';
    
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      // Return mock data if no API key
      return res.json({
        main: {
          temp: 28,
          feels_like: 30,
          humidity: 65
        },
        weather: [{
          description: 'partly cloudy'
        }]
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Weather API error:', error.message);
    // Return mock data on error
    res.json({
      main: {
        temp: 28,
        feels_like: 30,
        humidity: 65
      },
      weather: [{
        description: 'partly cloudy'
      }]
    });
  }
});

// Moisture sensor endpoint
app.get('/api/moisture', (req, res) => {
  res.json({
    moisture: sensorData.moisture,
    lastUpdated: sensorData.lastUpdated,
    status: 'active'
  });
});

// Irrigation control endpoint
app.post('/api/irrigation/control', (req, res) => {
  const { action, duration } = req.body;
  
  // Simulate irrigation control
  console.log(`Irrigation ${action} for ${duration || 0} minutes`);
  
  res.json({
    success: true,
    action,
    duration,
    timestamp: new Date()
  });
});

// Irrigation schedule endpoint
app.get('/api/irrigation/schedule', (req, res) => {
  // Mock schedule data
  const schedule = [
    { day: 'Monday', time: '06:00', duration: 15 },
    { day: 'Monday', time: '18:00', duration: 15 },
    { day: 'Wednesday', time: '06:00', duration: 15 },
    { day: 'Wednesday', time: '18:00', duration: 15 },
    { day: 'Friday', time: '06:00', duration: 15 },
    { day: 'Friday', time: '18:00', duration: 15 }
  ];
  
  res.json(schedule);
});

app.listen(PORT, () => {
  console.log(`AutoAqua backend running on http://localhost:${PORT}`);
});
