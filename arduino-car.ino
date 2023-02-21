int ENA = 9;
int IN1 = 2;
int IN2 = 3;
int IN3 = 4;
int IN4 = 5;
int ENB = 10;

void setup() {
  // put your setup code here, to run once:
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  Serial.begin(9600);
}


void loop() {

   if (Serial.available() > 0)
   {
    char is_byte = Serial.read();
    switch(is_byte){
      case '1':
        Serial.println("forward");
        analogWrite(ENA, 255);
        analogWrite(ENB, 255);
        
        digitalWrite(IN1, HIGH);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, HIGH);
        digitalWrite(IN4, LOW);
        delay(100);
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, LOW);
        break;
      case '2':
        Serial.println("back");
        analogWrite(ENA, 255);
        analogWrite(ENB, 255);
        
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, HIGH);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, HIGH);
        delay(100);
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, LOW);
        break;
      //... fortsätt att lägga till case med den CHAR som ska vara kommadot. sen avsluta med en break. samma princip som massa if else
     case '3':
        Serial.println("stop");
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, LOW);
        break;
      case '5':
        Serial.println("right");
        analogWrite(ENA, 255);
        analogWrite(ENB, 255);
        digitalWrite(IN1, HIGH);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, HIGH);
        delay(100);
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, LOW);        
        break;
      case '4':
        Serial.println("left");
        analogWrite(ENA, 255);
        analogWrite(ENB, 255);
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, HIGH);
        digitalWrite(IN3, HIGH);
        digitalWrite(IN4, LOW);
        delay(100);
        digitalWrite(IN1, LOW);
        digitalWrite(IN2, LOW);
        digitalWrite(IN3, LOW);
        digitalWrite(IN4, LOW);
        break;
      case '6':
        for (int i = 0; i < 256; i++) {
        analogWrite(ENA, i);
        analogWrite(ENB, i);
        }
      
      case '7':
        for (int i = 255; i >= 0; --i) {
        analogWrite(ENA, i);
        analogWrite(ENB, i);
        }
    }
  }
}