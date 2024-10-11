# Sensor Data Visualization App

A React-based web application for visualizing sensor data fetched from Firebase Firestore.

## Features

- **Real-time Data**: Fetches and displays the latest sensor readings.
- **Multiple Sensors**: Supports various types of sensors.
- **Detailed View**: Provides a detailed view for each sensor type with historical data.
- **Responsive Design**: Works seamlessly on both mobile and desktop devices.
- **Error Handling**: Comprehensive error handling for data fetching issues.
- **Loading States**: Spinner animation while data is being loaded.

## Tech Stack

- **Frontend**: React with TypeScript
- **Routing**: React Router
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Build Tool**: (Presumed to be Vite or Create React App)

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

   ```
   git clone [your-repo-url]
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project and set up Firestore.
   - Add your Firebase configuration to `src/config/firebase.ts`.

4. Run the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Usage

- The home page displays the latest readings from all sensors.
- Click on a sensor card to view its detailed historical data.
- The sensor detail page shows a table of all readings for that sensor type.

## Data Structure

The application expects data in Firestore to be structured as follows:

- Collection: `y{YYYY}m{MM}d{DD}` (e.g., `y2023m05d15`)
  - Documents: Named after sensor types
    - Fields: Timestamps as keys, sensor readings as values

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Firebase team for providing a robust backend solution.
- Tailwind CSS for rapid UI development.
- React community for excellent documentation and support.
