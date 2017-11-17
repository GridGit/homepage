
// 需求提交
$('.submit').on('click', function(e){
	e.stopPropagation();
	e.preventDefault();
	
	var Demand = AV.Object.extend('Demand');
	
	if($('.custom_name').val() == ''){
		alert('请填写您的姓名');
		return;
	}
	if( $('.custom_tel').val() == ''){
		alert('请填写您的手机号码');
		return;
	}
	if($('.custom_email').val() == ''){
		alert('请填写您的邮箱');
		return;
	}
	if($('.custom_demand').val() == ''){
		alert('请填写您的需求');
		return;
	}
	// 姓名
	var customName = $('.custom_name').val();
	// 称谓
	var customSex= $('input:radio[name="sex"]:checked').val();
	// 电话
 	var customTel = $('.custom_tel').val();
 	// 邮箱
 	var customEmail = $('.custom_email').val();
 	// 需求
 	var customDemand = $('.custom_demand').val();

 	var demand = new Demand();



 

 	demand.set('customName', customName);
 	demand.set('customSex', customSex);
 	demand.set('customTel', customTel);
 	demand.set('customEmail', customEmail);
 	demand.set('customDemand', customDemand);
 	demand.save().then(function(){
 		// 重置表单
 		$('.custom_name').val("");
 		$('input:radio[name="sex"]')[0].checked = true;
 		$('.custom_tel').val('');
 		$('.custom_email').val('');
 		$('.custom_demand').val('');

 		
 	}, function(err){
 		alert('提交失败');
 	})

});