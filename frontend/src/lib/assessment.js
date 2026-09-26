export const OUTCOMES = {
  0: {
    label: "Healthy",
    tone: "ok",
    headline: "Your indicators look steady",
    summary:
      "Nothing in this assessment points to elevated risk. The habits behind these numbers are worth protecting.",
    actions: [
      "Keep your current sleep and activity rhythm",
      "Stay connected with the people who support you",
      "Re-assess if your workload or routine changes",
    ],
  },
  1: {
    label: "At Risk",
    tone: "warn",
    headline: "Some early warning signs",
    summary:
      "Several responses sit in a range associated with rising strain. Acting early is far easier than recovering later.",
    actions: [
      "Book a session with campus counselling",
      "Protect a consistent sleep window this week",
      "Review the stress-management resources",
      "Tell one person you trust how you're doing",
    ],
  },
  2: {
    label: "Struggling",
    tone: "bad",
    headline: "Please reach out for support",
    summary:
      "Your responses indicate significant distress. You deserve proper support, and it is available right now.",
    actions: [
      "Contact a mental health professional today",
      "Call or text 988 for immediate, free support",
      "Reach your campus counselling service",
      "Ask someone you trust to stay with you",
    ],
  },
};

export const GENDER_OPTIONS = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
  { label: "Other", value: "Other" },
];

export const MOOD_OPTIONS = [
  { label: "Happy", value: "Happy" },
  { label: "Relaxed", value: "Relaxed" },
  { label: "Motivated", value: "Motivated" },
  { label: "Tired", value: "Tired" },
  { label: "Anxious", value: "Anxious" },
  { label: "Stressed", value: "Stressed" },
  { label: "Sad", value: "Sad" },
];

export const NUMERIC_FIELDS = [
  "Age",
  "GPA",
  "Stress_Level",
  "Anxiety_Score",
  "Depression_Score",
  "Sleep_Hours",
  "Steps_Per_Day",
  "Sentiment_Score",
];

export const EMPTY_FORM = {
  Age: "",
  Gender: "",
  GPA: "",
  Stress_Level: "3",
  Anxiety_Score: "",
  Depression_Score: "",
  Sleep_Hours: "",
  Steps_Per_Day: "",
  Mood_Description: "",
  Sentiment_Score: "0",
};
