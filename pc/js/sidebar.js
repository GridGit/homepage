// 电话
$(".telephoneNumber").blur(function(){
  if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test($('.telephoneNumber').val()) &&  !(/^1[34578]\d{9}$/.test($('.telephoneNumber').val()))){
  	$('.telephoneNumber').css('border-color', 'red');
  	$('.telephoneNumber').attr('placeholder', '请输入正确的联系方式') 
  }
});

console.log($('.telephoneNumber'))

$('.telephoneNumber').focus(function(){
	$('.telephoneNumber').css('border-color', '#cccccc');
	$('.telephoneNumber').attr('placeholder', '请输入您的手机号') 
})

$('.requirement_description').blur(function(){
	if($('.requirement_description').val() == ''){
		$('.requirement_description').css('border-color', 'red');		
	}
});

$('.requirement_description').focus(function(){
	$('.requirement_description').css('border-color', '#cccccc');
})


$(function(){
	// 移入
	$('.sidebar').on('mouseenter', '.sidebar-item', function(e){
		var index = $(this).prevAll().length;
		$(this).children('.sidebar-image').slideUp();

		$(this).children('.sidebar-text').slideDown();
		if(index == 1){
			$('.phone-num').fadeIn();
		}	
	});
	// 移出
	$('.sidebar').on('mouseleave', '.sidebar-item', function(e){
		var index = $(this).prevAll().length;
		$(this).children('.sidebar-image').slideDown();
		$(this).children('.sidebar-text').slideUp();
		if(index == 1){
			$('.phone-num').fadeOut();
		}	
	});
	// 点击
	$('.sidebar').on('click', '.sidebar-item' ,function(e){
		var index = $(this).prevAll().length
		if(index == 0){
			window.open("http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODE5NjczMF80NzcxODFfNDAwMDAwNzE5MF8yXw");
			return
		}
		if(index == 1){
			window.location.href = "http://www.longmaosoft.com/contact.html#2";
			return;
		}
		if(index == 2){
			$('.shade').css('display', 'block');
			return
		}
		if(index == 3){
			window.scrollTo(0, 0);
			return
		}
	})
	// 遮罩层
	$('.shade').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		return;
	});
	// 需求提交
	$('.panel_submit').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		
		var Requirement = AV.Object.extend('Requirement');
		if($('.requirement_description').val() == ''){
			alert('请填写您的需求描述')

			return;
		}

	
		if($('#telephoneNumber').val() == ''){
			alert('请填写您的手机号码')
			return;
		}else if($('#telephoneNumber').css('border-color') == 'rgb(255, 0, 0)'){
			alert('请输入正确的号码')
			return;
		}
		// 需求描述
		var requirement_description = $('.requirement_description').val();
		// 电话
		var telephoneNumber = $('#telephoneNumber').val();
		
		var requirement = new Requirement();
		requirement.set('requirement_description', requirement_description);
		requirement.set('telephoneNumber', telephoneNumber);
		requirement.save().then(function() {
	       // alert('提交成功');
	       $('.requirement_description').val('');
	       $('#telephoneNumber').val('');
	       $('.tip-panel').fadeIn();
	       $('.shade').css('display', 'none');

	       setTimeout(function(){
	       	 $('.tip-panel').fadeOut();
	       }, 1500)

	    }, function(error) {
	    	alert('提交失败，请重新提交');
	       alert(JSON.stringify(error));
	    });
	});
	// 取消
	$('.panel_cancel').on('click', function(e){
		  $('.requirement_description').val('');
	      $('#telephoneNumber').val('');
	      $('.shade').css('display', 'none');
	});

})