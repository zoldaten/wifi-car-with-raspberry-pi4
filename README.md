## If venv (virutal envierement) is not installed.
```Bash
sudo apt install python3.10-venv
```
## if just cloned make an virtual envierament
`````Bash
python3 -m venv ./flask-env

`````````
## start virtual envierement.
```bash
source flask-env/bin/activate
```
## then install dependencies
````Bash
pip install -r requirements.txt
``````
To deactivate type 

```bash
deactivate
```
## Start the server with debug mode set to True
```bash
python3 flask-ard-car.py
```
## To update requirements.txt type this
```Bash
pip freeze > requirements.txt
```
## Conection frontend to backend
* Using ajax and javascript to send data on every button click or keystroke press.
* Keystrokes(wasd and arrows, space or escape for stop) P.S speed up and down not implemnted yet
* 
## Future fix of delay from frontend
Use socket.io and get bi-direcation connection to the server. This way sending data will be 
very low latency.  
