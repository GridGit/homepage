// 表单判断
// 姓名
$(".custom-name").blur(function(){
  if($(".custom-name").val() == ''){
  	$('.custom-name').css('border-color', 'red');
  	$('.custom-name-text').fadeIn();
  }
});

$('.custom-name').focus(function(){
	$('.custom-name').css('border-color', '#cccccc');
	$('.custom-name-text').fadeOut();
})
// 公司名
$(".company-name").blur(function(){
  if($(".company-name").val() == ''){
  	$('.company-name').css('border-color', 'red');
  	$('.company-name-text').fadeIn();
  }
});

$('.company-name').focus(function(){
	$('.company-name').css('border-color', '#cccccc');
	$('.company-name-text').fadeOut();
})
// 公司地址
$(".company-address").blur(function(){
  if($(".company-address").val() == ''){
  	$('.company-address').css('border-color', 'red');
  	$('.company-address-text').fadeIn();
  }
});

$('.company-address').focus(function(){
	$('.company-address').css('border-color', '#cccccc');
	$('.company-address-text').fadeOut();
})
// 电话

$(".custom-tel").blur(function(){
  if($(".custom-tel").val() == ''){
  	$('.custom-tel').css('border-color', 'red');
  	$('.custom-tel-text').fadeIn();
  }else if($(".custom-tel").val() != '' &&  !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test($('.custom-tel').val()) &&  !(/^1[34578]\d{9}$/.test($('.custom-tel').val()))){
  	$('.custom-tel-text').text('请输入正确的联系方式')
  	$('.custom-tel').css('border-color', 'red');
  	$('.custom-tel-text').fadeIn();
  }
});

$('.custom-tel').focus(function(){
	$('.custom-tel').css('border-color', '#cccccc');
	$('.custom-tel-text').text('请输入联系方式')
	$('.custom-tel-text').fadeOut();
})
// 邮箱
$(".custom-email").blur(function(){
  if($(".custom-email").val() == ''){
  	$('.custom-email').css('border-color', 'red');
  	$('.custom-email-text').fadeIn();  	
  }else if($(".custom-email").val() != '' && !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($(".custom-email").val())){
  	$('.custom-email').css('border-color', 'red');
  	$('.custom-email-text').text('请输入正确的电子邮箱');
  	$('.custom-email-text').fadeIn();  	
  }
});

$('.custom-email').focus(function(){
	$('.custom-email').css('border-color', '#cccccc');
	$('.custom-email-text').text('请输入电子邮箱');
	$('.custom-email-text').fadeOut();
}) 
// 需求
$(".custom-demand").blur(function(){
  if($(".custom-demand").val() == ''){
  	$('.custom-demand').css('border-color', 'red');
  }
});
$('.custom-demand').focus(function(){
	$('.custom-demand').css('border-color', '#cccccc');
}) 

$(document).on('scroll', function(){
	$('.private-form').find('input').css('border-color', '#cccccc');
	$('.private-form p').fadeOut();
	$('.private-form').find('textarea').css('border-color', '#cccccc')
})
$('.tip-panel').on('scroll', function(e){
  e.stopPropagation();
  e.preventDefault();
  return false;
})
// 需求提交
$('.btn-submit').on('click', function(e){
	e.stopPropagation();
	e.preventDefault();
	
	var Demand = AV.Object.extend('Demand');
	
	if($('.custom-name').val() == ''){
		alert('请输入您的姓名');
		return;
	}

	if($('.company-name').val() == ''){
		alert('请输入公司名称')
	}

	if( $('.company-address').val() == ''){
		alert('请输入公司地址');
		return;
	}
	if($('.custom-tel').val() == ''){
		alert('请输入联系电话')
	}
	if($('.custom-email').val() == ''){
		alert('请输入电子邮箱');
		return;
	}
	if($('.custom-demand').val() == ''){
		alert('请输入您的需求');
		return;
	}
	// 姓名
	var customName = $('.custom-name').val();
	// 公司名称
	var companyName = $('.company-name').val();
	// 公司地址
	var companyAdress = $('.company-address').val();
	// 电话
 	var customTel = $('.custom-tel').val();
 	// 邮箱
 	var customEmail = $('.custom-email').val();
 	// 需求
 	var customDemand = $('.custom-demand').val();
	
	// 
 	var demand = new Demand();
 	demand.set('customName', customName);
 	demand.set('companyName', companyName);
 	demand.set('companyAdress', companyAdress);
 	demand.set('customTel', customTel);
 	demand.set('customEmail', customEmail);
 	demand.set('customDemand', customDemand);



 	demand.save().then(function(){
 		// 重置表单
 		$('.custom-name').val('');
 		$('.company-name').val('');
 		$('.company-address').val('');
 		$('.custom-tel').val('');
 		$('.custom-email').val('');
 		$('.custom-demand').val('');

    $('.tip-panel').fadeIn();
    
    setTimeout(function(){
      $('.tip-panel').fadeOut();
    }, 1500)
	
 	}, function(err){
 		alert('提交失败');
 	})
});