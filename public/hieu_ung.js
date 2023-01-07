const socket = io('http://localhost:8888');
/*///khối kiểm soát đầu vào ra của nút nhấn------------start------------------------------*/
//---nền sáng tối--------------------------------------------
var checkbox_toggle_body = document.getElementById('light-dark');
checkbox_toggle_body.addEventListener('change',function(){
    document.body.classList.toggle('dark');
});
//------------------------------------------======================-công tắc chiếu sáng-
//KIỂM SOÁT HIỆU ỨNG HÌNH ẢNH công tắc đèn TRÊN WEB-----------------start
var stt_nut1=0;
socket.on("anh_sang",function(data_received){
    stt_nut1=data_received;
    if(data_received == 1){
        document.getElementById('switch_chieu_sang').checked =true
        document.getElementById('style_img_chieu_sang').classList.add('change_c_s');
    } else{  
        document.getElementById('switch_chieu_sang').checked = false
        document.getElementById('style_img_chieu_sang').classList.remove('change_c_s');
    };
})
//KIỂM SOÁT HIỆU ỨNG HÌNH ẢNH công tắc đèn TRÊN WEB-----------------end 
var checkbox_chieu_sang=document.getElementById('switch_chieu_sang');
checkbox_chieu_sang.addEventListener('change', function(){
      if (checkbox_chieu_sang.checked==true) {
        if(confirm("Bật Đèn nhé!!!")){
            socket.emit("control_nut_1","1")
        } else {
            checkbox_chieu_sang.checked=false;
        }  
      }else{
        if(confirm("Tắt Đèn nhé!!!")){
            socket.emit("control_nut_1","0")
        } else {
            checkbox_chieu_sang.checked=true;
        }  
      }}  
)
//------------------------------------------======================-công tắc điện lạnh
//KIỂM SOÁT HIỆU ỨNG HÌNH ẢNH công tắc quạt TRÊN WEB-----------------start
var stt_nut2 =0;
socket.on("dien_lanh",function(data_received){
    stt_nut2 = data_received;
    if(data_received == 1){
      document.getElementById('switch_dien_lanh').checked =true
      document.getElementById('style_img_dien_lanh').classList.add('change_d_l');
    } else{
      document.getElementById('switch_dien_lanh').checked = false
      document.getElementById('style_img_dien_lanh').classList.remove('change_d_l');
    };
})
//KIỂM SOÁT HIỆU ỨNG HÌNH ẢNH công tắc quạt TRÊN WEB-----------------end
var checkbox_dien_lanh=document.getElementById('switch_dien_lanh');
checkbox_dien_lanh.addEventListener('change', function(){
    if (checkbox_dien_lanh.checked==true) {
        if(confirm("Bật quạt nhé!!!")){
            socket.emit("control_nut_2","1")
        } else {
            checkbox_dien_lanh.checked=false;
        }  
      }else{
        if(confirm("Tắt quạt nhé!!!")){
            socket.emit("control_nut_2","0")
        } else {
            checkbox_dien_lanh.checked=true;
        }   
      }} 
);
//-----------------------------------------======================--công tắc âm thanh
//KIỂM SOÁT HIỆU ỨNG HÌNH ẢNH công tắc còi TRÊN WEB-----------------start
var stt_nut3 =0;
socket.on("am_thanh",function(data_received){
    stt_nut3=data_received;
    if(data_received == 1){
      document.getElementById('switch_am_thanh').checked =true
      document.getElementById('style_img_am_thanh').classList.add('change_a_t');
    } else{
      document.getElementById('switch_am_thanh').checked = false
      document.getElementById('style_img_am_thanh').classList.remove('change_a_t');
    };
})
//KIỂM SOÁT HIỆU ỨNG HÌNH ẢNH công tắc còi TRÊN WEB-----------------end
var checkbox_amthanh=document.getElementById('switch_am_thanh');
checkbox_amthanh.addEventListener('change', function(){
    if (checkbox_amthanh.checked==true) {
        if(confirm("Bật loa nhé !!!")){
            socket.emit("control_nut_3","1")
        } else {
            checkbox_amthanh.checked=false;
        }  
      }else{
        if(confirm("Tắt loa nhé !!!")){
            socket.emit("control_nut_3","0")
        } else {
            checkbox_amthanh.checked=true;
        }   
      }} 
);
//----------------------------------------======================-công tắc chống trộm
var checkbox_toggle_chongtrom = document.getElementById('switch_chong_trom');
checkbox_toggle_chongtrom.addEventListener('change',function(){
    
    if (checkbox_toggle_chongtrom.checked){
        if(confirm("Bạn chắc chắn muốn bật công tắc tổng chứ")){
            if(!stt_nut1){
                socket.emit("control_nut_1","1")
            }
            if(!stt_nut2){
                socket.emit("control_nut_2","1")
            }
            if(!stt_nut3){
                socket.emit("control_nut_3","1") 
            }
        } else {
            checkbox_toggle_chongtrom.checked=false;
        }  
    }else{
        if(confirm("Bạn chắc chắn muốn tắt công tắc tổng chứ")){
            if(stt_nut1){
                socket.emit("control_nut_1","0")
            }
            if(stt_nut2){
                socket.emit("control_nut_2","0")
            }
            if(stt_nut3){
                socket.emit("control_nut_3","0") 
            }
        } else {
            checkbox_toggle_chongtrom.checked=true;
        }   
    }
   // */
});
//công tắc định vị
var checkbox_toggle_dinhvi = document.getElementById('switch_dinh_vi');
checkbox_toggle_dinhvi.addEventListener('change',function(){
   // if(confirm("Bạn chắc chắn muốn bật-tắt định vị chứ") == true){
        document.getElementById('style_img_dinh_vi').classList.toggle('change_d_v');
  // }
    
});
/*////khối kiểm soát đầu vào ra của nút nhấn------------end--------------*/
// khối nhận data cảm biến-----start--------------------------
// chu kì lưu vào đồ thị
var T_graph = 1000; 
var T_sensor= 5000;
var data_nd;
var data_da;
var data_kg;
var data_as;
socket.on("data_nd_x",function(data_received){
data_nd = data_received;
//data_nd = Math.floor((Math.random()*150)+(Math.random()*-150))
document.getElementById("nd").innerHTML = data_nd + '&degC';
document.getElementById("nhiet_do").style.backgroundSize= "100% 100%";
//đổi màu nhiệt độ---------------------------------------------------
if( data_nd < -100 ){
    document.getElementById("nhiet_do").style.background=" linear-gradient(to bottom right,rgb(255, 255, 255),rgb(9, 174, 224))";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    document.getElementById("icon_nd_lv3").classList.add('icon_vt_son_l');
    document.getElementById("icon_nd_lv2").classList.add('icon_vt_son_l');
    document.getElementById("icon_nd_lv1").classList.add('icon_vt_son_l');
    //alert("Hôm nay nhiệt độ rất lạnh ,khi ra đường bạn nên mặc áo ấm!");
} else if( data_nd < -50 ){
    document.getElementById("nhiet_do").style.background=" linear-gradient(to bottom right,rgb(255, 255, 255),rgb(9, 174, 224))";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    document.getElementById("icon_nd_lv3").classList.add('icon_vt_son_l');
    document.getElementById("icon_nd_lv2").classList.add('icon_vt_son_l');
   // alert("Hôm nay nhiệt độ rất lạnh ,khi ra đường bạn nên mặc áo ấm!");
} else if( data_nd < 0 ){
    document.getElementById("nhiet_do").style.background=" linear-gradient(to bottom right,rgb(255, 255, 255),rgb(9, 174, 224))";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới 
    document.getElementById("icon_nd_lv3").classList.add('icon_vt_son_l');
   // alert("Hôm nay nhiệt độ lạnh ,khi ra đường bạn nên mặc áo ấm!");
} else if( data_nd < 10 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,rgb(192, 216, 216),rgb(79, 180, 226))";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    // alert("Hôm nay nhiệt độ khá lạnh ,khi ra đường bạn nên mặc áo ấm!");
} else if( data_nd < 25 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,rgb(71, 88, 247),rgb(0, 255, 234))";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
} else if( data_nd < 37 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,rgb(0, 255, 234),yellow)";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
} else if( data_nd < 43 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,red,yellow)";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
} else if( data_nd < 50 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,red,orange)";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    // alert("Hôm nay nhiệt độ khá nóng ,bạn nên mở điều hòa");
} else if( data_nd < 60 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,red,orange)";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    document.getElementById("icon_nd_lv3").classList.add('icon_vt_son_n');
    // alert("Hôm nay nhiệt độ khá lạnh ,khi ra đường bạn nên mặc áo ấm!");
} else if( data_nd < 80 ){
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,red,orange)";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    document.getElementById("icon_nd_lv3").classList.add('icon_vt_son_n');
    document.getElementById("icon_nd_lv2").classList.add('icon_vt_son_n');
    // alert("Hôm nay nhiệt độ khá lạnh ,khi ra đường bạn nên mặc áo ấm!");
} else{
    document.getElementById("nhiet_do").style.background="linear-gradient(to bottom right,red,orange)";
    //tìm vị trí lớp cũ cần xóa
    var classold_1 = document.getElementById("icon_nd_lv1").classList.item(0);
    var classold_2 = document.getElementById("icon_nd_lv2").classList.item(0);
    var classold_3 = document.getElementById("icon_nd_lv3").classList.item(0);
    //xóa lớp cũ
    document.getElementById("icon_nd_lv3").classList.remove(classold_3);
    document.getElementById("icon_nd_lv2").classList.remove(classold_2);
    document.getElementById("icon_nd_lv1").classList.remove(classold_1);
    // thêm lớp mới
    document.getElementById("icon_nd_lv3").classList.add('icon_vt_son_n');
    document.getElementById("icon_nd_lv2").classList.add('icon_vt_son_n');
    document.getElementById("icon_nd_lv1").classList.add('icon_vt_son_n');
    // alert("Hôm nay nhiệt độ khá lạnh ,khi ra đường bạn nên mặc áo ấm!");
}
})
// =============================================================TB--start
/*
var load_nd_low=0;
var load_nd_high= setInterval(fsload_nd_high,1000);
function fsload_nd_high(){
    if(data_nd>25 && !stt_nut2){
        if(confirm("nóng quá bật quạt nhé.") ){
            socket.emit("control_nut_2","1")
            document.getElementById('style_img_dien_lanh').classList.add('change_d_l');  
            clearInterval(load_nd_high);//không cho phép hoạt động load_nd
            load_nd_low=setInterval(fsload_nd_low,1000);
        }else{
            clearInterval(load_nd_high);
            load_nd_low=setInterval(fsload_nd_low,1000);
        }
    }
};
function fsload_nd_low(){
    if(data_nd <=25 && stt_nut2){
        if(confirm("mát rồi tắt quạt nhé !!!") ){
            socket.emit("control_nut_2","0")
            document.getElementById('style_img_dien_lanh').classList.remove('change_d_l');
            clearInterval(load_nd_low);
            load_nd_high= setInterval(fsload_nd_high,1000);
        }else{
            clearInterval(load_nd_low);
            load_nd_high= setInterval(fsload_nd_high,1000); 
        }
    }
}
//*/
// =============================================================TB----end
//---------------------------------------------------------------ĐỘ ẨM
socket.on("data_da_x",function(data_received){
data_da=data_received;
//data_da=Math.floor((Math.random()*100))
document.getElementById('da').innerHTML =data_da + '%';
document.getElementById("do_am").style.backgroundSize= "100% 100%";
if( data_da < 10 ){
     //xóa lớp cũ
    document.getElementById("icon_da_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.remove('icon_vt_son');
    //nền
    document.getElementById("do_am").style.backgroundImage="url('./img/drought-2080964_960_720.jpg')";
    // đổi màu chữ
    document.getElementById("do_am").style.color="white";
} else if( data_da < 15 ){
    //xóa lớp cũ
    document.getElementById("icon_da_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.remove('icon_vt_son');
    //nền
    document.getElementById("do_am").style.backgroundImage="url('./img/drought-2080964_960_720.jpg')";
    //đổi màu chữ
    document.getElementById("do_am").style.color="white";
} else if( data_da < 30 ){
    //xóa lớp cũ
    document.getElementById("icon_da_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.remove('icon_vt_son');   
    document.getElementById("do_am").style.backgroundImage="url('./img/drought-2080964_960_720.jpg')";
    //đổi màu chữ
    document.getElementById("do_am").style.color="white";
} else if( data_da < 40 ){
    //xóa lớp cũ
    document.getElementById("icon_da_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.remove('icon_vt_son');
    //nền    
    document.getElementById("do_am").style.background="linear-gradient(to bottom right,rgb(233, 104, 18),rgb(241, 219, 19))";
    document.getElementById("do_am").style.color="black";
} else if( data_da < 70 ){
    //xóa lớp cũ
    document.getElementById("icon_da_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.remove('icon_vt_son');
    //nền
    document.getElementById("do_am").style.background="linear-gradient(to bottom right,rgb(233, 133, 18),rgb(185, 223, 218))";
    document.getElementById("do_am").style.color="black";
} else if( data_da < 80 ){
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.remove('icon_vt_son');
    //nền
    document.getElementById("do_am").style.backgroundImage="url('./img/am_ươt.jpg')";
    //thêm lớp mới
    document.getElementById("icon_da_lv1").classList.add('icon_vt_son');
    document.getElementById("do_am").style.color="black";
} else if( data_da < 90 ){
    //xóa lớp cũ
    document.getElementById("icon_da_lv3").classList.remove('icon_vt_son');
    //nền
    document.getElementById("do_am").style.backgroundImage="url('./img/am_ươt.jpg')";
    //thêm lớp mới
    document.getElementById("icon_da_lv2").classList.add('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.add('icon_vt_son');
    document.getElementById("do_am").style.color="black";
} else{
    document.getElementById("do_am").style.backgroundImage="url('./img/am_ươt.jpg')";
    //thêm lớp mới
    document.getElementById("icon_da_lv3").classList.add('icon_vt_son');
    document.getElementById("icon_da_lv2").classList.add('icon_vt_son');
    document.getElementById("icon_da_lv1").classList.add('icon_vt_son');
    document.getElementById("do_am").style.color="black";
}
})
// =============================================================TB--start
/*
var load_da_low=0;
var load_da_high= setInterval(fsload_da_high,1000);
function fsload_da_high(){
    if(data_da>57){
        if(confirm("ẩm thấp quá")){
            socket.emit("control_nut_2","1");
            clearInterval(load_da_high);//xóa vòng lặp kiểm tra mức cao
            load_da_low = setInterval(fsload_da_low,1000);//bật vòng lặp kiểm tra mức thấp
        }else{
            clearInterval(load_da_high);
            load_da_low = setInterval(fsload_da_low,1000);
        }
    }
};
function fsload_da_low(){
    if(data_da <=57){
        if(confirm("hanh khô quá!!!")){
            socket.emit("control_nut_2","0")
            clearInterval(load_da_low);//xóa vòng lặp kiểm tra mức thấp
            load_da_high = setInterval(fsload_da_high,1000);//bật vòng lặp kiểm tra mức cao
        }else{
            clearInterval(load_da_low);
            load_da_high = setInterval(fsload_da_high,1000); 
        }
    }
}
//*/
// =============================================================TB----end
function loat_lai_tt(){
//---------------------------------------------------------------KHÍ GAS
//socket.on("data_kg_x",function(data_received){
//data_kg=data_received;
data_kg=Math.floor((Math.random()*4500))
document.getElementById('kg').innerHTML =data_kg + '*';
document.getElementById("khi_ga").style.backgroundSize= "100% 100%";
if( data_kg < 400 ){
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv1").classList.remove('icon_vt_son'); 
    //nền   
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,rgb(138, 252, 103),rgb(193, 245, 188))";
} else if( data_kg < 600 ){
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv1").classList.remove('icon_vt_son');
    //nền
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,rgb(138, 252, 103),rgb(193, 245, 188))";
} else if( data_kg < 1000 ){
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv1").classList.remove('icon_vt_son');
    //nền
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,lime,rgb(138, 252, 103))";
} else if( data_kg < 2000 ){
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,green,lime)";
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv1").classList.remove('icon_vt_son');
} else if( data_kg < 3000 ){
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.remove('icon_vt_son');
    //nền
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,#224422,green)";
    //thêm lớp mới
    document.getElementById("icon_kg_lv1").classList.toggle('icon_vt_son');
} else if( data_kg < 4000 ){
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,#224422,green)";
    //xóa lớp cũ
    document.getElementById("icon_kg_lv3").classList.remove('icon_vt_son');
    //thêm lớp mới
    document.getElementById("icon_kg_lv2").classList.toggle('icon_vt_son');
    document.getElementById("icon_kg_lv1").classList.toggle('icon_vt_son');

} else{
    document.getElementById("khi_ga").style.background="linear-gradient(to bottom right,#224422,green)";
    //thêm lớp mới
    document.getElementById("icon_kg_lv3").classList.add('icon_vt_son');
    document.getElementById("icon_kg_lv2").classList.add('icon_vt_son');
    document.getElementById("icon_kg_lv1").classList.add('icon_vt_son');
}
//})
// =============================================================TB--start
/*
var checkkg_1 = true;
var checkkg_0 = true;
var load_kg_low=0;
var load_kg_high= setInterval(fsload_kg_high,1000);
function fsload_kg_high(){
    if(data_kg>1000 && checkkg_1){
        if(confirm("trong phòng có khí gas bật quạt và cảnh báo nhé nhé!!!")){
            socket.emit("control_nut_2","1");
            socket.emit("control_nut_3","1"); 
        }else{
            checkkg_1 = false;
        }
        checkkg_0 = true;
    }
    clearInterval(load_kg_high);//xóa vòng lặp kiểm tra mức cao
    load_kg_low = setInterval(fsload_kg_low,1000);//bật vòng lặp kiểm tra mức thấp
};
function fsload_kg_low(){
    if(data_kg<=1000 && checkkg_0){
        if(confirm("khí gas đã trong mức an toàn ,tắt quạt và cảnh báo nhé")){
            socket.emit("control_nut_2","0");
            socket.emit("control_nut_3","0")
        }else{
            checkkg_0=false;
        }
        checkkg_1=true;
    }
    clearInterval(load_kg_low);//xóa vòng lặp kiểm tra mức thấp
    load_kg_high = setInterval(fsload_kg_high,1000);//bật vòng lặp kiểm tra mức cao
}
//*/
// =============================================================TB----end
//---------------------------------------------------------------ÁNH SÁNG
//socket.on("data_as_x",function(data_received){
   // data_as=data_received;
data_as=Math.floor((Math.random()*4000))
document.getElementById('as').innerHTML =data_as + ' lux';
document.getElementById("anh_sang").style.backgroundSize= "100% 100%";
if(data_as < 5 ){
    //xóa lớp cũ
    document.getElementById("icon_as_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv1").classList.remove('icon_vt_son'); 
    //nền   
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(0, 0, 0))";
} else if( data_as < 800 ){
    //xóa lớp cũ
    document.getElementById("icon_as_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv1").classList.remove('icon_vt_son'); 
    //nền
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(10, 10, 10))";
} else if( data_as < 1000 ){
    //xóa lớp cũ
    document.getElementById("icon_as_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv1").classList.remove('icon_vt_son'); 
    //nền
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(40, 40, 40))";
} else if( data_as < 1500 ){
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(223, 243, 40))";
    //xóa lớp cũ
    document.getElementById("icon_as_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv2").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv1").classList.remove('icon_vt_son'); 
} else if( data_as < 3000 ){
    //xóa lớp cũ
    document.getElementById("icon_as_lv3").classList.remove('icon_vt_son');
    document.getElementById("icon_as_lv2").classList.remove('icon_vt_son');
    //nền
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(223, 243, 40))";
    //thêm lớp mới
    document.getElementById("icon_as_lv1").classList.toggle('icon_vt_son');
} else if( data_as < 4095 ){
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(223, 243, 40))";
    //xóa lớp cũ
    document.getElementById("icon_as_lv3").classList.remove('icon_vt_son');
    //thêm lớp mới
    document.getElementById("icon_as_lv2").classList.toggle('icon_vt_son');
    document.getElementById("icon_as_lv1").classList.toggle('icon_vt_son');

} else{
    document.getElementById("anh_sang").style.background="linear-gradient(to bottom right,#eeeb4c,rgb(223, 243, 40))";
    //thêm lớp mới
    document.getElementById("icon_as_lv3").classList.add('icon_vt_son');
    document.getElementById("icon_as_lv2").classList.add('icon_vt_son');
    document.getElementById("icon_as_lv1").classList.add('icon_vt_son');
}
//})
}
setInterval(loat_lai_tt,T_sensor);//hàm loat lại
// =============================================================TB--start
var enable_2 = setInterval(timeas2,1000);;
var enable_1 = 0;
var as_low = 800;
var as_high = 2200;
function timeas1(){
    if(data_as>as_high && stt_nut1==1){
        //sáng rồi mà đèn vẫn sáng thì hỏi tắt 
       // if(confirm("Sáng rồi tắt đèn nhé !!!")){
            socket.emit("control_nut_1","0");
        //}
        clearInterval(enable_1);
        enable_2 = setInterval(timeas2, 1000);

    }else if(data_as>as_high && stt_nut1==0){
        //sáng rồi mà đèn tắt rồi thì không cần hỏi
        clearInterval(enable_1);
        enable_2 = setInterval(timeas2, 1000);
    }else if(data_as< as_low && stt_nut1==0){
        //tối rồi mà đèn chưa bật thì cần thông báo
       // if(confirm("Tối rồi bật đèn nhé !!!")){
            socket.emit("control_nut_1","1");
       // }
        clearInterval(enable_1);
        enable_2 = setInterval(timeas2, 1000);

    }else if(data_as<as_low && stt_nut1==1){
        //tối rồi mà đèn đã bật thì không cần thông báo
        clearInterval(enable_1);
        enable_2 = setInterval(timeas2, 1000);
    }
};
function timeas2(){
    if(data_as>=as_low && data_as<=as_high){
        clearInterval(enable_2);
        enable_1 = setInterval(timeas1, 1000); 
    }  
};
//*/
// =============================================================TB----end
//khối random thông số cảm biến---end------------------------------
//--khối đồ thị--------start--------------------------------------
Highcharts.chart('container_spline', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 20,
        backgroundColor: '#fff',

        events: {
            load: function () {
                // set up the updating of the chart each second
                var series_nd = this.series[0];
                var series_da = this.series[1];
                var series_kg = this.series[2];
                var series_as = this.series[3];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y0 = Math.round(data_nd); 
                        y1 = Math.round(data_da);
                        y2 = Math.round(data_kg);
                        y3 = Math.round(data_as);
                    series_nd.addPoint([x, y0], true, true),
                    series_da.addPoint([x, y1], true, true),
                    series_kg.addPoint([x, y2], true, true),
                    series_as.addPoint([x, y3], true, true);//chú ý dấu ; và dấu,
                }, T_graph);
            }
        }
    },
    //thời gian thực
    time: {
        useUTC: false
    },
    //tiêu đề
    title: {
        text: 'dữ liệu thu thập từ cảm biến',
        style: {
            color: '#000'
        }
    },
    subtitle: {
        text: 'dữ liệu được cập nhật sau mỗi'+ T_graph/1000 +'s'
    },
    tooltip: {
        style: {
            color: '#fff'
        }
    },
    colors: ['#e62f0f', '#09a6ee', '#20b612','#eeeb4c'],
    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 100

    },
    yAxis: {
        title: {
            text: 'data'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        },{
            value: 0,
            width: 1,
            color: '#808080'
        },{
            value: 0,
            width: 1,
            color: '#808080'
        },{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    //
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },
    //chú thích
    legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 10
    },
    // xem full màn hình
    exporting: {
        enabled: true
    },
    series: [
    {
        name: 'nhiệt độ',
        data: (function () {
            // generate an array of random data
            var data_1 = [],time_1 = (new Date()).getTime(),i;
            for (i = -19; i <= 0; i += 1) {
                data_1.push({
                    x: time_1 + i * T_graph,
                    y: 0
                });
            }
            return data_1;
        }())
    },{
        name: 'độ ẩm,',
        data: (function () {
            // generate an array of random data
            var data_2 = [],time_2 = (new Date()).getTime(),i;
            for (i = -19; i <= 0; i += 1) {
                data_2.push({
                    x: time_2 + i * T_graph,
                    y: 0
                });
            }
            return data_2;
        }())
    },{
        name: 'Khí gas',
        data: (function () {
            // generate an array of random data
            var data_3 = [],time_3 = (new Date()).getTime(),i;
            for (i = -19; i <= 0; i += 1) {
                data_3.push({
                    x: time_3 + i * T_graph,
                    y: 0
                });
            }
            return data_3;
        }())
    },{
        name: 'ánh sáng',
        data: (function () {
            // generate an array of random data
            var data_4 = [],time_4 = (new Date()).getTime(),i;
            for (i = -19; i <= 0; i += 1) {
                data_4.push({
                    x: time_4 + i * T_graph,
                    y: 0
                });
            }
            return data_4;
        }())
    }]
}); 
//--khối đồ thị--------end--------------------------------------
//--Đồng hồ-----------------------start------------------------
 function getNow() {
    var now = new Date();

    return {
        hours: now.getHours() + now.getMinutes() / 60,
        minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
        seconds: now.getSeconds() * 12 / 60
    };
}
function pad(number, length) {
    // Create an array of the remaining length + 1 and join it with 0's
    return new Array((length || 2) + 1 - String(number).length).join(0) + number;
}
var now = getNow();
// Create the chart
Highcharts.chart('container_clock', {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 10,
        plotShadow: false,
        height: '70%'
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    pane: {
        background: [{
            // default background
        }, {
            // reflex for supported browsers
            backgroundColor: Highcharts.svg ? {
                radialGradient: {
                    cx: 0.5,
                    cy: -0.4,
                    r: 1.9
                },
                stops: [
                    [0.5, 'rgba(255, 255, 255, 0.2)'],
                    [0.5, 'rgba(200, 200, 200, 0.2)']
                ]
            } : null
        }]
    },
    yAxis: {
        labels: {
            distance: -20
        },
        min: 0,
        max: 12,
        lineWidth: 1,//độ lớn vòng bo xung quanh đồng hồ
        showFirstLabel: false,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 5,
        minorTickPosition: 'inside',
        minorGridLineWidth: 10,
        minorTickColor: '#000',

        tickInterval: 1,
        tickWidth: 3,
        tickPosition: 'inside',
        tickLength: 8,
        tickColor: '#666',
        title: {
            text: 'R time',
            style: {
                color: '#555',
                fontWeight: 'normal',
                fontSize: '8px',
                lineHeight: '10px'
            },
            y: 20
        }
    },

    tooltip: {
        formatter: function () {
            return this.series.chart.tooltipText;
        }
    },
    exporting: {
        enabled: false
    },
    series: [{
        data: [{
            id: 'hour',
            y: now.hours,
            dial: {
                radius: '60%',//độ dài kim giờ
                baseWidth: 4,
                baseLength: '95%',
                rearLength: 0
            }
        }, {
            id: 'minute',
            y: now.minutes,
            dial: {
                radius: '80%',//độ dài kim phút
                baseLength: '95%',
                rearLength: 0
            }
        }, {
            id: 'second',
            y: now.seconds,
            dial: {
                radius: '100%',//độ dài kim giây
                baseWidth: 1,//độ rộng kim giây
                rearLength: '20%'
            }
        }],
        animation: false,
        dataLabels: {
            enabled: false
        }
    }]
},

// Move
function (chart) {
    setInterval(function () {

        now = getNow();

        if (chart.axes) { // not destroyed
            var hour = chart.get('hour'),
                minute = chart.get('minute'),
                second = chart.get('second'),
                // run animation unless we're wrapping around from 59 to 0
                animation = now.seconds === 0 ?
                    false : {
                        easing: 'easeOutBounce'
                    };

            // Cache the tooltip text
            chart.tooltipText =
                    pad(Math.floor(now.hours), 2) + ':' +
                    pad(Math.floor(now.minutes * 5), 2) + ':' +
                    pad(now.seconds * 5, 2);


            hour.update(now.hours, true, animation);
            minute.update(now.minutes, true, animation);
            second.update(now.seconds, true, animation);
        }

    }, 1000);

});
Math.easeOutBounce = function (pos) {
    if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
    }
    if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
    }
    if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    }
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
};
//load lai trang web
function tai_lai_trang(){
    location.reload();
}
/*function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);",timeoutPeriod);}
        window.onload = timedRefresh(1000);
*/
//--khối back-top------------------------------------start------
//--khối back-top------------------------------------end--------