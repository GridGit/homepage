// handlebars context
// 查询数据库结果
var context = {
  products: [],
  details: []
};

// 条件搜索结果
var searchContext = {
  products: []
}
// 查询数据库
function queryData(){
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
        releaseTime
      })
    });
    // 解析魔板
    // 产品页
    // use handlebars to update html
    var source = $("#products-list").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('.service_wrap').html(html); 
  }).catch(function(error) {
    alert(JSON.stringify(error));
  });
}
queryData();
window.setTimeout(function(){
	// 产品页
	$('.service_wrap').on('click', '.service_item_wrap',function(e){
		e.stopPropagation();
		e.preventDefault();
    var len = context.products.length;
    var index;
    for(var i = 0; i < len; i++){
      if(context.products[i].productTitle == $(this).find('h3').text()){
        index = i;
      }
    }
		var indexDetailDom = $('.detail')[index];
    window.location.href = 'servicedetails.html#' + index;
	})
},500)
$('.search_input').on('keyup', function(e){
  e.stopPropagation();
  e.preventDefault();
  if(e.type == 'keyup' && e.keyCode == '13'){
    searchResult()
  }
})
$(".search_text").on('click', function(e){
    searchResult();
})
function searchResult(){
  var keyword = $.trim($('.search_input').val());
  if(keyword != ''){
    var len = context.products.length;
    searchContext.products = [];
    for(var i = 0; i < len; i++){
      var wordIndex = context.products[i].productTitle.indexOf(keyword);
      if(wordIndex != -1){
        searchContext.products.push(context.products[i]);
      }
    }
    // 如果有搜索结果
    if(searchContext.products.length){
      // 解析魔板
      // 产品页
      // use handlebars to update html    
      var source = $("#products-list").html();
      var template = Handlebars.compile(source);
      var html = template(searchContext);
      $('.service_wrap').html(html);
    }else{
      var html = "<div style='width: 1200px; margin: 0 auto; height: 50px; text-align:center; font-size: 20px'>抱歉，暂无  <span style='color: #FF5300;'>"+ keyword +"</span>  相关内容</div>"
      $('.service_wrap').html(html);
    }
  }else{
      // console.log('======')
      // 如果没有输入查询条件默认全返回
      var source = $("#products-list").html();
      var template = Handlebars.compile(source);
      var html = template(context);
      $('.service_wrap').html(html); 
  }
}

