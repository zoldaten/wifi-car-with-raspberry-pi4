from flask import Flask, render_template, request, Response
import serial, time
from camera import VideoCamera
import os
app = Flask(__name__)

screenshot_dir = "static/screenshots"
# screenshot_dir = "static/test_screenshots" # For debbuging and dev
pi_camera = VideoCamera(flip=False) # flip pi camera if upside down.

# arduino = serial.Serial(port='COM4', baudrate=115200, timeout=.1) # Port is usb ports name
arduino = serial.Serial() # Port is usb ports name
def write_to_arduino(id):
    arduino.write(bytes(id, 'utf-8'))
    # time.sleep(0.05)
    data = arduino.readline()
    print(f"Recieved from arduino: {data}") 

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

@app.route("/send")
def retrieve_data():
    id = request.args.get('id', 0)
    id = int(id)
    print(f"Recieved from the web id: {id}")
    if 1 <= id <= 5:
        write_to_arduino(id)
    elif 6 <= id <= 7:
        pass # write the change-car-speed logic here.
    elif id == 10:
        # Take a photo when pressing camera button in the WebGui
        pi_camera.take_picture(screenshot_dir)
        print("pic taken")
        return "Pic taken" , 200 #Send status 200 back to the frontend
    else:
        return f"Id: {id} is out of the range", 400 
    return "success"

@app.route("/galeri")
def galeri_page():
    files = []
    for file in os.scandir(screenshot_dir):
        # check if current path is a file
        files.append(file.name)
    files.sort()
    file_count=len(files)
    return render_template('galeri.html',index=file_count, files=files) 

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
