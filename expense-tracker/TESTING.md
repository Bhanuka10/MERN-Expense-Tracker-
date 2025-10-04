# Testing Instructions

## Backend Testing

1. Start the backend server:
```powershell
cd expense-tracker/backend
npm run dev
```

2. You should see "Server running on port 5000" and "MongoDB Connected: [hostname]"
   - If you see an error about MongoDB connection, make sure you have:
     - MongoDB running locally or
     - A valid MongoDB Atlas connection string in `.env`

3. Test API endpoints with a tool like Postman or using curl:
   - GET `http://localhost:5000/api/expenses` - Should return empty array or existing expenses
   - POST `http://localhost:5000/api/expenses` with body:
     ```json
     {
       "title": "Test Expense",
       "amount": 25.99,
       "category": "Testing"
     }
     ```
   - GET `http://localhost:5000/api/expenses` again to see your new expense
   - Use the returned ID to test PUT/DELETE endpoints

## Frontend Testing

1. Start the frontend server (in a separate terminal):
```powershell
cd expense-tracker/frontend
npm start
```

2. The browser should open to http://localhost:3000
   - If not, open it manually

3. Test these features:
   - Add a new expense (fill form and click Add)
   - See it appear in the list
   - See summary update with new total
   - Click Edit on the expense and update values
   - Click Delete to remove it
   - Verify charts update when expenses change

## Common Issues & Solutions

1. **MongoDB Connection Errors**:
   - Check MongoDB is running or Atlas URL is correct
   - Ensure network allows connection

2. **Frontend API Errors**:
   - Ensure backend is running
   - Check REACT_APP_API_URL is correct (if customized)

3. **Chart Rendering Issues**:
   - Check browser console for errors
   - Make sure Chart.js and react-chartjs-2 are installed