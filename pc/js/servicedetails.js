// handlebars context


function setupData() {
  // LeanCloud - 查询
  var query = new AV.Query('Product');
  query.include('owner');
  query.include('image');
  query.ascending('num_id');
  query.addDescending('createdAt');
  
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
      // 样例图片不存在
      if(detailsImgArrUrl.length == 0){
        detailsImgArrUrl = ['']
      }

   	  // 数据样例图片个数
   	  var exampleImgArrLength =product.get('exampleImgArrLength');
   	  var exampleImgArr = [];
   	  var exampleImageUrl = [];
   	  for(var i = 0; i < exampleImgArrLength; i++){
   	  	exampleImgArr.push(product.get('exampleImgArr' + i));
   	  	exampleImageUrl.push(product.get('exampleImgArr' + i).get('url'))
   	  }

      // 数据图片不存在
      if(exampleImageUrl.length == 0){
        exampleImageUrl = [''];
      }
  
      // 解析产品详情
      // 产品优势
      var indexSuperiority = details.indexOf('产品优势:');
      // 适用范围
      var indexScope = details.indexOf('适用范围:');
      // 数据格式
      var indexFormat = details.indexOf('数据格式:');
      // 产品优势文本
      var superiorityText = '';
      // 适用范围文本
      var scopeText = '';
      // 数据格式文本
      var formatText = '';
      
      if(indexSuperiority != -1 && indexScope != -1){
        superiorityText = details.substring(indexSuperiority + '产品优势:'.length, indexScope);
      }
      if(indexScope != -1 && indexFormat != -1){
        scopeText = details.substring(indexScope + '适用范围:'.length, indexFormat);
      }
      if(indexFormat != -1){
        formatText = details.substring(indexFormat + '数据格式:'.length);
      }
      if(indexSuperiority != -1){
        details = details.substring(0, indexSuperiority);  
      }
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
        // 产品优势
        superiorityText,
        // 适用范围
        scopeText,
        // 数据格式
        formatText,
      	// detailsAll,
      	// exampleAll
      	// 产品详情图片
      	detailsImgArrUrl,
      	// 数据样例详情
      	exampleImageUrl
      })
    });  
    // 详情页
    var source2 = $("#detail_item").html();
    var template2= Handlebars.compile(source2);
    var html2 = template2(context);
    $('.details').html(html2);
    context = JSON.stringify(context)
  
    sessionStorage.setItem('detailsContext', context); 
    
  }).catch(function(error) {
    alert(JSON.stringify(error));
  });
};
var context = JSON.parse(sessionStorage.getItem('detailsContext'));
if(context && context.products && context.products.length != 0){
    // 详情页
    var source2 = $("#detail_item").html();
    var template2= Handlebars.compile(source2);
    var html2 = template2(context);
    $('.details').html(html2); 


    // 具体产品索引
    var index = window.location.href.split('#')[1];
    
    // 如果没有锚点，默认为第一个
    if(typeof index == 'undefined'){
      index = 0;
    }


    var indexDetailDom = $('.detail')[index];
    $(indexDetailDom).fadeIn();
    $('.detail_middle span').removeClass('introduce_example_active');
    $('.detail_introduce_btn').addClass('introduce_example_active');
    // 需求定制
    $('.data_creation').on('click', function(e){
      $('.shade').css('display', 'block');
    })  
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
}else {
  context = {
    products: [],
    details: []
  };
  
  setupData();
  window.setTimeout(function(){

    // 具体产品索引
    var index = window.location.href.split('#')[1];
    
    // 如果没有锚点，默认为第一个
    if(typeof index == 'undefined'){
      index = 0;
    }


    var indexDetailDom = $('.detail')[index];
    $(indexDetailDom).fadeIn();
    $('.detail_middle span').removeClass('introduce_example_active');
    $('.detail_introduce_btn').addClass('introduce_example_active');
    // 需求定制
    $('.data_creation').on('click', function(e){
      $('.shade').css('display', 'block');
    })  
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
}


