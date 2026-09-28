FEATURES = (
    "Age",
    "Gender",
    "GPA",
    "Stress_Level",
    "Anxiety_Score",
    "Depression_Score",
    "Sleep_Hours",
    "Steps_Per_Day",
    "Mood_Description",
    "Sentiment_Score",
)

NUMERIC_RANGES = {
    "Age": (17, 45),
    "GPA": (1.0, 4.0),
    "Stress_Level": (1, 5),
    "Anxiety_Score": (0, 21),
    "Depression_Score": (0, 27),
    "Sleep_Hours": (3, 9),
    "Steps_Per_Day": (2000, 12000),
    "Sentiment_Score": (-1.0, 1.0),
}

GENDER_MAP = {
    "0": "Female",
    "1": "Male",
    "2": "Other",
    0: "Female",
    1: "Male",
    2: "Other",
    "female": "Female",
    "male": "Male",
    "other": "Other",
}

MOOD_MAP = {
    "0": "Happy",
    "1": "Sad",
    "2": "Anxious",
    "3": "Tired",
    "4": "Relaxed",
    "5": "Stressed",
    "6": "Motivated",
    0: "Happy",
    1: "Sad",
    2: "Anxious",
    3: "Tired",
    4: "Relaxed",
    5: "Stressed",
    6: "Motivated",
    "happy": "Happy",
    "sad": "Sad",
    "anxious": "Anxious",
    "tired": "Tired",
    "relaxed": "Relaxed",
    "stressed": "Stressed",
    "motivated": "Motivated",
}


def normalize_payload(data):
    if not isinstance(data, dict):
        raise ValueError("JSON body must be an object")

    missing = [field for field in FEATURES if field not in data]
    if missing:
        raise ValueError(f"Missing: {', '.join(missing)}")

    normalized = {}
    for field in FEATURES:
        value = data[field]
        if value is None or value == "":
            raise ValueError(f"Field '{field}' cannot be empty")

        if field in NUMERIC_RANGES:
            try:
                number = float(value)
            except (TypeError, ValueError) as exc:
                raise ValueError(f"Field '{field}' must be a number") from exc

            low, high = NUMERIC_RANGES[field]
            if not low <= number <= high:
                raise ValueError(f"Field '{field}' must be between {low} and {high}")
            normalized[field] = number
            continue

        if field == "Gender":
            key = value.lower().strip() if isinstance(value, str) else value
            if key not in GENDER_MAP:
                raise ValueError("Gender must be one of: Female, Male, Other (or 0/1/2)")
            normalized[field] = GENDER_MAP[key]
            continue

        if field == "Mood_Description":
            key = value.lower().strip() if isinstance(value, str) else value
            if key not in MOOD_MAP:
                raise ValueError(
                    "Mood_Description must be one of: Happy, Sad, Anxious, Tired, "
                    "Relaxed, Stressed, Motivated (or 0-6)"
                )
            normalized[field] = MOOD_MAP[key]

    return normalized