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
const int buttonPinA4 = 25;
const int buttonPinA5 = 26;
const int pinAndon = 27;
const int pinAndon1 = 14;

String dataOnA2 = "*ispbr3on_mcfault#";
String dataOnA3 = "*ispbr3on_fullwork#";
String dataOnA4 = "*ispbr3on_qualitycheck#";
String dataOnA5 = "*ispbr3on_qualitycheckmtc#";

String dataOffA2 = "*ispbr3off_mcfault#";
String dataOffA3 = "*ispbr3off_fullwork#";
String dataOffA4 = "*ispbr3off_qualitycheck#";
String dataOffA5 = "*ispbr3off_qualitycheckmtc#";

int buttonStateA2 = HIGH;
int buttonStateA3 = HIGH;
int buttonStateA4 = HIGH;
int buttonStateA5 = HIGH;

int lastButtonStateA2 = HIGH;
int lastButtonStateA3 = HIGH;
int lastButtonStateA4 = HIGH;
int lastButtonStateA5 = HIGH;

unsigned long lastDebounceTimeA2 = 0;
unsigned long lastDebounceTimeA3 = 0;
unsigned long lastDebounceTimeA4 = 0;
unsigned long lastDebounceTimeA5 = 0;


const unsigned long debounceDelay = 200; // 200 ms debounce delay
unsigned long previousMillis = 0;
const long delayDuration = 200; // 3 detik
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
                if(dataOn == "*ispbr3on_fullwork#"){
                    digitalWrite(pinAndon1, LOW);
                    digitalWrite(pinAndon, LOW);
                }
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
  pinMode(buttonPinA4, INPUT_PULLUP);
  pinMode(buttonPinA5, INPUT_PULLUP);
  pinMode(pinAndon, OUTPUT);
  pinMode(pinAndon1, OUTPUT);
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
  digitalWrite(pinAndon, LOW);
  digitalWrite(pinAndon1, LOW);
}

void loop() {
    int readingA3 = digitalRead(buttonPinA3);
    unsigned long currentMillis = millis();
    checkButton(buttonPinA2, lastButtonStateA2, buttonStateA2, lastDebounceTimeA2, dataOnA2, dataOffA2);
    checkButton(buttonPinA3, lastButtonStateA3, buttonStateA3, lastDebounceTimeA3, dataOnA3, dataOffA3);
    checkButton(buttonPinA4, lastButtonStateA4, buttonStateA4, lastDebounceTimeA4, dataOnA4, dataOffA4);
    checkButton(buttonPinA5, lastButtonStateA5, buttonStateA5, lastDebounceTimeA5, dataOnA5, dataOffA5);
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

        if(dt[0] == "ispbr3"){
            int a2 = digitalRead(buttonPinA2);
            int a3 = digitalRead(buttonPinA3);
            int a4 = digitalRead(buttonPinA4);
            int a5 = digitalRead(buttonPinA5);
            data_send = "*;ispbr3;" + String(a2) + ";" + String(a3) + ";" + String(a4) + ";" + String(a5) + ";#";
            mySerialLora.print("\n");
            mySerialLora.print(data_send);
            mySerialLora.println("\n\n");
            delay(1100);
        }else if (dt[0] == "iam72off_hoppernopart") {
            digitalWrite(pinAndon, HIGH);
            digitalWrite(pinAndon1, HIGH);
        } else if (dt[0] == "iam73off_hoppernopart") {
            digitalWrite(pinAndon, HIGH);
            digitalWrite(pinAndon1, HIGH);
        } else if (dt[0] == "iam80off_hoppernopart") {
            digitalWrite(pinAndon, HIGH);
            digitalWrite(pinAndon1, HIGH);
        }else if(dt[0] == "ispbr3_reset"){
            delay(1000);
            ESP.restart();
        } else {
            previousMillis = currentMillis;
        }
        
    }
    dataIn="";
    delay(1100);
}


