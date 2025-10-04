# Expense Tracker (MERN Stack)

A complete expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js). Track your expenses, categorize them, visualize spending patterns, and manage your budget effectively.

## Features

- Add, edit, and delete expenses
- Categorize expenses (e.g., Food, Transportation, Bills)
- View summary with total and category-wise spending
- Visualize expenses with pie and bar charts
- Responsive design for desktop and mobile

## Project Structure

```
expense-tracker/
├── backend/                # Node.js + Express + MongoDB backend
│   ├── config/             # Database connection
│   ├── controllers/        # API request handlers
│   ├── models/             # Mongoose data models
│   ├── routes/             # API routes
│   └── server.js           # Express server entry point
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/                # React source files
│       ├── components/     # UI components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── App.js          # Main App component
│       └── index.js        # React entry point
```

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)

## Installation & Setup

### 1. Backend Setup

```powershell
# Navigate to backend directory
cd expense-tracker/backend

# Install dependencies
npm install

# Create .env file in the backend folder with your MongoDB connection:
# MONGO_URI=mongodb://localhost:27017/expense-tracker
# PORT=5000

# Start development server
npm run dev
```

The backend will run on http://localhost:5000 by default.

### 2. Frontend Setup

```powershell
# Open a new terminal
# Navigate to frontend directory
cd expense-tracker/frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will run on http://localhost:3000 by default.

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create a new expense
- `GET /api/expenses/:id` - Get a specific expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb://localhost:27017/expense-tracker  # Your MongoDB connection string
PORT=5000                                           # Port for Express server (optional, default: 5000)
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api/expenses  # Backend API URL (optional if using default)
```

## Tech Stack

- **Frontend**: React, Chart.js, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose

## Future Enhancements

- User authentication and multiple user support
- Budget setting and alerts
- Reports and advanced analytics
- Export data functionality
- Dark mode theme

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is installed and running on your machine
- Verify that MongoDB is running on the default port (27017)
- Check the MongoDB connection string in the `.env` file

### Backend API Connection Issues
- Ensure the backend server is running on port 5000
- Check if there are any CORS issues in the browser console
- Verify that the API_URL in the frontend is set correctly

### Demo Mode
If MongoDB is not available, the application will run in demo mode with mock data. In this mode:
- You can view, add, edit, and delete expenses
- Changes will not be persisted after page refresh
- A notification will be shown that the application is running in demo mode

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request