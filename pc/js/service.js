// handlebars context
		var context = {
		  products: [],
		  details: []
		};

		function setupData() {
		  // LeanCloud - 查询
		  
		  var query = new AV.Query('Product');
		  query.include('owner');
		  query.include('image');
		  query.descending('createdAt');
		  query.find().then(function (products) {
		    products.forEach(function(product) {
		      // 产品名称 
		      var productTitle = product.get('title');
		      // 产品标签
		      var productTags = product.get('tags');
		      // 产品描述
		      var productDescription = product.get('description');
		      // 时间
		      var releaseTime = (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate() + '/' +  product.createdAt.getFullYear();
		      // 发布者
		      var ownerUsername = product.get('owner').get('username');
		      // 产品图片描述
		      var productImage = product.get('image');
		      var productImageUrl;
		      if (productImage) {
		        productImageUrl = productImage.get('url');
		      } else {
		        productImageUrl = 'favicon.ico';
		      }
		      // 产品详情
		      var details = product.get('details');


		     // 详情图片个数
		      var detailsImgArrLength = product.get('detailsImgArrLength');
		      // 获取图片详情
		      var detailsImgArr = [];
		      var detailsImgArrUrl = [];

		      for(var i = 0; i < detailsImgArrLength; i++){
		      	detailsImgArr.push(product.get('detailsImgArr' + i));
		      	detailsImgArrUrl.push(product.get('detailsImgArr' + i).get('url'));
		      }

		   	  // 产品详情图片描述
		   	  var detailsTextArr = product.get('detailsTextArr');

		   	  var detailsAll = []
		   	  for(var i = 0; i < detailsImgArrUrl.length; i++){
		   	  	var obj = {};
		   	  	obj.detailsImgArrUrl = detailsImgArrUrl[i];
		   	  	obj.detailsTextArr = detailsTextArr[i];
		   	  	detailsAll.push(obj);
		   	  }


		   	  // 数据样例图片个数
		   	  var exampleImgArrLength =product.get('exampleImgArrLength');
		   	  var exampleImgArr = [];
		   	  var exampleImageUrl = [];
		   	  for(var i = 0; i < exampleImgArrLength; i++){
		   	  	exampleImgArr.push(product.get('exampleImgArr' + i));
		   	  	exampleImageUrl.push(product.get('exampleImgArr' + i).get('url'))
		   	  }
		   	  // 数据样例图片描述
		   	  var exampleTextArr = product.get('exampleTextArr');

		   	 
		   	  var exampleAll = []
		   	  for(var i = 0; i < exampleImageUrl.length; i++){
		   	  	var obj = {}
		   	  	obj.exampleImageUrl = exampleImageUrl[i];
		   	  	obj.exampleTextArr = exampleTextArr[i];
		   	  	exampleAll.push(obj);
		   	  }

		      // 数据样例图片
		      // var exampleImage = product.get('inputExample');
		      // var exampleImageUrl;
		      // if(exampleImage){
		      // 	exampleImageUrl = exampleImage.get('url');
		      // }else{
		      // 	exampleImageUrl = 'favicon.ico';
		      // }

		      context.products.push({
		      	// 产品图片
		      	productImageUrl,
		      	// 产品名称
		      	productTitle,
		      	// 产品标签
		      	productTags,
		      	// 产品描述
		      	productDescription,
		      	// 所有者
		      	ownerUsername,
		      	// 提交时间
		      	releaseTime,
		      	// 产品详情
		      	details,
		      	// detailsAll,
		      	// exampleAll
		      	// 产品详情图片
		      	detailsImgArrUrl,
		      	// 产品详情描述
		      	detailsTextArr,
		      	// 数据样例详情
		      	exampleImageUrl,
		      	// 数据样例详情描述
		      	exampleTextArr
		      })

		     
		    });
		   
		    // 产品页
		    // use handlebars to update html
		    var source = $("#products-list").html();
		    var template = Handlebars.compile(source);
		    var html = template(context);
		    $('.service_wrap').html(html);
		    
		    // 详情页
		    var source2 = $("#detail_item").html();
		    var template2= Handlebars.compile(source2);
		    var html2 = template2(context);
		    $('.details').html(html2);




		  }).catch(function(error) {
		    alert(JSON.stringify(error));
		  });
		};
		
		setupData();

		window.setTimeout(function(){

			// 产品页
			$('.service_wrap').on('click', '.service_item_wrap',function(e){
				e.stopPropagation();
				e.preventDefault();

				var index = $(this).prevAll().length;
				var indexDetailDom = $('.detail')[index];
				window.scrollTo(0, 0)
				$('.main').fadeOut();
				$(indexDetailDom).fadeIn();
				$('.detail_middle span').removeClass('introduce_example_active');
				$('.detail_introduce_btn').addClass('introduce_example_active');
			})
			
			// 二级导航
			$('.product_service').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();
				
				window.scrollTo(0, 0);
				$('.detail').fadeOut();
				$('.main').fadeIn();

			})
			// 
			// 需求定制
			$('.data_creation').on('click', function(e){
				$('.shade').css('display', 'block');
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
			$('.panel_cancel').on('click', function(e){
				  $('.requirement_description').val('');
			      $('#telephoneNumber').val('');
			      $('.shade').css('display', 'none');
			});
			
			// 详情介绍&数据样例
			$('.detail_introduce_btn').on('click',function(e){
				e.stopPropagation();
				e.preventDefault();	

				$('.detail_middle span').removeClass('introduce_example_active');
				$('.detail_introduce_btn').addClass('introduce_example_active');

				$('.detail_introduce').fadeIn();
				$('.detail_example').fadeOut();
			})

			$('.detail_example_btn').on('click', function(e){
				e.stopPropagation();
				e.preventDefault();

				$('.detail_middle span').removeClass('introduce_example_active');
				$('.detail_example_btn').addClass('introduce_example_active');

				$('.detail_introduce').fadeOut();
				$('.detail_example').fadeIn();
			})

		},500)