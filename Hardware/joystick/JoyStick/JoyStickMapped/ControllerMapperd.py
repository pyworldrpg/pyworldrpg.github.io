import serial
import pydirectinput

arduino = serial.Serial('COM6', 115200, timeout=.1)     #serial input from arduino. change COM port to wherever your arduino is connected

pydirectinput.PAUSE = 0

keysDown = {}   #list of currently pressed keys


def keyDown(key):               #what to do if key pressed. takes value from handleJoyStickAsArrowKeys
    keysDown[key] = True        #adds key to KeysDown list
    pydirectinput.keyDown(key)  #runs pydirectinput using key from (argument)
    #print('Down: ', key)       #remove '#' from print to test data stream


def keyUp(key):                     #what to do if key released. takes value from handleJoyStickAsArrowKeys
    if key in keysDown:
        del (keysDown[key])         #remove key from KeysDown
        pydirectinput.keyUp(key)    #runs pydirectinput using key from (argument)
        #print('Up: ', key)         #remove '#' from print to test data stream


def handleJoyStickAsArrowKeys(state, button):      #note that the x and y directions are swapped due to the way I orient my thumbstick
    if 'UP' in state:          #0 is up on joystick
        keyDown('w')   #add up key to keyDown (argument)
        keyUp('a')
        keyUp('s')
        keyUp('d')
    elif'DOWN' in state:        #2 is down on joystick
        keyDown('s')
        keyUp('w')
        keyUp('a')
        keyUp('d')
    elif'RIGHT' in state:        #2 is down on joystick
        keyDown('d')
        keyUp('w')
        keyUp('a')
        keyUp('s')
    elif'LEFT' in state:        #2 is down on joystick
        keyDown('a')
        keyUp('w')
        keyUp('s')
        keyUp('d')
    else:               #1 is neutral on joystick
        keyUp('w')
        keyUp('a')
        keyUp('s')
        keyUp('d')

    if button == True:          #z argument is JSButton in this case. 1 is button pressed
        keyDown('i')    #key to be pressed with Joystick button. Change to any key
    else:
        keyUp('i')      #0 is button not pressed


while True:
    rawdata = arduino.readline()         
    data = str(rawdata.decode('utf-8'))  
    if data.startswith("S"):             
        state = (data)  
        if '1' in data:
            JSButton = True
        else:
            JSButton = False
        # JSButton = (data[len(data) - 1])          
        #print(dx, dy, JSButton)        
        handleJoyStickAsArrowKeys(state, JSButton)  
