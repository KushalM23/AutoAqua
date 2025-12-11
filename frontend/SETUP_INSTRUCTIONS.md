# AutoAqua - Irrigation Monitoring Dashboard

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenWeather API

To display real temperature data from Bangalore, you need to configure the OpenWeather API:

1. **Get an API Key:**
   - Visit [OpenWeather API](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API Keys section
   - Copy your API key

2. **Update the API Key:**
   - Open `src/components/WeatherCard.jsx`
   - Find line 13: `const API_KEY = 'YOUR_API_KEY_HERE'`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

### 3. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if specified by Vite).

## Features

### 1. Environmental Monitoring
- **Temperature Card**: Displays real-time weather data from Bangalore using OpenWeather API
  - Current temperature
  - Feels like temperature
  - Humidity percentage
  - Weather conditions
  - Auto-refreshes every 10 minutes

- **Soil Moisture Card**: Shows soil moisture levels with dummy data
  - Moisture percentage with visual bar
  - Status indicator (Low/Moderate/Optimal)
  - Simulated real-time updates every 5 seconds

### 2. Irrigation Schedule
- Weekly calendar view showing the current week
- Pre-configured irrigation schedule (Monday, Wednesday, Friday at 6 AM and 6 PM)
- Visual indicators for:
  - Today's date (highlighted in yellow)
  - Scheduled irrigation days (blue gradient)
  - No irrigation days (greyed out)

### 3. Manual Irrigation Control
- Start/Stop irrigation buttons
- Visual status indicator with animated light
- Confirmation popup before any action
- Warning messages about schedule override
- Disabled state for unavailable actions

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **OpenWeather API** - Weather data
- **CSS3** - Styling with gradients and animations

## Customization

### Modify Irrigation Schedule
Edit `src/components/IrrigationSchedule.jsx`, lines 22-26:
```javascript
if ([1, 3, 5].includes(date.getDay())) {
  schedules.push({ time: '06:00 AM', duration: '30 min' })
  schedules.push({ time: '06:00 PM', duration: '30 min' })
}
```

### Change Location
Edit `src/components/WeatherCard.jsx`, line 14:
```javascript
const city = 'Bangalore'
```

### Adjust Moisture Data Range
Edit `src/components/MoistureCard.jsx`, line 10:
```javascript
setMoisture(Math.floor(Math.random() * 20) + 55) // Currently 55-75%
```

## Notes

- The weather data requires a valid OpenWeather API key
- Moisture data is currently simulated and updates every 5 seconds
- The irrigation schedule is static but can be connected to a backend API
- Manual control actions show confirmation popups for safety
