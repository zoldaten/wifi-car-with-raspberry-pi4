from flask import Flask, render_template, request, abort
import serial, time

app = Flask(__name__)

# arduino = serial.Serial(port='COM4', baudrate=115200, timeout=.1)
def write_to_arduino(id):
    # arduino.write(bytes(id, 'utf-8'))
    # time.sleep(0.05)
    # data = arduino.readline()
    print(id)

@app.route("/")
def home_page():
    return render_template('base.html') 

@app.route("/send")
def retrieve_data():
    id = request.args.get('id', 0)
    id = int(id)
    if 1 <= id <= 5:
        write_to_arduino(id)
    elif 6 <= id <= 7:
        pass # do the speed logic here.
    else:
        return abort(404)
    return "success"
@app.route("/video")
def video_stream():
    pass #logic for live video
    return "smth"
if __name__ == "__main__":
    app.run(debug=True)
