# Starting the MindCare Application

## Backend Setup (Flask API)

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Create virtual environment (recommended)
```bash
python -m venv venv
```

### 3. Activate virtual environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Start the backend server
```bash
python app.py
```

The backend will run on: **http://localhost:5001**

---

## Frontend Setup (React + Vite)

### 1. Open a new terminal and navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies (if not already done)
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The frontend will run on: **http://localhost:5173**

---

## Testing the Application

1. Open your browser and go to: **http://localhost:5173**
2. Navigate through the pages:
   - **Home**: Landing page with overview
   - **Dashboard**: View mental health analytics and charts
   - **Assessment**: Take the mental health assessment
   - **Resources**: Access mental health resources
   - **About**: Learn more about the application

3. To test the prediction:
   - Go to Assessment page
   - Fill out all form fields
   - Click "Predict"
   - View your results with personalized recommendations

---

## Troubleshooting

### Backend Issues:
- **Port 5001 already in use**: Change port in `backend/app.py` (line: `app.run(debug=True, host='0.0.0.0', port=5001)`)
- **Model not loading**: Ensure scikit-learn version 1.6.1 is installed: `pip install scikit-learn==1.6.1`
- **CORS errors**: Make sure Flask-CORS is installed and configured

### Frontend Issues:
- **Port 5173 already in use**: Vite will automatically use the next available port
- **Cannot connect to backend**: Verify backend is running on port 5001
- **Module not found**: Run `npm install` again

---

## New Features Added

### 1. Dashboard Page
- Real-time mental health analytics
- Interactive charts showing weekly trends
- Wellness score breakdown with radar chart
- Stress level visualization with bar charts
- Contributing factors analysis
- Recent activity timeline
- Quick action cards

### 2. Enhanced UI/UX
- Modern dark theme with gradient accents
- Smooth animations using Framer Motion
- Responsive design for all devices
- Interactive hover effects
- Better color scheme for mental health context
- Improved typography and spacing

### 3. Data Visualizations
- Line charts for mood, energy, and sleep trends
- Bar charts for stress levels
- Radar charts for wellness breakdown
- Progress bars for contributing factors
- Circular progress indicators

### 4. Better Navigation
- Added Dashboard link to navbar
- Improved mobile menu
- Active state indicators
- Smooth transitions

---

## Tech Stack

**Backend:**
- Flask 3.0.0
- Scikit-learn 1.6.1 (Ensemble ML Model)
- Flask-CORS for cross-origin requests
- Pandas & NumPy for data processing

**Frontend:**
- React 19.2.0
- Vite 7.2.4 (Build tool)
- React Router DOM 7.12.0
- Recharts (Data visualization)
- Framer Motion (Animations)
- React Icons

---

## API Endpoint

**POST** `/predict`

**Request Body:**
```json
{
  "Age": 20,
  "Gender": 0,
  "GPA": 3.5,
  "Stress_Level": 3,
  "Anxiety_Score": 10,
  "Depression_Score": 8,
  "Sleep_Hours": 7,
  "Steps_Per_Day": 6000,
  "Mood_Description": 2,
  "Sentiment_Score": 0.5
}
```

**Response:**
```json
{
  "prediction": 0
}
```

Prediction values:
- `0` = Healthy
- `1` = At Risk
- `2` = Struggling

---

## Notes

- The dashboard currently shows sample data for demonstration
- In a production environment, you would store user assessments and display real historical data
- All data is currently stateless (not stored) for privacy
- The ML model uses ensemble soft voting for accurate predictions
