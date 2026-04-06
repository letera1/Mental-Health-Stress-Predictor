# 🧠 MindCare AI - Mental Health Assessment Platform

<div align="center">

![Status](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask%203.0-000000?logo=flask)
![License](https://img.shields.io/badge/License-MIT-green)

**An intelligent mental health assessment platform powered by Ensemble Machine Learning with modern, beautiful UI/UX.**

[Features](#-key-features) •
[Demo](#-screenshots) •
[Installation](#-installation) •
[Usage](#-usage) •
[API](#-api-documentation)

</div>

---

## 📖 Overview

**MindCare AI** is a cutting-edge web application designed to provide preliminary mental health assessments for students. By leveraging an **Ensemble Soft Voting Classifier**, the system analyzes varied inputs—ranging from sleep patterns to academic performance—to predict potential stress levels and mental health states with high accuracy.

### ✨ What's New in v2.0

- 📊 **Interactive Dashboard** with real-time analytics and charts
- 🎨 **Completely Redesigned UI/UX** with modern dark theme
- 📈 **Data Visualizations** using Recharts (line, bar, radar, pie charts)
- ✨ **Smooth Animations** powered by Framer Motion
- 📱 **Fully Responsive** design for all devices
- 🎯 **Better User Experience** with improved navigation and interactions

Note: *This tool provides algorithm-based insights and is **not** a substitute for professional medical advice.*

---

## 🚀 Key Features

### 🛡️ Privacy-First Design
- **Zero Data Storage**: No personal information is ever saved
- **Stateless Processing**: All assessments are processed in real-time
- **Anonymous**: No user accounts or tracking required

### 🤖 Advanced AI Technology
- **Ensemble Learning**: Combines 5 ML algorithms for robust predictions
  - Random Forest
  - Extra Trees
  - Linear SVC
  - K-Nearest Neighbors
  - Decision Tree
- **Soft Voting**: Averages probabilities for more accurate results
- **Scikit-Learn 1.6.1**: Latest ML framework

### 📊 Comprehensive Dashboard
- **Weekly Trends**: Track mood, energy, and sleep patterns
- **Wellness Breakdown**: Radar chart showing mental, physical, emotional, social, and academic health
- **Stress Visualization**: Bar charts displaying stress levels over time
- **Contributing Factors**: Visual breakdown of factors affecting mental health
- **Activity Timeline**: Recent assessments and activities

### 🎨 Modern UI/UX
- **Dark Theme**: Easy on the eyes with calming purple/blue gradients
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Intuitive Navigation**: Clear structure with active state indicators
- **Accessibility**: WCAG-compliant color contrasts and semantic HTML

### ⚡ Real-Time Assessment
- **Quick Form**: Complete in 2-3 minutes
- **Instant Results**: Get predictions immediately
- **Personalized Recommendations**: Tailored advice based on results
- **Resource Links**: Direct access to mental health support

---

## 🏗 System Architecture

```
MindCare/
├── backend/                    # Flask API Server
│   ├── app.py                 # Main API application
│   ├── models/                # Trained ML models (.pkl)
│   ├── data/                  # Training datasets
│   ├── notebooks/             # Jupyter notebooks for research
│   ├── docs/                  # API documentation
│   └── requirements.txt       # Python dependencies
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── Components/        # Reusable UI components
│   │   │   ├── NavBar/       # Navigation bar
│   │   │   ├── Footer/       # Footer component
│   │   │   └── ResultCard/   # Assessment result display
│   │   ├── Pages/            # Application pages
│   │   │   ├── Home/         # Landing page
│   │   │   ├── Dashboard/    # Analytics dashboard (NEW!)
│   │   │   ├── predict/      # Assessment form
│   │   │   ├── resource/     # Mental health resources
│   │   │   └── About/        # About page
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite configuration
│
└── README.md                  # This file
```

---

## 🛠️ Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended)
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   
   Windows:
   ```bash
   venv\Scripts\activate
   ```
   
   Mac/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the server**
   ```bash
   python app.py
   ```
   
   Server runs on: `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Client runs on: `http://localhost:5173`

---

## 🎯 Usage

### Taking an Assessment

1. **Open the application** at `http://localhost:5173`
2. **Navigate to Assessment** page from the navbar
3. **Fill out the form** with your information:
   - Personal info (Age, Gender, GPA)
   - Mental health indicators (Stress, Anxiety, Depression scores)
   - Lifestyle factors (Sleep hours, Physical activity)
   - Current mood and sentiment
4. **Submit** and receive instant results
5. **View recommendations** and access resources

### Viewing Dashboard

1. **Click Dashboard** in the navigation
2. **Explore visualizations**:
   - Weekly mental health trends
   - Wellness breakdown across 5 dimensions
   - Stress level patterns
   - Contributing factors analysis
   - Recent activity timeline
3. **Take actions** using quick action cards

---

## 📊 API Documentation

### Base URL
```
http://localhost:5001
```

### Endpoints

#### Health Check
```http
GET /
```

Returns: `"Mental Health Prediction API - POST to /predict"`

#### Predict Mental Health Status
```http
POST /predict
```

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

**Field Descriptions:**

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| Age | Integer | 17-45 | Student's age |
| Gender | Integer | 0-2 | 0=Female, 1=Male, 2=Other |
| GPA | Float | 1.0-4.0 | Grade Point Average |
| Stress_Level | Integer | 1-5 | Self-perceived stress |
| Anxiety_Score | Integer | 0-21 | Anxiety assessment score |
| Depression_Score | Integer | 0-27 | Depression assessment score |
| Sleep_Hours | Float | 3-9 | Average hours per night |
| Steps_Per_Day | Integer | 2000-12000 | Daily physical activity |
| Mood_Description | Integer | 0-6 | Current mood state |
| Sentiment_Score | Float | -1 to 1 | Overall sentiment |

**Success Response:**
```json
{
  "prediction": 0
}
```

**Prediction Values:**
- `0` = Healthy (Good mental health)
- `1` = At Risk (Moderate concerns)
- `2` = Struggling (Seek professional help)

**Error Response:**
```json
{
  "error": "Missing: Age, Gender"
}
```

---

## 🧠 Model Details

The core prediction engine uses a **Soft Voting Ensemble** approach that combines predictions from multiple classifiers:

| Algorithm | Purpose | Weight |
|-----------|---------|--------|
| **Random Forest** | Generalizable baseline | Equal |
| **Extra Trees** | Variance reduction | Equal |
| **Linear SVC** | High-dimensional separation | Equal |
| **KNN** | Local structure detection | Equal |
| **Decision Tree** | Interaction capture | Equal |

The ensemble averages the predicted probabilities of all classifiers to make the final decision, resulting in better performance than any single model alone.

**Model Performance:**
- Trained on student mental health dataset
- Cross-validated for reliability
- Optimized hyperparameters
- Handles class imbalance

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Primary: `#6366f1` (Indigo)
- Secondary: `#14b8a6` (Teal)
- Accent: `#a855f7` (Purple)

**Status Colors:**
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#ef4444` (Red)

**Background:**
- Primary: `#0f172a` (Dark blue)
- Secondary: `#1e293b` (Slate)
- Card: `rgba(30, 41, 59, 0.8)` (Translucent)

### Typography
- Font Family: Inter, system fonts
- Headings: 700-800 weight
- Body: 400-500 weight
- Line Height: 1.6-1.8

### Spacing
- Base unit: 0.25rem (4px)
- Scale: xs, sm, md, lg, xl, 2xl

---

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⚠️ Disclaimer

**Important:** MindCare AI is designed for educational and awareness purposes only. It is **not** a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing mental health concerns:

- Consult with a qualified mental health professional
- Call 988 (Suicide & Crisis Lifeline) for immediate support
- Contact your campus counseling services
- In emergencies, call 911

---

## 🙏 Acknowledgments

- Mental health assessment scales based on established psychological research
- UI/UX inspiration from modern dashboard designs
- Icons from React Icons
- Charts powered by Recharts
- Animations by Framer Motion

---

<div align="center">

**Made with ❤️ for Mental Health Awareness**

[Report Bug](https://github.com/yourusername/mindcare/issues) •
[Request Feature](https://github.com/yourusername/mindcare/issues)

</div>
