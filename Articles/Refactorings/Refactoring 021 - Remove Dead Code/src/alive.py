from flask import Flask, jsonify, make_response
from http import HTTPStatus

app = Flask(__name__)

HTTP_200_OK = HTTPStatus.OK
HTTP_301_MOVED_PERMANENTLY = HTTPStatus.MOVED_PERMANENTLY
HTTP_304_NOT_MODIFIED = HTTPStatus.NOT_MODIFIED
HTTP_404_NOT_FOUND = HTTPStatus.NOT_FOUND
HTTP_410_GONE = HTTPStatus.GONE
HTTP_501_NOT_IMPLEMENTED = HTTPStatus.NOT_IMPLEMENTED

probe_telemetry = {
    "temperature": {"solar_panels": 150, "instrument_1": 50},
    "position": {
        "x": 1000000, "y": 2000000, "z": 3000000,
        "velocity": {"vx": 100, "vy": 200, "vz": 300}
    },
    "status": {"power_level": 95, "communication_status": "OK"}
}

@app.route('/api/v1/probe/telemetry', methods=['GET'])
def get_telemetry():
    return jsonify(probe_telemetry), HTTP_200_OK

@app.route('/api/v1/probe/send_command', methods=['POST'])
def send_command():
    return jsonify({"message": "Command not implemented."}), \
        HTTP_501_NOT_IMPLEMENTED

@app.route('/api/v1/probe/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Data not found"}), HTTP_404_NOT_FOUND
