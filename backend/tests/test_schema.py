import pytest

from mindcare.schema import normalize_payload


def test_numeric_category_aliases_are_normalized(valid_payload):
    valid_payload["Gender"] = 0
    valid_payload["Mood_Description"] = "2"

    normalized = normalize_payload(valid_payload)

    assert normalized["Gender"] == "Female"
    assert normalized["Mood_Description"] == "Anxious"


def test_non_object_json_is_rejected():
    with pytest.raises(ValueError, match="JSON body must be an object"):
        normalize_payload([])