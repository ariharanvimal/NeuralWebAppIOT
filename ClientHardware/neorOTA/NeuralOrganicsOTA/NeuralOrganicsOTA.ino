#if defined(ARDUINO_ESP8266_NODEMCU_ESP12)
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ESP8266HTTPClient.h>
#else
#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#endif
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <Arduino_JSON.h>
#include <PubSubClient.h>

#define STASSID "Ariharanext"
#define STAPSK "ariharan6497"

const char *ssid = STASSID;
const char *password = STAPSK;
String devName = "NEOR_TD_2_8266";
String serverName = "http://192.168.29.188:5000";
String mqttServer = "raspberrypi.local";
const int mqttPort = 1883;
String mqttTopic = "env";

String httpReqestString;
String responsedata;
String mqttpath, token;

// Initilize library fucntions
WiFiClient espClient;
PubSubClient client(espClient);

// void getDeviceDetails();

// calllback funtion to look for the incomming messages
void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  Serial.print("Message: ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

// function to reconnect id got disconnected
void reconnect() {
  if (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    if (client.connect("NodeMCU_Client")) {
      Serial.println("connected");
      subscribeTopic(mqttTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // delay(5000);
    }
  }
}
// setup function to run once
void setup() {
  Serial.begin(115200);
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }

  // Calls ota function
  neorOTA();

  client.setServer(mqttServer.c_str(), mqttPort);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Connected to MQTT");
    } else {
      Serial.print("MQTT connection failed, rc=");
      Serial.print(client.state());
      Serial.println(" Trying again in 5 seconds.");
      // delay(5000);
    }
    // Set up MQTT callback function
    client.setCallback(callback);
  }
  // getDeviceDetails();
}

void loop() {
  ArduinoOTA.handle();
  // reconnect on client disconnectd
  if (!client.connected()) {
    reconnect();
  }
  // client loop to sub and publish the data to the mqtt server
  client.loop();

  sendDataToMQTT();
  delay(5000);
}
// Set up Over The Air programming config
void neorOTA() {
  // Port defaults to 8266
  // ArduinoOTA.setPort(8266);

  // Hostname defaults to esp8266-[ChipID]
  ArduinoOTA.setHostname(devName.c_str());

  // No authentication by default
  // ArduinoOTA.setPassword("admin");

  // Password can be set with it's md5 value as well
  // MD5(admin) = 21232f297a57a5a743894a0e4a801fc3
  // ArduinoOTA.setPasswordHash("21232f297a57a5a743894a0e4a801fc3");

  // OTA on Start
  ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH) {
      type = "sketch";
    } else {  // U_FS
      type = "filesystem";
    }

    // NOTE: if updating FS this would be the place to unmount FS using FS.end()
    Serial.println("Start updating " + type);
  });
  // OTA on End
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  // OTA on progress
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  // OTA on error
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) {
      Serial.println("Auth Failed");
    } else if (error == OTA_BEGIN_ERROR) {
      Serial.println("Begin Failed");
    } else if (error == OTA_CONNECT_ERROR) {
      Serial.println("Connect Failed");
    } else if (error == OTA_RECEIVE_ERROR) {
      Serial.println("Receive Failed");
    } else if (error == OTA_END_ERROR) {
      Serial.println("End Failed");
    }
  });
  // OTA Begin
  ArduinoOTA.begin();
  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

// get device details from the server api
void getDeviceDetails() {
  httpReqestString = "{\"MAC\":\"" + String(WiFi.macAddress()) + "\"}";
  responsedata = sendDataToServer("/getdevicedetails", httpReqestString);
  JSONVar myObject = JSON.parse(responsedata);
  Serial.println(JSON.typeof(myObject));
  if (JSON.typeof(myObject) == "undefined") {
    Serial.println("Parsing input failed!");
    // return false;
  }
  Serial.print("JSON object = ");
  Serial.println(myObject);
  JSONVar keys = myObject.keys();
  String respdata[10];
  for (int i = 0; i < keys.length(); i++) {
    JSONVar value = myObject[keys[i]];
    respdata[i] = JSON.stringify(value);
    Serial.println(respdata[i]);
  }
  if (respdata[0].compareTo("Success")) {
    mqttpath = respdata[1];
    token = respdata[2];
    // return true;
  } else {
    Serial.println("Unknown device contact admin to register this device");
    // return false;
  }
}

// function to send the data to the server api
String sendDataToServer(String Api, String postData) {
  // Send an HTTP POST request every 10 seconds
  //  if ((millis() - lastTime) > timerDelay) {
  // Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    String address = serverName + Api;
    http.begin(client, address);
    http.addHeader("Content-Type", "application/json");
    //      String httpRequestData = "{\"temp\":\"" + String(getTemp()) + "\",\"hum\":\"" + String(getHum()) + "\"}";
    String httpRequestData = postData;
    int httpResponseCode = http.POST(httpRequestData);
    if (httpResponseCode > 0) {
      String payload = http.getString();
      return payload;
    }
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
  // lastTime = millis();
  // }
}

// function to send the Json data to mqtt server
void publishJsonData(String msg, String topic) {

  if (client.publish(topic.c_str(), msg.c_str())) {
    Serial.println("Message sent successfully");
  } else {
    Serial.println("Message failed to send");
  }
}

// function to subscribe the topics
void subscribeTopic(String topic) {
  client.subscribe(topic.c_str());
}

// sample testing data to server
void sendDataToMQTT() {
  String jsonMessage = "{\"temp\":" + String(getTemp()) + ", \"hum\":" + String(getHum()) + "}";
  publishJsonData(jsonMessage, "env");
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