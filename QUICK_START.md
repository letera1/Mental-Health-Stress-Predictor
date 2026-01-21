# MindCare - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install flask flask-cors scikit-learn==1.6.1 pandas numpy joblib
   ```
   
   **Note**: If you have scikit-learn 1.8.0, the app will automatically use the Random Forest fallback model.

3. **Start the Flask server**
   ```bash
   python app.py
   ```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/mental-health-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Access the Application

Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 📁 Project Structure

```
mental-health-app/
├── backend/
│   ├── app.py                          # Flask API server
│   ├── models/                         # ML models directory
│   │   ├── mental_health_model_ensemble_soft.pkl  # Ensemble model (primary)
│   │   ├── mental_health_model_ensemble_hard.pkl  # Hard voting ensemble
│   │   └── mental_health_model.pkl                # Base model
│   ├── datapreprocessing.ipynb         # ML model training
│   ├── mental_health_dataset.csv       # Training data
│   ├── random_forest_mentalhealth.pkl  # Fallback model
│   └── scaler.pkl                      # Data scaler
│
└── frontend/
    └── mental-health-frontend/
        ├── src/
        │   ├── Components/
        │   │   ├── NavBar/             # Navigation component
        │   │   ├── Footer/             # Footer component
        │   │   └── ResultCard/         # Result display component
        │   ├── Pages/
        │   │   ├── Home/               # Landing page
        │   │   ├── predict/            # Assessment form
        │   │   ├── resource/           # Resources page
        │   │   └── About/              # About page
        │   ├── App.jsx                 # Main app component
        │   ├── App.css                 # Global styles
        │   ├── index.css               # CSS variables & reset
        │   └── main.jsx                # Entry point
        ├── index.html                  # HTML template
        ├── package.json                # Dependencies
        └── vite.config.js              # Vite configuration
```

## Key Features

### 1. Home Page
- Hero section with call-to-action
- Feature highlights
- Statistics showcase
- Responsive design

### 2. Assessment Page
- Multi-section form
- Progress tracking
- Real-time validation
- Instant results

### 3. Resources Page
- Emergency contacts (988, Crisis Text Line)
- National mental health organizations
- Campus resources
- Categorized information

### 4. About Page
- Mission statement
- Privacy information
- Technology stack
- Disclaimers

## Configuration

### Backend Configuration (app.py)
- Default port: 5000
- CORS enabled for frontend communication
- Primary model: `models/mental_health_model_ensemble_soft.pkl` (Ensemble Learning)
- Fallback model: `random_forest_mentalhealth.pkl` (Random Forest)
- Scaler: `scaler.pkl`
- **Note**: Requires scikit-learn 1.6.1 for ensemble model; automatically falls back to Random Forest with 1.8.0

### Frontend Configuration (vite.config.js)
- Default port: 5173
- API endpoint: `http://localhost:5000`

## Assessment Parameters

The assessment form collects the following data:
- **Personal**: Age, Gender, GPA
- **Mental Health**: Stress Level, Anxiety Score, Depression Score, Mood, Sentiment Score
- **Lifestyle**: Sleep Hours, Steps Per Day

The ensemble machine learning model uses soft voting to combine predictions from multiple algorithms for improved accuracy.

---

## UI/UX Features

### Design System
- Modern color palette
- Consistent spacing and typography
- Smooth animations
- Responsive layouts

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast colors

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px
- Touch-friendly buttons
- Optimized layouts

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in app.py
app.run(debug=True, port=5001)
```

**Module not found:**
```bash
pip install -r requirements.txt
```

**Model file not found:**
Ensure model files are in the correct locations:
- Primary: `backend/models/mental_health_model_ensemble_soft.pkl`
- Fallback: `backend/random_forest_mentalhealth.pkl`
- Scaler: `backend/scaler.pkl`

**Scikit-learn version mismatch:**
```bash
# For ensemble model support
pip install scikit-learn==1.6.1

# Or let the app use Random Forest fallback with any version
```

### Frontend Issues

**Port already in use:**
Vite will automatically use the next available port

**API connection error:**
- Ensure backend is running on port 5000
- Check CORS configuration in app.py
- Verify API endpoint in Predict.jsx

**Dependencies error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Flask debug mode reloads on Python file changes

### Testing the Assessment
Use these sample values for testing:
- Age: 20
- Gender: 0 (Female), 1 (Male), 2 (Other)
- GPA: 3.5
- Stress Level: 3 (1-5 scale)
- Anxiety Score: 5
- Depression Score: 4
- Sleep Hours: 7
- Steps Per Day: 8000
- Mood: 0-6 (Happy, Sad, Anxious, Tired, Relaxed, Stressed, Motivated)
- Sentiment Score: 0.5

## Production Build

### Frontend
```bash
cd frontend/mental-health-frontend
npm run build
```

The build output will be in the `dist` directory.

### Backend
For production deployment:
1. Set `debug=False` in app.py
2. Use a production WSGI server (e.g., Gunicorn)
3. Configure proper CORS origins
4. Set up environment variables

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Scikit-learn Documentation](https://scikit-learn.org/)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the UPGRADE_NOTES.md file
3. Check browser console for errors
4. Verify backend logs

---

**Remember**: This is an educational tool. Always seek professional help for mental health concerns.

**Emergency**: Call 988 (Suicide & Crisis Lifeline) or 911 for immediate help.
