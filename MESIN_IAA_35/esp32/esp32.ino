#include <SoftwareSerial.h>
#include <Wire.h>

const int CR_PIN_A2 = 14; // MC Fault
const int CR_PIN_A4 = 26; // QUALITY CHECK
const int CR_PIN_A5 = 25; // TOOL CHANGE
const int CR_PIN_A13 = 33; // ARM NO PART
const int CR_PIN_A14 = 32; // ROLLER NO PART
const int CR_PIN_A15 = 27; // PIN NO PART
//const int BUTTON_PIN = 35; // MC Fault


int lastStateA2 = LOW;
int currentStateA2;
int lastStateA4 = LOW;
int currentStateA4;
int lastStateA5 = LOW;
int currentStateA5;
int lastStateA13 = LOW;
int currentStateA13;
int lastStateA14 = LOW;
int currentStateA14;
int lastStateA15 = LOW;
int currentStateA15;


SoftwareSerial mySerial(16, 17);



void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  pinMode(CR_PIN_A2, INPUT_PULLUP);
  pinMode(CR_PIN_A4, INPUT_PULLUP);
  pinMode(CR_PIN_A5, INPUT_PULLUP);
  pinMode(CR_PIN_A13, INPUT_PULLUP);
  pinMode(CR_PIN_A14, INPUT_PULLUP);
  pinMode(CR_PIN_A15, INPUT_PULLUP);
}

void loop() {
  currentStateA2 = digitalRead(CR_PIN_A2);
  if (lastStateA2 == HIGH && currentStateA2 == LOW) {
    Serial.println("~signal^mc_fault^activated^#");
    mySerial.println("~signal^mc_fault^activated^#");
  } else if (lastStateA2 == LOW && currentStateA2 == HIGH) {
    Serial.println("~signal^mc_fault^deactivated^#");
    mySerial.println("~signal^mc_fault^deactivated^#");
  }
  lastStateA2 = currentStateA2;
  currentStateA4 = digitalRead(CR_PIN_A4);
  if (lastStateA4 == HIGH && currentStateA4 == LOW) {
    Serial.println("~signal^quality_check^activated^#");
    mySerial.println("~signal^quality_check^activated^#");
  } else if (lastStateA4 == LOW && currentStateA4 == HIGH) {
    Serial.println("~signal^quality_check^deactivated^#");
    mySerial.println("~signal^quality_check^deactivated^#");
  }
  lastStateA4 = currentStateA4;
  currentStateA5 = digitalRead(CR_PIN_A5);
  if (lastStateA5 == HIGH && currentStateA5 == LOW) {
    Serial.println("~signal^tool_change^activated^#");
    mySerial.println("~signal^tool_change^activated^#");
  } else if (lastStateA5 == LOW && currentStateA5 == HIGH) {
    Serial.println("~signal^tool_change^deactivated^#");
    mySerial.println("~signal^tool_change^deactivated^#");
  }
  lastStateA5 = currentStateA5;
  currentStateA13 = digitalRead(CR_PIN_A13);
  if (lastStateA13 == HIGH && currentStateA13 == LOW) {
    Serial.println("~signal^arm_no_parts^activated^#");
    mySerial.println("~signal^arm_no_parts^activated^#");
  } else if (lastStateA13 == LOW && currentStateA13 == HIGH) {
    Serial.println("~signal^arm_no_parts^deactivated^#");
    mySerial.println("~signal^arm_no_parts^deactivated^#");
  }
  lastStateA13 = currentStateA13;
  currentStateA14 = digitalRead(CR_PIN_A14);
  if (lastStateA14 == HIGH && currentStateA14 == LOW) {
    Serial.println("~signal^roller_no_parts^activated^#");
    mySerial.println("~signal^roller_no_parts^activated^#");
  } else if (lastStateA14 == LOW && currentStateA14 == HIGH) {
    Serial.println("~signal^roller_no_parts^deactivated^#");
    mySerial.println("~signal^roller_no_parts^deactivated^#");
  }
  lastStateA14 = currentStateA14;
  currentStateA15 = digitalRead(CR_PIN_A15);
  if (lastStateA15 == HIGH && currentStateA15 == LOW) {
    Serial.println("~signal^pin_no_parts^activated^#");
    mySerial.println("~signal^pin_no_parts^activated^#");
  } else if (lastStateA15 == LOW && currentStateA15 == HIGH) {
    Serial.println("~signal^pin_no_parts^deactivated^#");
    mySerial.println("~signal^pin_no_parts^deactivated^#");
  }
  lastStateA15 = currentStateA15;
  delay(50);
}
