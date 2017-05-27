function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function move(obj,json,options){
	options=options || {};
	options.time=options.time || 700;
	options.type=options.type || 'ease-out';
	
	clearInterval(obj.timer);
	var count=Math.floor(options.time/30);
	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		
		if(isNaN(start[name])){
			switch(name){
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'opacity':
					start[name]=1;
					break;
				case 'marginLeft':
					start[name]=0;
					break;
				case 'fontSize':
					start[name]=12;
					break;
			}	
		}
		dis[name]=json[name]-start[name];
	}
	
	
	var n=0;
	obj.timer=setInterval(function(){
		n++;
		
		for(var name in json){
			switch(options.type){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					
					var a=1-n/count;
					
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';	
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.end && options.end();	
		}
	},30);
}

function hoverDir(obj,ev){
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	//alert(obj.offsetLeft);
	//alert(obj.offsetLeft);
	var x = obj.offsetLeft + w/2 - ev.clientX;
	var y = obj.offsetTop + h/2 - ev.clientY - 1334;
	
	return (Math.round((Math.atan2(y,x)*180/Math.PI+180)/90))%4;	
}

function addMouseWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);	
	}else{
		obj.onmousewheel = fnWheel;	
	}
	function fnWheel(ev){
		var oEvent = ev||event;
		var down = true;
		if(oEvent.wheelDelta){
			if(oEvent.wheelDelta<0){
				down = true;	
			}else{
				down = false;	
			}
		}else{
			if(oEvent.detail>0){
				down = true;	
			}else{
				down = false;	
			}
		}
		fn(down);
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	}
}
