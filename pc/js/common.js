window.onscroll = function(e){
	var cont = document.getElementsByClassName('cont');
	if(window.scrollY > 200){
		cont[0].style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
	}else{
		cont[0].style.backgroundColor = '';
	}
}
