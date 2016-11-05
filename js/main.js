window.onload = function(){
	var big_pic = document.getElementById('big_pic');
	var pre = document.getElementsByClassName('pre')[0];
	var next = document.getElementsByClassName('next')[0];
	var sm_pic = document.getElementsByClassName('sm-pic');
	var b_pic = document.getElementsByClassName('b-pic');
	var small_pic = document.getElementById('small_pic');

	var zindex = 6;
	var iCurrent = 0;
	show(iCurrent);
	
	window.onmousemove = function(event){
		if(big_pic.offsetLeft <= event.pageX && event.pageX < big_pic.offsetLeft+big_pic.offsetWidth/2 && big_pic.offsetTop <= event.pageX && event.pageY <= big_pic.offsetTop+big_pic.offsetHeight){
			attributeAnim(pre,{opacity:50});
		}else{
			attributeAnim(pre,{opacity:0});
		}
		if(big_pic.offsetLeft+big_pic.offsetWidth/2 <= event.pageX && event.pageX <= big_pic.offsetLeft+big_pic.offsetWidth && big_pic.offsetTop <= event.pageX && event.pageY <= big_pic.offsetTop+big_pic.offsetHeight){
			attributeAnim(next,{opacity:50});
		}else{
			attributeAnim(next,{opacity:0});
		}
	};
	for(var i = 0;i < sm_pic.length;i++){
		sm_pic[i].tag = i;
		sm_pic[i].onmouseenter = function(){
			attributeAnim(this,{opacity:100});
		};
		sm_pic[i].onmouseout = function(){
			if(iCurrent !== this.tag){
				attributeAnim(this,{opacity:70});
			}
			
		};
		sm_pic[i].onclick = function(){
			show(this.tag);

			if(iCurrent !== this.tag){
				move(this.tag);
			}
			iCurrent = this.tag;
			// console.log(start,last,this.tag);
			// console.log(iCurrent);
		};
	}
	pre.onclick = function (){
		if(iCurrent > 0 && iCurrent < 6){
			iCurrent--;
			show(iCurrent);
			move(iCurrent);
		}else if(iCurrent === 0) {
			iCurrent = 5;
			show(iCurrent);
			move(iCurrent);
		}
	};
	next.onclick = function (){
		if(iCurrent > -1 && iCurrent < 5){
			iCurrent++;
			show(iCurrent);
			move(iCurrent);
		}else if(iCurrent === 5){
			iCurrent = 0;
			show(iCurrent);
			move(iCurrent);
		}
	};	
	//判断是否显示图片
	function show(tag){
		for(var k = 0;k < sm_pic.length;k++){
			if(k !== tag){
				attributeAnim(sm_pic[k],{opacity:70});
			}else{
				attributeAnim(sm_pic[k],{opacity:100});
			}
		}
	}
	//判断是否移动图片
	function move(tag){
		zindex++;
		b_pic[tag].style.zIndex = zindex;
		b_pic[tag].style.height = '0px';
		attributeAnim(b_pic[tag],{height:big_pic.offsetHeight});
		if(tag === 0){
 	  		attributeAnim(small_pic,{left:0});
 	  	}else if(tag === sm_pic.length-1){
			attributeAnim(small_pic,{left:-(tag-2)*sm_pic[tag].offsetWidth});
 	  	}else{
 	 		attributeAnim(small_pic,{left:-(tag-1)*sm_pic[tag].offsetWidth});  	
 	 	}
	}
}