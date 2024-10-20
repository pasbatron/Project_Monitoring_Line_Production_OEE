#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

const int buttonPinA2 = 32;
const int buttonPinA3 = 33;
const int buttonPinA13 = 27;

String dataOnA2 = "*iam80on_mcfault#";
String dataOnA3 = "*iam80on_fullwork#";
String dataOnA13 = "*iam80on_hoppernopart#";
String dataOffA2 = "*iam80off_mcfault#";
String dataOffA3 = "*iam80off_fullwork#";
String dataOffA13 = "*iam80off_hoppernopart#";

int buttonStateA2 = HIGH;
int buttonStateA3 = HIGH;
int buttonStateA13 = HIGH;
int lastButtonStateA2 = HIGH;
int lastButtonStateA3 = HIGH;
int lastButtonStateA13 = HIGH;

unsigned long lastDebounceTimeA2 = 0;
unsigned long lastDebounceTimeA3 = 0;
unsigned long lastDebounceTimeA13 = 0;
const unsigned long debounceDelay = 500;
int i;

String dataIn;
String dt[10];
boolean parsing=false;
SoftwareSerial mySerialLora(16, 17); // TX, RX
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void checkButton(int buttonPin, int &lastButtonState, int &buttonState, unsigned long &lastDebounceTime, String dataOn, String dataOff) {
  int reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == LOW) {
        delay(200);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOn);
        display.display();
        mySerialLora.print("\n");
        mySerialLora.println(dataOn);
        mySerialLora.print("\n\n");
        delay(1100);
      }else if(buttonState == HIGH) {
        delay(200);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOff);
        display.display();
        mySerialLora.print("\n");
        mySerialLora.println(dataOff);
        mySerialLora.print("\n\n");
        delay(1100);
      }else {
        delay(200);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOff);
        display.display();
        mySerialLora.print("\n");
        mySerialLora.println(dataOff);
        mySerialLora.print("\n\n");
        delay(1100);
      }
    }
  }
  lastButtonState = reading;
}

void setup() {
  mySerialLora.begin(115200);
  pinMode(buttonPinA2, INPUT_PULLUP);
  pinMode(buttonPinA3, INPUT_PULLUP);
  pinMode(buttonPinA13, INPUT_PULLUP);
  if (!display.begin(0x3C)) {
    while (true);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(20, 20);
  display.println("App Run!");
  display.setCursor(20, 40);
  display.println("OEE 1.0 TPS");
  display.display();
  dataIn="";
  delay(1000);
}

void loop() {

  checkButton(buttonPinA2, lastButtonStateA2, buttonStateA2, lastDebounceTimeA2, dataOnA2, dataOffA2);
  checkButton(buttonPinA3, lastButtonStateA3, buttonStateA3, lastDebounceTimeA3, dataOnA3, dataOffA3);
  checkButton(buttonPinA13, lastButtonStateA13, buttonStateA13, lastDebounceTimeA13, dataOnA13, dataOffA13);
  
  if(mySerialLora.available() > 1){
    String data_send;
    String dataIn = mySerialLora.readString();
    int j=0;
    dt[j]="";

    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 10);
    display.println("Data : ");
    display.setCursor(10, 20);
    display.println(dataIn);
    display.display();
    for(i=1;i<dataIn.length();i++){
      if ((dataIn[i] == ';') || (dataIn[i] == ',')){
        j++;
        dt[j]="";
      }else{
        dt[j] = dt[j] + dataIn[i];
      }
    }
    if(dt[0] == "iam80"){
      int a2 = digitalRead(buttonPinA2);
      int a3 = digitalRead(buttonPinA3);
      int a13 = digitalRead(buttonPinA13);
      data_send = "*;iam80;" + String(a2) + ";" + String(a3) + ";" + String(a13) + ";#";
      mySerialLora.print("\n");
      mySerialLora.print(data_send);
      mySerialLora.println("\n\n");
      delay(1100);
    }if(dt[0] == "iam80_reset"){
      delay(1000);
      ESP.restart();
    }
    dataIn="";
  }
  delay(1100);
}


