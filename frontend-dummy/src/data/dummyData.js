// OpenWeather API configuration
const OPENWEATHER_API_KEY = 'demo_key'; // Replace with actual API key
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const DEFAULT_CITY = 'Dehradun';

// Dummy plant data generator
export const generateDummyData = () => {
  const now = new Date();
  
  // Generate moisture level (20-95%)
  const moistureLevel = Math.floor(Math.random() * 75) + 20;
  
  // Generate dummy weather data (fallback if API fails) - Dehradun climate
  const dummyWeather = {
    temperature: Math.floor(Math.random() * 12) + 20, // 20-32°C (typical for Dehradun)
    humidity: Math.floor(Math.random() * 30) + 60, // 60-90% (monsoon region)
    description: getWeatherDescription(),
    windSpeed: Math.floor(Math.random() * 10) + 3, // 3-13 km/h
    pressure: Math.floor(Math.random() * 30) + 1010, // 1010-1040 hPa
    uvIndex: Math.floor(Math.random() * 8) + 2, // 2-10
    city: 'Dehradun',
    icon: getWeatherIcon(),
    monsoonCondition: getMonsoonCondition()
  };
  
  // Calculate irrigation times
  const lastIrrigation = new Date(now.getTime() - (Math.random() * 24 * 60 * 60 * 1000)); // Within last 24 hours
  const nextIrrigation = new Date(now.getTime() + (Math.random() * 24 * 60 * 60 * 1000)); // Within next 24 hours
  
  // Plant data
  const plant = {
    name: 'Paddy Field A1',
    type: 'Oryza sativa (Rice)',
    moistureLevel,
    soilType: 'Clay-loam paddy soil',
    lastWatered: lastIrrigation.toISOString(),
    status: getMoistureStatus(moistureLevel),
    health: getPlantHealth(moistureLevel),
    fieldSize: '2.5 hectares',
    growthStage: getPaddyGrowthStage()
  };
  
  return {
    plant,
    weather: dummyWeather,
    lastIrrigation: lastIrrigation.toISOString(),
    nextIrrigation: nextIrrigation.toISOString(),
    timestamp: now.toISOString()
  };
};

// Fetch real weather data from OpenWeather API
export const fetchRealWeatherData = async (city = DEFAULT_CITY) => {
  try {
    // If no API key provided, return dummy data
    if (OPENWEATHER_API_KEY === 'demo_key') {
      console.log('Using dummy weather data. Set OPENWEATHER_API_KEY for real data.');
      return generateDummyData().weather;
    }
    
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      uvIndex: Math.floor(Math.random() * 11), // UV data requires different API call
      city: data.name,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    // Return dummy data as fallback
    return generateDummyData().weather;
  }
};

// Helper functions
const getMoistureStatus = (level) => {
  if (level < 30) return 'low';
  if (level < 60) return 'medium';
  return 'good';
};

const getPlantHealth = (moisture) => {
  if (moisture < 20) return 'Critical';
  if (moisture < 40) return 'Needs Water';
  if (moisture < 70) return 'Good';
  return 'Excellent';
};

const getWeatherDescription = () => {
  const descriptions = [
    'clear sky',
    'few clouds',
    'scattered clouds',
    'broken clouds',
    'light rain',
    'moderate rain',
    'partly cloudy',
    'sunny',
    'overcast'
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getWeatherIcon = () => {
  const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'];
  return icons[Math.floor(Math.random() * icons.length)];
};

const getPaddyGrowthStage = () => {
  const stages = ['Seedling', 'Tillering', 'Heading', 'Flowering', 'Maturity'];
  return stages[Math.floor(Math.random() * stages.length)];
};

const getMonsoonCondition = () => {
  const conditions = [
    'Pre-monsoon',
    'Active monsoon',
    'Monsoon break',
    'Post-monsoon',
    'Winter dry spell',
    'Light drizzle expected',
    'Heavy rainfall warning'
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

// Simulate sensor data updates
export const createMoistureDataStream = (callback) => {
  const interval = setInterval(() => {
    const data = generateDummyData();
    callback(data);
  }, 5000); // Update every 5 seconds
  
  return () => clearInterval(interval);
};

// Irrigation schedule data
export const getIrrigationSchedule = () => {
  const now = new Date();
  const schedule = [];
  
  // Generate next 7 days of irrigation schedule
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now.getTime() + (i * 24 * 60 * 60 * 1000));
    const times = ['08:00', '18:00']; // Morning and evening
    
    times.forEach(time => {
      schedule.push({
        date: date.toDateString(),
        time,
        duration: Math.floor(Math.random() * 15) + 5, // 5-20 minutes
        type: 'automatic'
      });
    });
  }
  
  return schedule;
};

// Export configuration for easy updates
export const config = {
  OPENWEATHER_API_KEY,
  updateInterval: 30000, // 30 seconds
  moistureThresholds: {
    low: 30,
    medium: 60
  },
  irrigationDuration: {
    min: 5,
    max: 20
  }
};