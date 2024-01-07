from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
cors = CORS(
    app,
    resources={
        r"/api/capitalize": {
            "origins": "http://localhost:5173",
            "methods": ["GET", "POST"],
        }
    },
)

model_name = "cardiffnlp/twitter-roberta-base-sentiment-latest"


@app.route("/api/capitalize", methods=["POST", "GET"])
def capitalize_name():
    if request.method == "GET":
        # Handle GET request
        return jsonify({"message": "This is a GET request"})
    elif request.method == "POST":
        # Handle POST request
        data = request.get_json()
        sentiment_analysis = pipeline(
            "sentiment-analysis",
            model="cardiffnlp/twitter-roberta-base-sentiment-latest",
            tokenizer="cardiffnlp/twitter-roberta-base-sentiment-latest",
        )
        data1 = sentiment_analysis(data["name"])
        # print(data)
        return jsonify({"data": data1})
        # return jsonify(data['text'])


if __name__ == "__main__":
    app.run(debug=True)
