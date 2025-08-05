from flask import Flask, render_template, request
from utils.sendData.sendData import sendData

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/sendData", methods=["POST"])
def handle_send_data():
    return sendData()

if __name__ == "__main__":
    app.run(debug=True)