 ///////////////////////////////      PLUGIN         //////////////////////////////
 
(function($){ 
	
	$.fn.splitText = function(options){
		
		// options //
		// type = 'lines','words','letters'
		// animation = 'explode','slide','opacity','3D'
		// justSplit = 'lines','words','letters'
		// duration = ...in seconds
		// colorize = color hex ?
		// scale    = boolean
		// useLite  = boolean
		
		// default
		var opts = {
			'type'		: 'lines',
			'animation'	: 'explode',
			'justSplit' : false,
			'duration'	: 1.0,
			'scale'		: true,
			'useLite'	: false
		};
		
		
		if(options == null || options == undefined || options == '' || (options.type !== 'words' && options.type !== 'lines' && options !== 'letters')){
			options = opts;
		}
		
		if(options.duration == undefined){
			options.duration = 1.0;
		}
		
		// element is the outer container //
		var element = this;
		var userInput = element.text();
		var TMax = options.useLite==false?new TimelineMax():new TimelineLite();
		
		
		//// setup the element ////
		var initialText = element.text();
		
		//// SET ANIMATION TYPE ///
		
		
		if(options.type=='lines'){
			
			threeDTimeline = new TimelineLite({align:'normal'});
			
			var result = splitWords(userInput);
			
			element.html(result);
		
			var obj = splitLines();
			element.empty();
			
			$.each(obj,function(index,value){
				
				var item = "<div class='split-lines'>"+value.text+"</div>";
				
				element.append(item);
				
			});
		
		}
		else if(options.type=='words'){
			var result = splitWords(initialText);
			
			element.empty();
			element.html(result);
		}
		else if(options.type=='letters'){
			var result = splitLetters(initialText);
			
			element.empty();
			element.html(result);
		}
		
		/////////////////////////////////////////////////////////////////////
		
		function splitLetters(userInput){
			
			var arr = userInput.split("");
			
			for(var i=0;i<arr.length;i++) { 
				
				if(arr[i] == " "){
						arr[i] = '<div class="letter-measure blank">' + arr[i] + '</div>';
				}
				else{
		      
		      		if(!arr[i].match(/\s\n\t\r/g) && arr[i]!="") arr[i] = '<div class="letter-measure">' + arr[i] + '</div>';
		     
		     	}
		   }
		   
		   return arr.join(" ");
		}
		
		function splitWords(userInput){
			  var a = userInput.replace(/\n/g, " \n<br/> ").split(" ");
   
			   $.each(a, function(i, val) { 
			      if(!val.match(/\n/) && val!="") a[i] = '<div class="word-measure">' + val + '</div>';
			   });
			
			   var arr = a.join(" ");
			   return arr;	
		}
		
		function splitLines(userInput){
		   
		   var count = element.children(".word-measure").length;
		   var lineAcc = [element.children(".word-measure:eq(0)").text()];
		   var textAcc = [];
		   for(var i=1; i<count; i++){
		      var prevY = element.children(".word-measure:eq("+(i-1)+")").offset().top;
		      if(element.children(".word-measure:eq("+i+")").offset().top==prevY){
		         lineAcc.push(element.children(".word-measure:eq("+i+")").text());
		   } 
		   else {
		     textAcc.push({text: lineAcc.join(" "), top: prevY});
		     lineAcc = [element.children(".word-measure:eq("+i+")").text()];
		   }
		   }
		   textAcc.push({text: lineAcc.join(" "), top: element.children(".word-measure:last").offset().top});
		   return textAcc;
		   
		}
		
		 this.animate = function() {
			console.log(options);
			
			if(options.type == 'letters'){  ////////////////////// ANIMATE LETTERS
				TMax = new TimelineMax({align:'start'});
				var nChildren = element.children().length;
				for(var i=0;i<nChildren;i++){
			         
			         	var item = element.children().eq(i);
			         	var pos  = item.offset();
			         	item.css({'left':pos.left,'top':pos.top});
			         	
				         	TMax.insert(
				         	TweenMax.to(item, options.duration, getAnimation(), 'explode'));
				  		
		
						TMax.play();
				}
			}
			else if(options.type == 'words'){ /////////////////////  ANIMATE WORDS
				TMax = new TimelineMax();
				var nChildren = element.children().length;
				
				for(var i=0;i<nChildren;i++){
				  if(options.animation == 'explode'){
				  		var pos  = element.children().eq(i).offset();
						element.children().eq(i).css({'left':pos.left,'top':pos.top});
				  }	
				  TMax.insert(TweenMax.to(element.children().eq(i), options.duration, getAnimation(), "3D"));
				}
				
				TMax.play();
			}
			else if(options.type == 'lines'){ ///////////////// ANIMATE LINES
				
				TMax = new TimelineMax();
				$(".split-lines").each(function(){
					$(this).css({'white-space':'nowrap'});
					
					if(options.animation == 'slide'){
					var w = $(this).width();
					
					TMax.insert(
						TweenMax.to($(this),options.duration,{
							autoAlpha:0,
							marginLeft:w,
							ease:Circ.easeIn}),"-=0.45");
					}
					else{
						var pos  = $(this).offset();
						$(this).css({'left':pos.left,'top':pos.top});
						TMax.insert(
						TweenMax.to($(this),options.duration,getAnimation()));
					}
				});	
				
				TMax.play();
			}
			
			
		};
		////////////////////////////////////////////////////////////////////////////////////////////
		
		
		function getAnimation(){
			
			if(options.animation == 'explode'){
				return getExplode();
			}
			else if(options.animation == 'slide'){
				
			}
			else if(options.animation == 'opacity'){
				return {autoAlpha:0};
			}
			else if(options.animation == '3D'){
				return get3D();
			}
			
		}
		
		function getExplode(){
			
			return {
					      'position':'absolute', 
					       left:getRandom(-1000,1000), 
					       top:getRandom(-500,350), 
					       fontSize:"+=35",
					       ease:Circ.easeOut,
					       autoAlpha:0
				      };
			
		}
		
		function get3D(){
			
			return {
					  	rotationY:getRandom(-270,360), 
					  	top:80, 
					  	transformOrigin: "50% 50% -80", 
					  	rotationX:getRandom(-360, 600), 
					  	rotationY:getRandom(-360, -600),
					  	autoAlpha:0
				  	};
			
		}
		
		// ON REVERSE //
		this.reverse = function(){
			TMax.reverse();
		};
		
		
		///// helper /////
		
		function getColor(){
			return Math.random() * 0xffffff;	
		}
		
		function getRandom(max, min){
			return Math.floor(Math.random() * (1 + max - min) + min);
		}	
		
		return this;

	};
	
})(jQuery); /// end of plugin ///