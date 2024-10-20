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
const int buttonPinA13 = 27;
const int buttonPinA14 = 14;
const int buttonPinA15 = 12;
int i;

String dataOnA2 = "*iaa36on_mcfault#";
String dataOnA3 = "*iaa36on_fullwork#";
String dataOnA4 = "*iaa36on_qualitycheck#";
String dataOnA5 = "*iaa36on_toolchange#";
String dataOnA13 = "*iaa36on_arm#";
String dataOnA14 = "*iaa36on_roller#";
String dataOnA15 = "*iaa36on_pin#";
String dataOffA2 = "*iaa36off_mcfault#";
String dataOffA3 = "*iaa36off_fullwork#";
String dataOffA4 = "*iaa36off_qualitycheck#";
String dataOffA5 = "*iaa36off_toolchange#";
String dataOffA13 = "*iaa36off_arm#";
String dataOffA14 = "*iaa36off_roller#";
String dataOffA15 = "*iaa36off_pin#";

String dataIn;
String dt[10];
SoftwareSerial mySerialLora(16, 17); // TX, RX
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  mySerialLora.begin(115200);
  pinMode(buttonPinA2, INPUT_PULLUP);
  pinMode(buttonPinA3, INPUT_PULLUP);
  pinMode(buttonPinA4, INPUT_PULLUP);
  pinMode(buttonPinA5, INPUT_PULLUP);
  pinMode(buttonPinA13, INPUT_PULLUP);
  pinMode(buttonPinA14, INPUT_PULLUP);
  pinMode(buttonPinA15, INPUT_PULLUP);
  if (!display.begin(0x3C)) {
    while (true);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(20, 20);
  display.println("App Run!");
  display.setCursor(20, 40);
  display.println("OEE_Spam 1.0");
  display.display();
  dataIn="";
  delay(1100);
}

void loop() {
    String data_send;
    int a2 = digitalRead(buttonPinA2);
    int a3 = digitalRead(buttonPinA3);
    int a4 = digitalRead(buttonPinA4);
    int a5 = digitalRead(buttonPinA5);
    int a13 = digitalRead(buttonPinA13);
    int a14 = digitalRead(buttonPinA14);
    int a15 = digitalRead(buttonPinA15);
    data_send = "*^iaa36^" + String(a2) + "^" + String(a3) + "^" + String(a4) + "^" + String(a5) + "^" + String(a13) + "^" + String(a14) + "^" + String(a15) + "^#";
    mySerialLora.print("\n");
    mySerialLora.print(data_send);
    mySerialLora.println("\n\n");

    if(mySerialLora.available() > 1){
        String dataIn = mySerialLora.readString();
        int j=0;
        dt[j]="";
        for(i=1;i<dataIn.length();i++){
            if ((dataIn[i] == ';') || (dataIn[i] == ',')){
                j++;
                dt[j]="";
            }else{
                dt[j] = dt[j] + dataIn[i];
            }
        }if(dt[0] == "iaa36_reset"){
            delay(1100);
            ESP.restart();
        }

        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(0, 10);
        display.println("Data : ");
        display.setCursor(10, 20);
        display.println(data_send);
        display.display();
        dataIn="";
    }

    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 10);
    display.println("Data : ");
    display.setCursor(10, 20);
    display.println(data_send);
    display.display();
    delay(1100);
}
