const int JoyStick_pin = 8; //plug Joystick 'Button' into pin 8
const int X_pin = A0;       //plug joystick X direction into pin A0
const int Y_pin = A1;       //plug joystick Y direction into pin A1
int xc;
int yc;
int JSButton;

void setup() {
//  for (int i = 0; i < 2; i++) {
//    pinMode(JoyStick_pin, INPUT);
//  }
//  
  pinMode(JoyStick_pin, INPUT_PULLUP); 
  Serial.begin(115200);
}

void loop() {
  int x = analogRead(X_pin);  //read x direction value and -517 to bring back to around 0
  int y = analogRead(Y_pin);  //read y direction value and -512 to bring back to around 0
  int buttonStates = digitalRead(JoyStick_pin);

  if (x == 0) {         //joystick has off set of +/-8 so this negates that
    xc = 0;             //turn analogue value into integer. 0, 1 or 2 depending on state
    yc = 1;
    if(buttonStates == 1){
      Serial.print("SUP0\n");
    } else {
      Serial.print("SUP1\n");
    }
  } else if (x == 1023) {
    xc = 0;             //turn analogue value into integer. 0, 1 or 2 depending on state
    yc = -1;
    if(buttonStates == 1){
      Serial.print("SDOWN0\n");
    } else {
      Serial.print("SDOWN1\n");
    }
  } else if (y == 0) {
    xc = 1;
    yc = 0;
    if(buttonStates == 1){
      Serial.print("SRIGHT0\n");
    } else {
      Serial.print("SRIGHT1\n");
    }
  } else if (y == 1023) {
    xc = -1;
    yc = 0;
    if(buttonStates == 1){
      Serial.print("SLEFT0\n");
    } else {
      Serial.print("SLEFT1\n");
    }
  } else {
    xc = 0;
    yc = 0;
    if(buttonStates == 1){
      Serial.print("SREST0\n");
    } else {
      Serial.print("SREST1\n");
    }
  }
  
  

//  buttonStates |= ((digitalRead(JoyStick_pin) == LOW) ? 1 : 0) << 0;
  

//  Serial.print("S");
//  Serial.print(xc);
//  Serial.print(",");
//  Serial.print(yc);
//  Serial.print(",");
//  Serial.println(buttonStates);

  delay(40);

}
