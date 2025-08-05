from flask import request, jsonify
from utils.sendData.markupData import markupData
from utils.sendData.createPdf import createPdf
from utils.sendData.updateGoogleSheet import updateGoogleSheet

# route:::
# @app.route("/sendData", methods=["POST"])

def sendData():
    try:
        if request.method == "POST":
            data = request.get_json()
            muData = markupData(data)
            createPdf(muData)
            updateGoogleSheet(muData)

            return jsonify({"status": "success", "received": data}), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Method not allowed. Use POST."
            }), 405
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500