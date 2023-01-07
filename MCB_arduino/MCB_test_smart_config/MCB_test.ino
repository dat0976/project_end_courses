#include <DHT.h>
#include <WiFi.h>
#include <Wire.h>
#include <PubSubClient.h>
#include <Arduino_JSON.h>

// hot and topic-----------------------------start
//const char* mqtt_server ="net-radio.vov.link";
const char* mqtt_server ="radio.tinasoft.com.vn";//thầy uy
#define MQTT_PORT 1883
// hot and topic-------------------------------end

// #define MQTT_USER "NDDAT"
// #define MQTT_PASSWORD "0936160136"
#define topic_sub1 "anh_sang"// đèn
#define topic_sub2 "dien_lanh"// đèn
#define topic_sub3 "am_thanh"// quạt

#define COI_PIN 14
#define QUAT_PIN 23
#define LED_PIN 2
#define DHT_PIN 19
#define DHT_TYPE DHT11
#define GAS_PIN 35
#define AS_PIN 34

WiFiClient wifiClient;
PubSubClient client(wifiClient);
DHT dht(DHT_PIN, DHT_TYPE);//khai báo loại CẢM BIẾN NHIỆT ĐỘ 

void setup_wifi() {
  WiFi.mode(WIFI_AP_STA);
  /* start SmartConfig */
  WiFi.beginSmartConfig();
  /* Wait for SmartConfig packet from mobile */
  Serial.println("Waiting for SmartConfig.");
  while (!WiFi.smartConfigDone()) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("SmartConfig done.");
  /* Wait for WiFi to connect to AP */
  Serial.println("Waiting for WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi Connected.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}
void connect_to_broker() {
  while (!client.connected()) {//kiểm tra xem dữ liệu đã được kết nối chưa
    Serial.print("Attempting MQTT connection...");
    String clientId = "nodeWiFi32";
    clientId += String(random(0xffff), HEX);//tạo 1 địa chỉ ngâu nhiên
    if (client.connect(clientId.c_str()/*,MQTT_USER, MQTT_PASSWORD*/)) {// kiểm tra xem đường kết nối có đúng hay không (mật khẩu và user)
      Serial.print("MQTT connection sucessfully...");
      client.subscribe(topic_sub1);//kết nối thành công các cảm biến và thiết bị
      client.subscribe(topic_sub2);
      client.subscribe(topic_sub3);
    } else {
      Serial.print("failed, rc=");// kết nối thất bại
      Serial.print(client.state());
      Serial.println(" try again in 1 seconds");
      delay(1000);
    }
  }
}
void callback(char* topic, byte* payload, unsigned int length) {// lấy các dữ liệu gửi về từ MQTT giống hàm ngắt uart trong stm32
  Serial.println("-------new message from broker-----");
  Serial.print("topic: ");
  Serial.print(topic);
  Serial.println();
  Serial.print("message: ");
  Serial.write(payload, length);
  Serial.println();
  //kiem tra topic 
  if (strstr(topic,topic_sub1)){// lệnh strstr là tìm kiếm trong mảng topic có mảng sub1 hay không
    for (int i = 0; i < length; i++) {//
      Serial.print((char)payload[i]);
    }// bật tắt đèn 
    Serial.println();
    if ((char)payload[0] == '0'){
      digitalWrite(LED_PIN,LOW);// tắt led
    } else {
      digitalWrite(LED_PIN,HIGH);// bật led
    }    
  } 
  if (strstr(topic,topic_sub2)){
    for (int i = 0; i < length; i++) {
      Serial.print((char)payload[i]);
    }
    Serial.println();
    // bật tắt quạt
    if ((char)payload[0] == '0') {
      digitalWrite(QUAT_PIN, LOW);   // tắt quạt
    } else {
      digitalWrite(QUAT_PIN, HIGH);  // bật quạt
    }
  }
  if (strstr(topic,topic_sub3)){
    for (int i = 0; i < length; i++) {
      Serial.print((char)payload[i]);
    }
    Serial.println();
    // bật tắt thiết bị âm thanh
    if ((char)payload[0] == '0') {
      digitalWrite(COI_PIN, LOW);   // tắt thiết bị âm thanh
    }else{
      digitalWrite(COI_PIN, HIGH);  // bật thiết bị âm thanh
    }
  }
}
void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, MQTT_PORT);
  client.setCallback(callback);
  connect_to_broker();
  dht.begin();
  pinMode(LED_PIN, OUTPUT);// thiết lập chế độ chân đầu ra cho pin LED
  pinMode(QUAT_PIN, OUTPUT);   // thiết lập chế độ chân đầu ra cho pin QUAT
  pinMode(COI_PIN, OUTPUT);// thiết lập chế độ chân đầu ra cho pin Coi
  pinMode(DHT_PIN, INPUT);//thiết lập chân chế độ  đầu vào cho pin dht
  pinMode(GAS_PIN, INPUT);//thiết lập chân chế độ  đầu vào cho pin khi_gas 
  pinMode(AS_PIN, INPUT);//thiết lập chân chế độ  đầu vào cho pin anh_sang 
}
JSONVar data;       //lưu trữ giá trị cảm biến dưới dạng json
void loop() {
  client.loop();
  if (!client.connected()) {
    connect_to_broker();
  }
  int tt_nut1 = digitalRead(LED_PIN);//đọc giá trị các nút nhấn được gửi về từ web
  int tt_nut2 = digitalRead(QUAT_PIN);//đọc giá trị các nút nhấn được gửi về từ web
  int tt_nut3 = digitalRead(COI_PIN);//đọc giá trị các nút nhấn được gửi về từ web
  float nd_data = dht.readTemperature();// đọc dữ liệu các cảm biến và lưu vào các biến
  float da_data = dht.readHumidity();
  float as_data = analogRead(AS_PIN);
  float gas_data = analogRead(GAS_PIN);
  if (isnan(nd_data) || isnan(da_data)) {
  Serial.println(F("Failed to read from DHT sensor!"));//giống print nhưng thêm 1 dấu xuống dòng.
  return;
  }else{
    data["temperature"] = nd_data;
    data["humidity"]    = da_data;
  }
    data["light"]       = as_data;
    data["gas"]         = gas_data;
    data["TTnut1"]      = tt_nut1;
    data["TTnut2"]      = tt_nut2;
    data["TTnut3"]      = tt_nut3;
  Serial.printf("nhiet do: %f do am: %f khi gas: %f anh sang: %f\n", nd_data,da_data,gas_data,as_data);
  String jsonString = JSON.stringify(data);
  client.publish("sub_sever", jsonString.c_str());
  delay(1000);
}
