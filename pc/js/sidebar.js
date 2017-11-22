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
	       $('.shade').css('display', 'none');
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