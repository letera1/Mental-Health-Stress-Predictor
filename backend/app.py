import os

from mindcare import create_app


app = create_app()

if __name__ == '__main__':
    debug = os.environ.get("FLASK_DEBUG", "").lower() in {"1", "true", "yes"}
    app.run(debug=debug, host=os.environ.get("HOST", "127.0.0.1"), port=5001)