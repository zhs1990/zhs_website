window.onload = function(){
	var oAllIn = document.getElementById('all_in');
	var oTop = document.getElementById('top');
	var oSlideUp = document.getElementById('slideUp');
	var oImg = document.getElementById('img');
	var oP1 = document.getElementById('p1');
	var oP2 = document.getElementById('p2');
	var oArrow = document.getElementById('arrow');
	var oArrow2 = document.getElementById('arrow2');
	var oNav = document.getElementById('nav');
	var aNavLi = oNav.getElementsByTagName('li');
	var oMine = document.getElementById('mine');
	var oSecond = document.getElementById('second');
	var oUlBox = document.getElementById('ul_outer');
	var oUlPic = oUlBox.getElementsByTagName('ul')[0];
	var aLiPic = oUlPic.children;
	var aA = oSecond.getElementsByTagName('a');
	var oTitle = oSecond.getElementsByTagName('span')[0];
	var oH3 = oSecond.getElementsByTagName('h3')[0];
	var oNavLeft = document.getElementById('nav_left');
	var oSecondArrow = document.getElementById('second_arrow');
	var oWeb = document.getElementById('web_design');
	var oWebUl = oWeb.getElementsByTagName('ul')[0];
	var aWebLi = oWebUl.getElementsByTagName('li');
	var aWebA = oWebUl.getElementsByTagName('span');
	var aWebH3 = oWebUl.getElementsByTagName('a');
	var oContactMe = document.getElementById('contactMe');
	var oContact = document.getElementById('contactBtn');
	var aContactSpan = oContact.getElementsByTagName('span');
	var oContactDiv = document.getElementById('divs');
	var aContactDivs = oContactDiv.getElementsByTagName('div');
	
	var arr = ['我未来的工作室哦','APP项目--魔百','APP项目-番茄视界','手机图标扁平化设计','我的技能','天气图标展示'];
	var name = ['工作<br>经验','求职<br>意向','专业<br>技能','工作<br>地点'];
	var N = 4;
	var R = oContactMe.offsetWidth/2;
	var oTopH = oTop.offsetHeight;
	var iNow = 0;
	var MNum = 0;
	tabColor(0);
	for(var i=0;i<aNavLi.length;i++){
		(function(index){
			aNavLi[index].onclick = function(){
				if(index==3){
					rollMove(3);	
				}
				tabColor(index);
				move(oAllIn,{top:-index*oTopH});
				move(oNavLeft,{opacity:1});
			};
		})(i);
	}
	function rollMove(index){
		for(var i=0;i<aContactSpan.length;i++){
			var a = 360/N*i;
			startMove2(aContactSpan[i],a);	
		}
	}
	//联系我
	function d2a(n){  //角度->弧度
		return n*Math.PI/180;
	}
	function startMove2(obj,iTarget){
		obj.a=obj.a || 0;
		clearInterval(obj.timer);
		var count=Math.floor(1000/30);
		var start=obj.a;
		var dis=iTarget-start;
		var n=0;
		obj.timer=setInterval(function(){
			n++;
			
			var c=1-n/count;
			var cur=start+dis*(1-Math.pow(c,3));
			
			var x=R+Math.sin(d2a(cur))*R;
			var y=R-Math.cos(d2a(cur))*R;
			
			obj.style.left=x-36+'px';
			obj.style.top=y-36+'px';
			obj.a=cur;  //更新角度
			
			if(n==count){
				clearInterval(obj.timer);
			}
		},30);	
	}
	for(var i=0;i<N;i++){
		var oSpan = document.createElement('span');
		oSpan.innerHTML = name[i];
		oContact.appendChild(oSpan);	
	}
	for(var i=0;i<aContactSpan.length;i++){
		aContactSpan[i].index = i;
		aContactSpan[i].onmouseenter = function(){
			for(var j=0;j<aContactSpan.length;j++){
				aContactSpan[j].style.background = '#e9e9e9';
				aContactSpan[j].style.color = '#3e3e3e';
				aContactSpan[j].style.border = '1px solid #ccc';
				aContactDivs[j].style.display = 'none';
			};
			this.style.background = '#42b8f1';
			this.style.color = '#fff';	
			this.style.border = 'none';
			aContactDivs[this.index].style.display = 'block';
		};	
	};
	function tabColor(index){
		for(var i=0;i<aNavLi.length;i++){
			aNavLi[i].getElementsByTagName('a')[0].style.color = '#848484';	
		};
		aNavLi[index].getElementsByTagName('a')[0].style.color = '#fff';
		
	}
	//页面加载
	move(oImg,{opacity:1},{end:function(){
		//document.body.style.overflowY = 'hidden';
		move(oP1,{left:20},{end:function(){
			move(oP2,{bottom:100},{end:function(){
				move(oSlideUp,{height:0},{end:function(){
					oMine.style.zIndex = 98;
					move(oArrow,{opacity:1});
				}});	
			}});	
		}});	
	}});
	//arrow1点击
	oArrow.onclick = function(){
		move(oAllIn,{top:-oTopH},{end:function(){
			move(oNavLeft,{opacity:1});
		}});	
		tabColor(1);
	};
	//second幻灯片
	oUlPic.innerHTML+=oUlPic.innerHTML;
	oUlPic.style.width=aLiPic.length*aLiPic[0].offsetWidth+'px';
	var W=oUlPic.offsetWidth/2;
	oUlBox.onmouseenter = function(){
		move(oTitle,{bottom:0});
		move(oH3,{bottom:0});
		move(aA[0],{opacity:1});
		move(aA[1],{opacity:1});
	};
	oUlBox.onmouseleave = function(){
		move(oTitle,{bottom:-40});
		move(oH3,{bottom:-40});
		move(aA[0],{opacity:0});
		move(aA[1],{opacity:0});
	};
	var iNow = 0;
	function tab(){
		startMove(oUlPic,-iNow*aLiPic[0].offsetWidth);
		oH3.innerHTML = arr[iNow%6];		
	}
	//点击下一个
	aA[1].onclick=function(){
		iNow++;
		tab();
	};
	//上一个
	aA[0].onclick=function(){
		iNow--;
		tab();
	};
	var left=0;
	var timer=null;
	function startMove(obj,iTarget){
		clearInterval(timer);
		var count=Math.floor(700/30);
		var start=left;
		var dis=iTarget-start;
		var n=0;
		
		timer=setInterval(function(){
			n++;
			
			var a=1-n/count;
			left=start+dis*(1-Math.pow(a,3));
			
			if(left<0){
				obj.style.left=left%W+'px';	
			}else{
				obj.style.left=(left%W-W)%W+'px';		
			}
			
			if(n==count){
				clearInterval(timer);
			}
		},30);
	}
	//案例展示
	for(var i=0;i<aWebLi.length;i++){
		aWebLi[i].index = i;
		aWebLi[i].onmouseover = function(ev){
			var oEvent = ev||event;
			var oFrom = oEvent.fromElement||oEvent.relatedTarget;
			if(this.contains(oFrom))return;
			var num = hoverDir(this,oEvent);
			//alert(num);
			var oWebA = aWebA[this.index];
			var oWebH3 = aWebH3[this.index];
			switch(num){
				case 0:
					oWebA.style.left = 255 + 'px';
					oWebA.style.top = 0;
				break;	
				case 1:
					oWebA.style.left = 0;
					oWebA.style.top = 200 + 'px';
				break;	
				case 2:
					oWebA.style.left = -255 + 'px';
					oWebA.style.top = 0;
				break;	
				case 3:
					oWebA.style.left = 0;
					oWebA.style.top = -255 + 'px';
				break;	
			}
			move(oWebA,{left:0,top:0},{end:function(){
				move(oWebH3,{opacity:1});
				//oWebH3.style.display = 'block';	
			}});
			
		};	
		aWebLi[i].onmouseout = function(ev){
			var oEvent = ev||event;
			var oTo = oEvent.toElement||oEvent.relatedTarget;
			if(this.contains(oTo))return;
			var n = hoverDir(this,oEvent);	
			var oWebA = aWebA[this.index];
			var oWebH3 = aWebH3[this.index];
			switch(n){
				case 0:
					move(oWebA,{left:255,top:0});
				break;	
				case 1:
					move(oWebA,{left:0,top:200});
				break;	
				case 2:
					move(oWebA,{left:-255,top:0});
				break;	
				case 3:
					move(oWebA,{left:0,top:-200});
				break;	
			}
			move(oWebH3,{opacity:0});
			
		};	
	}	
	//滚动
	addMouseWheel(oAllIn,function(down){
		if(down){
			iNow+=oTopH;
			
			if(MNum==2){
				rollMove(3);
			}
			MNum++;
			if(MNum==4){
				//alert('到底了');
				MNum=3;
				iNow=oTopH*MNum;
				return false;	
			}
			//alert(MNum);
			tabColor(MNum);
			move(oAllIn,{top:-iNow});
			move(oNavLeft,{opacity:1});
		}else{
			//alert(MNum);
			iNow-=oTopH;
			if(MNum==0){
				iNow=0;
				move(oNavLeft,{opacity:0});	
				//alert('到顶了');
				return false;	
			}
			MNum--;
			tabColor(MNum);
			move(oAllIn,{top:-iNow});
		}
	});
	
};



















