from flask import Flask, render_template, request, Response
#import serial,
import time
from camera import VideoCamera
import os
import bts7960 as md

#/home/pi/.local/lib/python3.7/site-packages/bts7960

import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

def setServoAngle(servo, angle):
            pwm = GPIO.PWM(servo, 50)
            pwm.start(8)
            dutyCycle = angle / 18. + 3.
            pwm.ChangeDutyCycle(dutyCycle)
            time.sleep(0.3)
            pwm.stop()
servo = 17
GPIO.setup(servo, GPIO.OUT)
setServoAngle(servo, 110)

mov = md.Drivers()
speed=30

app = Flask(__name__)

screenshot_dir = "static/screenshots"
# screenshot_dir = "static/test_screenshots" # For debbuging and dev
pi_camera = VideoCamera(flip=False) # flip pi camera if upside down.


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
        #write_to_arduino(id)
        if id==4:
            setServoAngle(servo, 140)
        if id==5:
            setServoAngle(servo, 90)
        if id==1:
            mov.Forward(speed)
        if id==2:
            mov.Backward(speed)
        if id==3:
            mov.Stop()
    elif 6 <= id <= 7:
        pass # write the change-car-speed logic here.
    elif id == 10:
        # Take a photo when pressing camera button in the WebGui
        pi_camera.take_picture(screenshot_dir)
        print("pic taken")
        return "Pic taken" , 200 #Send status 200 back to the frontend
    else:
        return f"Id: {id} is out of the range", 400
        mov.Stop()
    return "success"

##@app.route("/galeri")
##def galeri_page():
##    files = []
##    for file in os.scandir(screenshot_dir):
##        # check if current path is a file
##        files.append(file.name)
##    files.sort()
##    file_count=len(files)
##    return render_template('galeri.html',index=file_count, files=files) 

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
