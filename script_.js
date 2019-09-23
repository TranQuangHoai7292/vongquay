  new WOW().init();
  var name = '';
  var phone = '';
  var cmnd = '';
  var email = '';
  var luotquay = 0;
  if($.cookie('luotquay')!=undefined){
    luotquay = parseInt($.cookie('luotquay'));
  }

  var currentdate = new Date();
  var date = currentdate.getDate();

  $(document).ready(function($) {

    var shareemail = getUrlParameter('shareemail');
  if(shareemail!=undefined && shareemail!='' && isEmail(shareemail)){ // Nhận link chia sẻ, gửi mail cho người chia sẻ kèm mã +3 lượt chơi.

    $.ajax({
      dataType: "html",
      type: "POST",
      evalScripts: true,
      url: "//api.ihappy.vn/sendMail",
      data: ({to:shareemail,subject:'Bạn được thêm 3 lần chơi Vòng quay SUMMER SLAM',url:window.location.hostname,html:'<p>Xin chào, bạn đã được thêm 3 lần chơi<br>Vòng quay Summer Slam trong ngày hôm nay</p><p>Vui lòng <a href="https://summerslam.tnl-lease.vn?them=3luotchoi&t='+date+'" target="_blank"><u><i>click vào đây<i></u></a> để nhận ngay 3 lượt chơi.</p>'}),
      success: function(){}
    });
    window.location.href = '/';
  }

  var them = getUrlParameter('them');
  var dateurl = getUrlParameter('t');
  console.log(them,dateurl,date);
  if(them == '3luotchoi' && date==dateurl){ // Bấm link thêm +3 lượt chơi.
    luotquay+=3;
    $.cookie('luotquay', luotquay, { expires: 1, path: '/' });
    window.location.href = '/';
  }

  if($.cookie('name') != undefined){$('.name').val($.cookie('name')); name = $.cookie('name');}
  if($.cookie('phone') != undefined){$('.phone').val($.cookie('phone')); phone = $.cookie('phone');}
  if($.cookie('cmnd') != undefined){$('.cmnd').val($.cookie('cmnd')); cmnd = $.cookie('cmnd');}
  if($.cookie('email') != undefined){$('.email').val($.cookie('email')); email = $.cookie('email');}

  $('form').on('click', '.btn-send-mail', function(event) {
    event.preventDefault();
    var form = $(this).parents('form');
    name=form.find('.name').val();
    phone=form.find('.phone').val();
    cmnd=form.find('.cmnd').val();
    email=form.find('.email').val();
    if(name!=undefined && (name=='' || name==null)){
      alert('Vui lòng điền tên của bạn!'); return;
    } else if(phone!=undefined && (phone=='' || phone==null)){
      alert('Vui lòng điền số điện thoại của bạn!'); return;
    } else if(phone!=undefined && !isPhone(phone)){
      alert('Vui lòng kiểm tra lại số điện thoại, có thể bạn điền chưa đúng!'); return;
    } else if(cmnd!=undefined && (cmnd=='' || cmnd==null)){
      alert('Vui lòng điền số chứng minh thư/thẻ căn cước của bạn!'); return;
      // } else if(email!=undefined && (email=='' || email==null)){
      // alert('Vui lòng điền địa chỉ email của bạn!'); return;
    } else if(email!=undefined && email!='' && email!=null && !isEmail(email)){
      alert('Vui lòng kiểm tra lại địa chỉ email, có thể bạn điền chưa đúng!'); return;
    }

    $(this).text('Đang gửi...');

    var element = form.data('element');
    var data = form.serializeArray();
    var json_data = JSON.stringify(data);
    var device = (isMobile())?'Điện thoại':'Máy tính';
    var utm = getUrlParameter('utm_source');
    var action = $(this).data('action');

    if($.cookie('dadangky')==undefined){ // Chưa đăng ký
      $.cookie('name', name, { expires: 30, path: '/' });
      $.cookie('phone', phone, { expires: 30, path: '/' });
      $.cookie('cmnd', cmnd, { expires: 30, path: '/' });
      $.cookie('email', email, { expires: 30, path: '/' });
      luotquay += 2;
      $.cookie('luotquay', luotquay, { expires: 1, path: '/' });
    }

    $.ajax({
      dataType: "html",
      type: "POST",
      evalScripts: true,
      url: '',
      data: ({device:device, utm:utm, action:action, json_data:json_data}),
      success: function(){
        // alert('Cảm ơn bạn, chúng tôi sẽ liên hệ lại ngay khi nhận được thông tin!');
        form.find('.thanhcong').show();
        form.find('.form-group').hide();
        setTimeout(function(){
          // $('#modalForm').modal('hide');
          if($.cookie('dadangky')==undefined){ // Chưa đăng ký
            $.cookie('dadangky', 1, { expires: 1, path: '/' });
            window.location.reload();
          }
        },1000);
      }
    });

    // $.ajax({
    //   dataType: "html",
    //   type: "POST",
    //   evalScripts: true,
    //   url: "//api.ihappy.vn/sendMail",
    //   data: ({to:'quyenclt1@tnrholdings.vn',url:window.location.hostname,json_data:json_data}),
    //   success: function(){}
    // });
  });
});
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function isPhone(phone) {
    var isnum = /^\d+$/.test(phone);
    if(isnum){
      return (phone.match(/\d/g).length===10 || phone.match(/\d/g).length===11);
    }
    return false;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var prices = [
{ code:'547-Sony', name: 'Loa Bluetooth Sony' },
{ code:'334-California', name: 'Voucher miễn phí sử dụng trong 14 ngày tại California Yoga & Fitness' },
{ code:'553-Lotte', name: 'Vé xem phim miễn phí tại Lotte Cinema' },
{ code:'677-KemFanny', name: 'Voucher trị giá 100.000đ sử dụng tại hệ thống kem Fanny' },
{ code:'421-Buffet', name: 'Vé Le Buffet de FANNY trị giá 250.000đ' },
{ code:'854-Samsung', name: 'Máy nghe nhạc Samsung IconX' },
{ code:'557-Waynes', name: 'Voucher mua 1 tặng 1 tại Waynes Coffee (áp dụng với sản phẩm Organic)' },
{ code:'235-Mayman', name: 'May mắn lần sau!' },
{ code:'898-KimPhuc', name: 'Gift Card trị giá 100.000đ sử dụng tại Kim Phúc Food' },
{ code:'236-Starbucks', name: 'Gift Card trị giá 100.000đ mua hàng tại Starbucks' }
];

var options = {};
options.prices = prices;
options.clockWise = true; // hướng quay theo chiều kim đồng hồ
options.duration = 5000; // thời gian xoay
options.separation = 10; // khoảng cách giữa các giải thưởng trên vòng quay (pixel)

$(function() {
  var $r = $('.vong-quay-vongquay').fortune(options);
if($.cookie('dadangky')==undefined){ // Chưa đăng ký
  $('.btn-quay').on('click', function() {
    $('#modalForm').modal('show');
  });
  $('.btn-chiase').on('click', function(){
    $('#modalForm').modal('show');
  });
}else{ // đã đăng ký
  $('.luotquay').text(luotquay+' lượt');

  $('.btn-chiase').on('click', function(){
    var win = window.open('//www.facebook.com/sharer.php?u=https://summerslam.tnl-lease.vn?shareemail='+email, '_blank');
    if (win) {
      win.focus();
    } else {
      alert('Vui lòng cho phép cửa sở bật lên!');
    }
  });

  if(luotquay<=0){
    $('.btn-quay').addClass('inactive');
  }

  var giaithuong = 7;
  var clickHandler = function() {
    console.log('click'); 
    if(luotquay<=0){
      $('.btn-quay').addClass('inactive');
    }else{
      luotquay-=1;
      $.cookie('luotquay', luotquay, { expires: 1, path: '/' });
      $('.luotquay').text(luotquay+' lượt');
      $('.btn-quay').off('click');
      $('.btn-quay').addClass('inactive');
      
      var d = Math.random()*100;
      console.log(d); 
      if       (d < 0.00){ //giaithuong = 0;
      } else if(d < 13.66){ //giaithuong = 1;
      } else if(d < 24.59){ //giaithuong = 2;
      } else if(d < 25.14){ //giaithuong = 3;
      } else if(d < 25.68){ //giaithuong = 4;
      } else if(d < 25.68){ //giaithuong = 5;
      } else if(d < 87.98){ //giaithuong = 6;
      } else if(d < 87.98){ //giaithuong = 7;
      } else if(d < 92.35){ //giaithuong = 8;
      } else if(d < 100.00){ //giaithuong = 9;
      } else {giaithuong = 7;}

      $r.spin(giaithuong).done(function(price) {
        if(luotquay>0){
          $('.btn-quay').removeClass('inactive');
        }
        console.log(price.name);
        if(price.name!='May mắn lần sau!'){
          $('.trunggiai').html(price.name);
          $('#modalTrung').modal('show');
          $('.giaithuongdatduoc').val('['+price.code+'] '+price.name);
          $('.subject').val('SUMMER SLAM - Số CMND '+cmnd+' đã trúng giải');
          $('#modalForm').find('.btn-send-mail').data('action',price.name).trigger('click');

          // $.ajax({
          //   dataType: "html",
          //   type: "POST",
          //   evalScripts: true,
          //   url: "//api.ihappy.vn/sendMail",
          //   data: ({to:email,subject:'Chúc mừng bạn đã trúng giải Vòng quay SUMMER SLAM',url:window.location.hostname,html:'<p>Xin chào, chúc mừng bạn đã trúng giải</p><p><b> '+ price.name +'</b></p><p>trong trò chơi Vòng quay SUMMER SLAM</p><p>Bạn vui lòng mang theo CMND/Thẻ căn cước công dân số '+cmnd+' đến TNL Plaza – The GoldView – 346 Bến Vân Đồn, phường 1, quận 4, TP HCM vào ngày 30/04/2019 để nhận quà trúng thưởng</p><p>Bạn có thể <a href="https://summerslam.tnl-lease.vn" target="_blank"><u><i>click vào đây<i></u></a> để tiếp tục chơi và nhận thêm nhiều phần quà hấp dẫn.</p>'}),
          //   success: function(){}
          // });
        }
        $('.btn-quay').on('click', clickHandler);
      });
    }
  }

  $('.btn-quay').on('click', clickHandler); 
}
});