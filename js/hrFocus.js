window.onload=function () {
	var slide = document.getElementById("slide")
	var pic=document.getElementById("pic1");
	var next=document.getElementById("next");
	var pre=document.getElementById("pre");

	var cirBtns=slide.getElementsByTagName("span");
	var lastIndex=cirBtns.length;

	var index=1;
	var animated=false;

	var width=pic.getElementsByTagName("li")[0].getElementsByTagName("img")[0].offsetWidth;

	pre.onclick=function () {
		if (index===1){
			index=lastIndex;
		} else{
			index-=1;
		}

		if (!animated){
			animate(width);
		}

		showBtns();
	}

	next.onclick=function () {
		if (index===lastIndex){
			index=1;
		} else{
			index+=1;
		}

		if (!animated){
			animate(width*(-1));
		}

		showBtns();
	}

	function animate(offset) {
		animated=true;
		var newLeft=pic.offsetLeft+offset;
		var time=300;
		var interval=5;
		var speed=offset/(time/interval);

		function go() {
			if((speed<0 && pic.offsetLeft>newLeft)||(speed>0 && pic.offsetLeft<newLeft)){
				pic.style.left=pic.offsetLeft+speed+"px";
				setTimeout(go,interval);
			} else {
				animated=false;
				pic.style.left=newLeft+"px";

				if (newLeft <= -1*width*(lastIndex+1)) {
					pic.style.left = -1*width+"px";
				} else if (newLeft >= 0) {
					pic.style.left = -1*width*lastIndex+"px"
				}
			}
		}
		go();

	}

	function showBtns() {
		for(var i=0;i<cirBtns.length;i++){
			var button=cirBtns[i];
			if(button.className === "on"){
				button.className="";
				break;
			}
		}
		cirBtns[index-1].className="on";
	}

	for(var i=0;i<cirBtns.length;i++){
		var button=cirBtns[i];
		button.onclick=function () {
			if(this.className==="on"){
				return;
			}

			var myIndex=parseInt(this.getAttribute("index"));
			var offset=-1*width*(myIndex-index);
			if(!animated){
				animate(offset);
			}
			index=myIndex;
			showBtns();
		}
	}

	var autoTimer;
	function autoPlay() {
		autoTimer=setInterval(function () {
			next.onclick();
		},3000);
	}

	function autoStop() {
		clearInterval(autoTimer);
	}

	slide.onmouseover=autoStop;
	slide.onmouseout=autoPlay;

	autoPlay();

}

