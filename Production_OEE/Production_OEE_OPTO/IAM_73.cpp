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
const int buttonPinA13 = 25;

String dataOnA2 = "*iam73on_mcfault#";
String dataOnA3 = "*iam73on_fullwork#";
String dataOnA13 = "*iam73on_hoppernopart#";

String dataOffA2 = "*iam73off_mcfault#";
String dataOffA3 = "*iam73off_fullwork#";
String dataOffA13 = "*iam73off_hoppernopart#";

int buttonStateA2 = HIGH;
int buttonStateA3 = HIGH;
int buttonStateA13 = HIGH;

int lastButtonStateA2 = HIGH;
int lastButtonStateA3 = HIGH;
int lastButtonStateA13 = HIGH;

unsigned long lastDebounceTimeA2 = 0;
unsigned long lastDebounceTimeA3 = 0;
unsigned long lastDebounceTimeA13 = 0;
const unsigned long debounceDelay = 200; // 200 ms debounce delay

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
      if (buttonState == LOW) { // Button pressed
        delay(200);
        mySerialLora.println(dataOn);
        Serial.print(dataOn);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOn);
        display.display();
        delay(1100);
      } else if(buttonState == HIGH){ // Button released
        delay(200);
        mySerialLora.println(dataOff);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOff);
        display.display();
        delay(1100); // 1.1 seconds delay for display update
      }else { // Button released
        delay(200);
        mySerialLora.println(dataOff);
        Serial.print(dataOff);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOff);
        display.display();
        delay(1100);
      }
    }
  }
  lastButtonState = reading;
}

void setup() {
  Serial.begin(9600);
  mySerialLora.begin(9600);
  pinMode(buttonPinA2, INPUT_PULLUP);
  pinMode(buttonPinA3, INPUT_PULLUP);
  pinMode(buttonPinA13, INPUT_PULLUP);
  if (!display.begin(0x3C)) {
    while (true); // Halt if display initialization fails
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(20, 20);
  display.println("App Run!");
  display.setCursor(20, 40);
  display.println("OEE 1.0 TPS");
  display.display();
  delay(2000);
}

void loop() {

  checkButton(buttonPinA2, lastButtonStateA2, buttonStateA2, lastDebounceTimeA2, dataOnA2, dataOffA2);
  checkButton(buttonPinA3, lastButtonStateA3, buttonStateA3, lastDebounceTimeA3, dataOnA3, dataOffA3);
  checkButton(buttonPinA13, lastButtonStateA13, buttonStateA13, lastDebounceTimeA13, dataOnA13, dataOffA13);
  if(mySerialLora.available() > 1){
    String input = mySerialLora.readString();
    Serial.println(input);    
  }
  delay(1100);
}