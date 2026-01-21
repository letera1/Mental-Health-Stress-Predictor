# 🧠 MindCare AI

<div align="center">

![Status](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask)
![License](https://img.shields.io/badge/License-MIT-green)

**An intelligent mental health assessment platform powered by Ensemble Machine Learning.**

[Features](#-key-features) •
[Architecture](#-system-architecture) •
[Installation](#-installation) •
[Usage](#-usage)

</div>

---

## 📖 Overview

**MindCare AI** is a cutting-edge web application designed to provide preliminary mental health assessments for students and professionals. By leveraging an **Ensemble Soft Voting Classifier**, the system analyzes varied inputs—ranging from sleep patterns to academic performance—to predict potential stress levels and mental health states with high accuracy.

Note: *This tool provides algorithm-based insights and is **not** a substitute for professional medical advice.*

---

## 🚀 Key Features

*   **🛡️ Ensemble Intelligence**: utilizes a weighted voting system of 5 distinct algorithms (Random Forest, SVM, KNN, etc.) for robust predictions.
*   **⚡ Real-Time Assessment**: Instant analysis of user metrics via a lightweight Flask API.
*   **📱 Responsive Design**: A modern, mobile-first interface built with React and Vite.
*   **🔒 Privacy-Focused**: No personal identifiable information (PII) is stored; assessments are stateless.
*   **📊 Comprehensive Metrics**: Analyzes lifestyle factors including Sleep Hours, Physical Activity (Steps), and Academic GPA.

---

## 🏗 System Architecture

The project is structured into two main decoupled components:

### 🐍 Backend (Machine Learning & API)
*   **Framework**: Flask (Python)
*   **ML Engine**: Scikit-Learn (v1.6.1)
*   **Model Strategy**: Soft Voting Ensemble (RFC + ExtraTrees + SVM + KNN + DecisionTree)
*   **Data Processing**: Pandas & Numpy pipelines

### ⚛️ Frontend (Client)
*   **Framework**: React.js
*   **Build Tool**: Vite
*   **Styling**: Modern CSS3 with component-scoped modules
*   **State Management**: React Hooks

---

## 📂 Professional Directory Structure

```plaintext
MEntal_heLTH/
├── 🐍 backend/
│   ├── 📓 notebooks/          # Jupyter notebooks for Research & Training
│   ├── 🧠 models/             # Serialized ML models (.pkl)
│   ├── 📂 data/               # Raw and processed datasets
│   ├── 📄 app.py              # Main API Application Entry Point
│   └── 📄 requirements.txt    # Python dependencies
│
├── ⚛️ frontend/               # React Application
│   ├── public/                # Static assets
│   └── src/
│       ├── 🧩 Components/     # Reusable UI Blocks (Nav, Footer)
│       ├── 📄 Pages/          # Application Views (Home, Predict)
│       └── 🎨 assets/         # Images and Icons
```

---

## 🛠️ Installation

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
*Server runs on: `http://localhost:5001`*

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*Client runs on: `http://localhost:5173`*

---

## 🧠 Model Details

The core prediction engine uses a **Soft Voting Regressor** approach. This technique averages the predicted probabilities of multiple classifiers to decide the final class, resulting in better performance than any single model alone.

| Algorithm | Role |
|-----------|------|
| **Random Forest** | Generalizable baseline |
| **Extra Trees** | Variance reduction |
| **Linear SVM** | High-dimensional separation |
| **KNN** | Local structure detection |
| **Decision Tree** | Interaction capture |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
    Made for Mental Health Awareness

</div>
