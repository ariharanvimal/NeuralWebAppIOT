#include <WiFi.h>
#include <PubSubClient.h>

// Replace these with your network and MQTT broker details
const char* ssid = "Ariharanext";
const char* password = "ariharan6497";
const char* mqttServer = "192.168.29.188";
const int mqttPort = 1883;
const char* mqttTopic = "env";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi");
  
  client.setServer(mqttServer, mqttPort);
  
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Connected to MQTT");
    } else {
      Serial.print("MQTT connection failed, rc=");
      Serial.print(client.state());
      Serial.println(" Trying again in 5 seconds.");
      delay(5000);
    }
  }
}

void loop() {
  // Create a JSON message
  String jsonMessage = "{\"temp\":"+String(getTemp())+", \"hum\":"+String(getHum())+"}";
  
  // Publish the JSON message to the MQTT topic
  if (client.publish(mqttTopic, jsonMessage.c_str())) {
    Serial.println("Message sent successfully");
  } else {
    Serial.println("Message failed to send");
  }
  
  client.loop();
  delay(5000);  // Publish data every 5 seconds
}

//water temperature
float getTemp() {
  float temp = random(32, 50);
  return temp;
}
//env humidity
float getHum() {
  float hum = random(25, 80);
  return hum;
}
