// mở wed bằng file .ejs
var express = require('express');
var app = express();

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(__dirname+'/public'));//khai báo foder public
app.get('/',(req,res)=>{
    res.render('./pages/html');
});
///*
//tạo bảng dữ liệu cảm biến và nút nhấn ---start-----------------------
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ok123"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //xóa các mảng cũ
  
  var sql = "DROP TABLE sensor_tt";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("xóa mảng sensor_tt cũ thành công");
  }); 
  var sql = "DROP TABLE button_tt";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("xóa mảng button_tt cũ thành công");
  });
  
  // tạo bảng data cảm biến
  var sql = "CREATE TABLE sensor_tt (id int(10) auto_increment primary key, nhiet_do float(10),do_am float(10),khi_gas float(10),anh_sang float(10), time_x TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("tạo thành công table sensor_tt");
  });
  //tạo bảng data nút nhấn
  var sql = "CREATE TABLE button_tt (id int(10) auto_increment primary key,nut_id text,status text, time_x TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("tạo thành công table nút nhấn");
  });
 // */
});
//tạo bảng dữ liệu cảm biến và nút nhấn ---end-------------------------
//kết nối MQTT
var mqtt = require("mqtt");
var client = mqtt.connect('mqtt:radio.tinasoft.com.vn');

// Kiem tra ket noi với MQTT
client.on("connect",function(){
  console.log("mqtt connected")
  client.subscribe("sub_sever");
})
/////////////////////--------------
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8888);

//nhận tín hiệu từ MQTT
client.on("message",function(topic,message,h){
    const data     = JSON.parse(message)
    var tt_nut1    = data.TTnut1             
    var tt_nut2    = data.TTnut2
    var tt_nut3    = data.TTnut3
    var temp_data  = data.temperature.toFixed(2)
    var humi_data  = data.humidity.toFixed(2)
    var gas_data   = data.gas.toFixed(2)
    var light_data = data.light.toFixed(2)
    var lightx_data = Math.abs(4395-light_data);
    var sql = "insert into sensor_tt(nhiet_do,do_am,khi_gas,anh_sang) value ( "+temp_data+" , "+humi_data+" ,"+gas_data+","+light_data+")"
    con.query(sql,function(err,result){
        if (err) throw err
         console.log( " nd: "+temp_data+" da: "+humi_data+" gas: "+gas_data+" as: "+lightx_data+" ")
    }) 
    //truyền data lên web(js)
    io.emit("data_nd_x",temp_data)//truyền (topic,data)
    io.emit("data_da_x",humi_data)
    io.emit("data_kg_x",gas_data)
    io.emit("data_as_x",lightx_data)
    io.emit("anh_sang",tt_nut1)
    io.emit("dien_lanh",tt_nut2)
    io.emit("am_thanh",tt_nut3)
});
//nhận tín hiệu nút nhấn từ web
io.on("connection",function(socket){
  console.log('user ' + socket.id + " connected")
  socket.on("control_nut_1",function(state){// nhận 
    if(state == 0){
      //truyền tín hiệu xuống mqtt
      client.publish("anh_sang","0")
      //truyền data vào sql
      con.query("insert into button_tt(nut_id, status) value ( '1' , '0') " )
    }else{
      //truyền tín hiệu xuống mqtt
      client.publish("anh_sang","1")
      //truyền data vào sql
      con.query("insert into button_tt(nut_id, status) value ( '1' , '1') " )
    }
  })
  socket.on("control_nut_2",function(state2){
    if(state2 == 0){
      //truyền tín hiệu xuống mqtt
      client.publish("dien_lanh","0")
      //truyền data vào sql
      con.query("insert into button_tt(nut_id, status) value ( '2' , '0') ")
    }else{
      //truyền tín hiệu xuống mqtt
      client.publish("dien_lanh","1")
      //truyền data vào sql
      con.query("insert into button_tt(nut_id, status) value ( '2' , '1') ")
    }
  })
  socket.on("control_nut_3",function(state3){
    if(state3 == 0){
      //truyền tín hiệu xuống mqtt
      client.publish("am_thanh","0")
      //truyền data vào sql
      con.query("insert into button_tt(nut_id, status) value ( '3' , '0') " )
    }else{
      //truyền tín hiệu xuống mqtt
      client.publish("am_thanh","1")
      //truyền data vào sql
      con.query("insert into button_tt(nut_id, status) value ( '3' , '1') " )
    }
  })
});

    