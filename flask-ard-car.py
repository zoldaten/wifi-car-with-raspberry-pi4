from flask import Flask, render_template, request, Response
import serial, time
from camera import VideoCamera
app = Flask(__name__)

pi_camera = VideoCamera(flip=False) # flip pi camera if upside down.

# arduino = serial.Serial(port='COM4', baudrate=115200, timeout=.1)
def write_to_arduino(id):
    # arduino.write(bytes(id, 'utf-8'))
    # time.sleep(0.05)
    # data = arduino.readline()
    print(id)

@app.route("/")
def home_page():
    return render_template('index.html') 

def gen(camera):
    #get camera frame
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route("/video_feed")
def video_feed():
    return Response(gen(pi_camera),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# Take a photo when pressing camera button
@app.route("/picture")
def take_picture():
    pi_camera.take_picture()
    return "None"

@app.route("/send")
def retrieve_data():
    id = request.args.get('id', 0)
    id = int(id)
    if 1 <= id <= 5:
        write_to_arduino(id)
    elif 6 <= id <= 7:
        pass # do the speed logic here.
    else:
        return print(f"Number: {id} is out of the range") 
    return "success"

if __name__ == "__main__":
    app.run(debug=True)
