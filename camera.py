import cv2 as cv
from imutils.video.pivideostream import PiVideoStream
import imutils
import time
from datetime import datetime
import numpy as np
import os

class VideoCamera(object):
    def __init__(self, flip = False, file_type = ".jpg", photo_string = "photo-taken"):
        # self.vs = PiVideoStream(resolution=(1920, 1080), framerate=30).start()
        self.vs = PiVideoStream().start()
        self.flip = flip # Flip frame vertically
        self.file_type = file_type # image type i.e. .jpg
        self.photo_string = photo_string # Name to save the photo
        time.sleep(2.0)

    def __del__(self):
        self.vs.stop()

    def flip_if_needed(self, frame):
        if self.flip:
            return np.flip(frame, 0)
        return frame

    def get_frame(self):
        frame = self.flip_if_needed(self.vs.read())
        ret, jpeg = cv.imencode(self.file_type, frame)
        self.previous_frame = jpeg
        return jpeg.tobytes()

    # Take a photo, called by camera button
    def take_picture(self, path): 
        frame = self.flip_if_needed(self.vs.read())
        path = path
        today_date = datetime.now().strftime("%d-%m-%Y_%H:%M:%S") # get current time
        file_name = str(self.photo_string + "_" + today_date + self.file_type)
        ret, image = cv.imencode(self.file_type, frame)
        cv.imwrite(os.path.join(path, file_name), frame) 
