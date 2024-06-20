#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define condition_machine_fault 14
#define condition_machine_quality_check 27
#define condition_machine_change_tools 26
#define condition_material_roller 25
#define condition_material_pin 33
#define condition_material_arm 32
#define LED 2
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64


int lastStates[] = {LOW, LOW, LOW, LOW, LOW, LOW};  
int currentStates[] = {0, 0, 0, 0, 0, 0}; 

SoftwareSerial mySerial(16, 17);
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  pinMode(condition_machine_fault, INPUT_PULLUP);
  pinMode(condition_machine_quality_check, INPUT_PULLUP);
  pinMode(condition_machine_change_tools, INPUT_PULLUP);
  pinMode(condition_material_roller, INPUT_PULLUP);
  pinMode(condition_material_pin, INPUT_PULLUP);
  pinMode(condition_material_arm, INPUT_PULLUP);
  pinMode(LED, OUTPUT);

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
}

void handleInput(int inputPin, int index) {
  currentStates[index] = digitalRead(inputPin);
  if (lastStates[index] == HIGH && currentStates[index] == LOW) {

    if (index == 0 || index == 1 || index == 2) {
      digitalWrite(LED, HIGH);
      Serial.print(";Lampu-signal:^");
      Serial.print(index == 0? "machine-fault" : (index == 1? "change-tools" : "quality-check"));
      Serial.println("^is^activated;");

      mySerial.print(";Lampu-signal:^");
      mySerial.print(index == 0? "machine-fault" : (index == 1? "change-tools" : "quality-check"));
      mySerial.println("^is^activated;");


      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 10);
      display.print(";Lampu-signal:^");
      display.print(index == 0? "machine-fault" : (index == 1? "change-tools" : "quality-check"));
      display.println("^is^activated;");
      display.display();

    }
    if (index == 3 || index == 4 || index == 5) {
      digitalWrite(LED, HIGH);
      Serial.print(";Material-signal:^");
      Serial.print(index == 3? "Roller" : (index == 4? "Pin" : "Arm"));
      Serial.println("^is^activated;");

      mySerial.print(";Material-signal:^");
      mySerial.print(index == 3? "Roller" : (index == 4? "Pin" : "Arm"));
      mySerial.println("^is^activated;");

      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 10);
      display.print(";Material-signal:^");
      display.print(index == 3? "Roller" : (index == 4? "Pin" : "Arm"));
      display.println("^is^activated;");       
      display.display();



    }
  } else if (lastStates[index] == LOW && currentStates[index] == HIGH) {

    if (index == 0 || index == 1 || index == 2) {
      digitalWrite(LED, LOW);
      Serial.print(";Lampu-signal:^");
      Serial.print(index == 0? "machine-fault" : (index == 1? "change-tools" : "quality-check"));
      Serial.println("^is^deactivated");

      mySerial.print(";Lampu-signal:^");
      mySerial.print(index == 0? "machine-fault" : (index == 1? "change-tools" : "quality-check"));
      mySerial.println("^is^deactivated;");


      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 10);
      display.print(";Lampu-signal:^");
      display.print(index == 0? "machine-fault" : (index == 1? "change-tools" : "quality-check"));
      display.println("^is^deactivated;");
      display.display();

    }



    if (index == 3 || index == 4 || index == 5) {
      digitalWrite(LED, LOW);
      Serial.print(";Material-signal:^");
      Serial.print(index == 3? "Roller" : (index == 4? "Pin" : "Arm"));
      Serial.println("^is^deactivated;");

      mySerial.print(";Material-signal:^");
      mySerial.print(index == 3? "Roller" : (index == 4? "Pin" : "Arm"));
      mySerial.println("^is^deactivated;");

      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 10);
      display.print(";Material-signal:^");
      display.print(index == 3? "Roller" : (index == 4? "Pin" : "Arm"));
      display.println("^is^deactivated;");
      display.display();

    }
  }
  lastStates[index] = currentStates[index];
}



void loop() {
  handleInput(condition_machine_fault, 0);
  handleInput(condition_machine_quality_check, 1);
  handleInput(condition_machine_change_tools, 2);
  handleInput(condition_material_roller, 3);
  handleInput(condition_material_pin, 4);
  handleInput(condition_material_arm, 5);
  delay(50);
}
