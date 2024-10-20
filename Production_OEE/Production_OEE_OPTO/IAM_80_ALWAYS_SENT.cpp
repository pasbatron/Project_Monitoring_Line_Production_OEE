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
int i;

String dataOnA2 = "*iam80on_mcfault#";
String dataOnA3 = "*iam80on_fullwork#";
String dataOnA13 = "*iam80on_hoppernopart#";
String dataOffA2 = "*iam80off_mcfault#";
String dataOffA3 = "*iam80off_fullwork#";
String dataOffA13 = "*iam80off_hoppernopart#";


String dataIn;
String dt[10];
SoftwareSerial mySerialLora(16, 17); // TX, RX
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

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
  display.println("OEE_Spam 1.0");
  display.display();
  dataIn="";
  delay(1100);
}

void loop() {
    String data_send;
    int a2 = digitalRead(buttonPinA2);
    int a3 = digitalRead(buttonPinA3);
    int a13 = digitalRead(buttonPinA13);
    data_send = "*^iam80^" + String(a2) + "^" + String(a3) + "^" + String(a13) + "^#";
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
        }if(dt[0] == "iam80_reset"){
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


