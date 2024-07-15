#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#define SCREEN_WIDTH 128 // Lebar layar OLED, dalam piksel
#define SCREEN_HEIGHT 64 // Tinggi layar OLED, dalam piksel
#define OLED_RESET -1    // Pin reset OLED, -1 jika tidak dipakai
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
void setup() {
  Serial.begin(9600);


  if (!display.begin(0x3C)) { // Alamat I2C sesuaikan dengan OLED Anda
    Serial.println(F("OLED tidak terdeteksi!"));
    while (true); // Loop forever
  }
  delay(2000);
  display.clearDisplay();
  display.setTextSize(1); // Ukuran teks kecil
  display.setTextColor(SH110X_WHITE);
  display.setCursor(20, 20); // Posisi teks di tengah layar
  display.println("Selamat datang,");
  display.setCursor(20, 40);
  display.println("Tuanku");
  display.display(); // Tampilkan teks yang baru saja ditulis
}

void loop() {
  // Tidak ada perulangan pada loop untuk menjaga teks tetap diam
}
