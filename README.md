# AutoAqua - Smart Irrigation Monitoring System

AutoAqua is a modern web-based dashboard for monitoring and controlling automated irrigation systems. It provides real-time monitoring of soil moisture levels, temperature readings, and manual control capabilities for irrigation management.

![AutoAqua Dashboard](frontend/public/dashboard-preview.png)

## Features

-  Real-time monitoring of soil moisture levels
-  Temperature tracking with status indicators
-  Manual irrigation control system
-  Automated watering recommendations
-  Responsive design for all devices
-  Modern blue-themed UI with glassmorphism effects

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: CSS3 with custom properties
- **State Management**: React Hooks
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KushalM23/AutoAqua.git
   cd AutoAqua
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── MoistureSensor.jsx
│   │   ├── TemperatureSensor.jsx
│   │   └── ManualControl.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
└── package.json
```

## Component Overview

- **Dashboard**: Main container component that manages sensor data
- **MoistureSensor**: Displays soil moisture levels with status indicators
- **TemperatureSensor**: Shows temperature readings with status alerts
- **ManualControl**: Provides manual override for irrigation system
- **Header**: Contains the application title and description

## Customization

### Modifying Thresholds

You can adjust the moisture and temperature thresholds in the respective components:

- `MoistureSensor.jsx`: Modify the threshold values in `getStatusColor()`
- `TemperatureSensor.jsx`: Adjust temperature ranges in `getStatusColor()`

### Styling

The application uses CSS variables for consistent theming. Main color variables can be found in `index.css`:

```css
:root {
  --primary-blue: #0077B6;
  --secondary-blue: #00B4D8;
  --light-blue: #90E0EF;
  --background-blue: #03045E;
  /* ... other variables */
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements

- [ ] Integration with real sensor data
- [ ] Historical data visualization
- [ ] Weather forecast integration
- [ ] Automated scheduling system
- [ ] Mobile app version
- [ ] Email/SMS alerts for critical conditions

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with 💙 by KushalM23