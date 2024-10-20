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

int i;
unsigned long previousMillis = 0;

String dataOnA2 = "*ispbr3on_mcfault#";
String dataOnA3 = "*ispbr3on_fullwork#";
String dataOnA4 = "*ispbr3on_qualitycheck#";
String dataOnA5 = "*ispbr3on_qualitycheckmtc#";
String dataOffA2 = "*ispbr3off_mcfault#";
String dataOffA3 = "*ispbr3off_fullwork#";
String dataOffA4 = "*ispbr3off_qualitycheck#";
String dataOffA5 = "*ispbr3off_qualitycheckmtc#";


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
  display.println("OEE_Spam 1.0");
  display.display();
  dataIn="";
  delay(1100);
  digitalWrite(pinAndon, LOW);
  digitalWrite(pinAndon1, LOW);
}

void loop() {
    String data_send;
    unsigned long currentMillis = millis();
    int a2 = digitalRead(buttonPinA2);
    int a3 = digitalRead(buttonPinA3);
    int a4 = digitalRead(buttonPinA4);
    int a5 = digitalRead(buttonPinA5);

    data_send = "*^ispbr3^" + String(a2) + "^" + String(a3) + "^" + String(a4) + "^" + String(a5) + "^" + "^#";
    mySerialLora.print("\n");
    mySerialLora.print(data_send);
    mySerialLora.println("\n\n");

    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 10);
    display.println("Data : ");
    display.setCursor(10, 20);
    display.println(data_send);
    display.display();
    delay(1100);



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


        }if(dt[0] == "ispbr3_reset"){
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
        if (dt[0] == "iam72off_hoppernopart") {
            digitalWrite(pinAndon, HIGH);
            digitalWrite(pinAndon1, HIGH);
        } else if (dt[0] == "iam73off_hoppernopart") {
            digitalWrite(pinAndon, HIGH);
            digitalWrite(pinAndon1, HIGH);
        } else if (dt[0] == "iam80off_hoppernopart") {
            digitalWrite(pinAndon, HIGH);
            digitalWrite(pinAndon1, HIGH);
        } else {
            previousMillis = currentMillis;
        }
        delay(1100);
    }
    if(a3 == 0){
        digitalWrite(pinAndon1, LOW);
        digitalWrite(pinAndon, LOW);
        delay(1100);
    }
}


