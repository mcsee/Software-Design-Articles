from flask import Flask, jsonify, make_response

app = Flask(__name__)
 
HTTP_100_CONTINUE = 100
HTTP_202_ACCEPTED = 202  # Not used
HTTP_204_NO_CONTENT = 204 # Not Used
HTTP_302_FOUND = 302 # Not Used
HTTP_400_BAD_REQUEST = 400  # Not Used
HTTP_401_UNAUTHORIZED = 401 # Not Used
HTTP_403_FORBIDDEN = 403
HTTP_404_NOT_FOUND = 404
HTTP_410_GONE = 410
HTTP_500_INTERNAL_SERVER_ERROR = 500
HTTP_501_NOT_IMPLEMENTED = 501

probe_telemetry = {
    "temperature": {"solar_panels": 150, "instrument_1": 50},
    "position": {"x": 1000000, "y": 2000000, "z": 3000000, 
    "velocity": {"vx": 100, "vy": 200, "vz": 300}},
    "status": {"power_level": 95, "communication_status": "OK"}
}

@app.route('/api/v1/probe/telemetry', methods=['GET'])
def get_telemetry():
    return jsonify(probe_telemetry), HTTP_200_OK

# The following function is not invoked 
# and not implemented
# It is a dead placeholder
@app.route('/api/v1/probe/send_command', methods=['POST'])
def send_command():
    return jsonify(
        {"message": "Command endpoint not implemented yet."}
    ), HTTP_501_NOT_IMPLEMENTED

@app.route('/api/v1/probe/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Data not found"}), HTTP_404_NOT_FOUND

@app.route('/api/v1/probe/redirect', methods=['GET'])
def redirect_endpoint():
    response = make_response(
        jsonify({"message": "Redirecting..."}), 
        HTTP_301_MOVED_PERMANENTLY
    )
    response.headers['Location'] = '/api/v1/probe/telemetry'
    return response

@app.route('/api/v1/probe/not_modified', methods=['GET'])
def not_modified_endpoint():
    response = make_response(jsonify({"message": "Not Modified"}), 
       HTTP_304_NOT_MODIFIED)
    response.headers['ETag'] = 'some_etag'
    return response

@app.route('/api/v1/probe/gone', methods=['GET'])
def gone_endpoint():
    return jsonify(
        {"message": "Resource permanently gone"}
    ), HTTP_410_GONE