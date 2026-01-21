# MindCare - Mental Health & Stress Prediction in Students

A smart web application that helps students check their mental health and stress levels using machine learning technology.

---

## What is MindCare?

MindCare is a website where students can:
- Answer questions about their daily life, sleep, stress, and mood
- Get instant predictions about their mental health status
- Receive helpful recommendations and resources
- Find emergency mental health contacts

**Important**: This is a tool to help you understand your mental health better, but it's NOT a replacement for talking to a real doctor or counselor.

---

## What Can It Do?

### Main Features
- Quick Assessment - Fill out a simple form with 10 questions
- Instant Results - Get your mental health prediction in seconds
- Private & Safe - Your information is never saved or shared
- Works Everywhere - Use it on your phone, tablet, or computer
- Helpful Resources - Find mental health support and emergency contacts

### How It Works
1. You answer questions about your age, GPA, sleep, stress, mood, etc.
2. Our ensemble machine learning model analyzes your answers
3. You get a result: Good, Moderate, or Poor mental health status
4. You receive personalized tips and resources

---

## Technology Used

### Frontend (What You See)
- **React** - Makes the website interactive
- **Vite** - Makes the website load fast
- **CSS** - Makes it look beautiful

### Backend (Behind the Scenes)
- **Flask** - Python web server
- **Machine Learning** - Ensemble Learning (Soft Voting) combining multiple algorithms with fallback to Random Forest
- **Scikit-learn** - Machine learning library (requires version 1.6.1 for ensemble model)

---

## How to Install and Run

### What You Need First
- Python (version 3.8 or newer)
- Node.js (version 16 or newer)
- A code editor (like VS Code)

### Step 1: Setup the Backend (Server)

```bash
# 1. Open terminal and go to backend folder
cd backend

# 2. Install Python packages (specific version for model compatibility)
pip install flask flask-cors scikit-learn==1.6.1 joblib numpy

# Note: If you get version errors, the app will automatically fall back to Random Forest model

# 3. Start the server
python app.py
```

You should see: "Running on http://127.0.0.1:5000"

### Step 2: Setup the Frontend (Website)

```bash
# 1. Open a NEW terminal and go to frontend folder
cd frontend/mental-health-frontend

# 2. Install website packages
npm install

# 3. Start the website
npm run dev
```

You should see: "Local: http://localhost:5173"

### Step 3: Open in Browser

Open your web browser and go to: **http://localhost:5173**

---

## Project Files Explained

```
Your Project Folder/
│
├── backend/                    # Server files
│   ├── app.py                 # Main server code
│   ├── models/                # AI models folder
│   │   ├── mental_health_model_ensemble_soft.pkl  # Ensemble model (primary)
│   │   ├── mental_health_model_ensemble_hard.pkl  # Hard voting ensemble
│   │   └── mental_health_model.pkl                # Alternative models
│   ├── random_forest_mentalhealth.pkl  # Fallback AI model
│   ├── scaler.pkl             # Helps prepare data for AI
│   └── mental_health_dataset.csv       # Training data
│
├── frontend/                   # Website files
│   └── mental-health-frontend/
│       ├── src/
│       │   ├── Components/    # Reusable parts (navbar, footer)
│       │   └── Pages/         # Different pages (home, predict, etc.)
│       └── package.json       # List of website dependencies
│
└── README.md                   # This file!
```

---

## The Assessment Form

When you take the assessment, you'll answer these questions:

| Question | What to Enter | Example |
|----------|---------------|---------|
| **Age** | Your age (17-45) | 20 |
| **Gender** | Male, Female, or Other | Female |
| **GPA** | Your grade point average (1.0-4.0) | 3.5 |
| **Stress Level** | How stressed you feel (1-5) | 3 |
| **Anxiety Score** | How anxious you feel (0-21) | 10 |
| **Depression Score** | How depressed you feel (0-27) | 8 |
| **Sleep Hours** | Hours you sleep per night (3-9) | 7 |
| **Steps Per Day** | How much you walk daily (2000-12000) | 6000 |
| **Current Mood** | Happy, Sad, Anxious, Tired, etc. | Anxious |
| **Sentiment Score** | How positive/negative you feel (-1 to 1) | 0.5 |

---

## Understanding Your Results

After submitting the form, you'll get one of these results:

### Good (Status: 0)
- Your mental health looks positive
- Keep up your healthy habits!
- Continue self-care practices

### Moderate (Status: 1)
- Some concerns detected
- Consider talking to someone
- Monitor your mental health
- Try stress-reduction activities

### Poor (Status: 2)
- Significant concerns detected
- **Please seek professional help**
- Contact campus counseling services
- Talk to a trusted adult or counselor

---

## Emergency Contacts

**If you're in crisis or thinking about hurting yourself:**

- Emergency: Call **911**
- Suicide Prevention Lifeline: Call or text **988**
- Crisis Text Line: Text **HOME** to **741741**
- Campus Counseling: Contact your school's health center

**Remember**: It's okay to ask for help. You're not alone.

---

## Common Questions

**Q: Is my information saved?**
A: No! Nothing is stored. Your data is only used for the prediction and then deleted.

**Q: Can I use this instead of seeing a therapist?**
A: No. This is just a tool to help you understand your mental health. Always talk to a real professional.

**Q: How accurate is the prediction?**
A: The ensemble machine learning model combines multiple algorithms (soft voting) for improved accuracy. The app automatically uses the best available model based on your scikit-learn version.

**Q: What if I get a "Poor" result?**
A: Don't panic. It means you should talk to a counselor or mental health professional. They can help you.

**Q: Can I take the assessment multiple times?**
A: Yes! You can check in on your mental health anytime.

---

## Troubleshooting

**Problem: Backend won't start**
- Make sure Python is installed: `python --version`
- Install required packages: `pip install flask flask-cors scikit-learn==1.6.1 joblib numpy`
- If version conflicts occur, the app will use the fallback Random Forest model

**Problem: "Model version mismatch" warning**
- This is normal if you have scikit-learn 1.8.0 instead of 1.6.1
- The app will automatically fall back to the Random Forest model
- To use the ensemble model, install: `pip install scikit-learn==1.6.1`

**Problem: Frontend won't start**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again

**Problem: "Cannot connect to backend"**
- Make sure the backend is running on port 5000
- Check if `http://localhost:5000` shows a message in your browser

---

## Important Disclaimer

**READ THIS CAREFULLY:**

This application is for **educational purposes only**. It is **NOT**:
- A medical diagnosis tool
- A replacement for professional help
- A substitute for therapy or counseling
- 100% accurate or guaranteed

**Always**:
- Talk to a real mental health professional
- Seek help if you're struggling
- Use this as one tool among many
- Trust your feelings and instincts

---

## For Developers

Want to improve this project? Here's how:

1. Fork the repository
2. Make your changes
3. Test everything works
4. Submit a pull request

**Ideas for improvements:**
- Add more languages
- Improve the machine learning model
- Add data visualization
- Create a mobile app version

---

## License

This project is open source and free to use for educational purposes.

---

## Thank You

Thank you for using MindCare. Remember:
- Your mental health matters
- It's okay to not be okay
- Help is always available
- You are not alone

**Take care of yourself!**

---

<div align="center">

**Questions? Need help? Reach out to your campus mental health services.**

Made with care for student mental health awareness

</div>