 ///////////////////////////////      PLUGIN         //////////////////////////////
 
(function($){ 
	
	$.fn.splitText = function(options){
		
		// options //
		// type = 'lines','words','letters', 'sentences' (new) 
		// animation = 'explode','slide','opacity','3D','colorize','smoke','glowOnHover','scramble', 'machinegun' (new)
		// justSplit = 'lines','words','letters', 'sentences' (new)
		// duration = ...in seconds
		// colorize = color hex (if effect is colorize) or glowOnHover
		// scale    = boolean
		// useLite  = boolean
		// useCSS   = boolean
		
		// default
		var opts = {
			'type'		: 'lines',
			'animation'	: 'explode',
			'justSplit' : false,
			'duration'	: 1.0,
			'scale'		: true,
			'useLite'	: false,
			'colorize'	: null,
			'useCSS'	: false
		};
		
		if(options == null || options == undefined || options == '' || (options.type !== 'words' && options.type !== 'lines' && options.type !== 'letters' && options.type !== 'sentences')){
			options = opts;
		}
		
		if(options.duration == undefined){
			options.duration = 1.0;
		}
		
		// element is the outer container //
		var element = $(this);
		//// setup the element ////
		
		if( element.hasClass('isSplit') ){
			
			element.empty();
			element.text( $('#hidden_'+element.attr('id')).text() );
			
		}
		else{
			element.attr('id',String(Math.round(Math.random()*1000+42)));
			element.addClass('isSplit');
		}
		
		var userInput = element.text();
		var TMax = options.useLite==false?new TimelineMax():new TimelineLite();
		
		var initialText = element.text();
		
		var hiddenId = $('#hidden_'+element.attr('id'));
		
		var parentID = "hidden_"+element.attr('id');
		
		if( document.getElementById(parentID) == undefined){
			
			$('body').append('<p class="hiddenText" id="hidden_'+element.attr('id')+'"></p>');
			$(".hiddenText").text(userInput).css({'display':'none'});
			
			///// SET CSS /////////////
			
			if($(".blank").css('white-space') !== 'pre' || options.useCSS == false){ // check if style exists //
				//console.log('style doesnt exist - add it!'+$(".blank").css('white-space'));
		
				$("<style rel='splitStyle'>"+
				".splitText{max-width: 600px;float: left;margin-top: 90px;margin-left: 20px;font-size:20px;}"+
				".splitText>div{white-space:pre-line;float:left;margin-right:5px;cursor:default;}"+
				".letter-measure{margin-right:0 !important;cursor:default;}"+
				".split-lines{white-space:nowrap !important;}"+
				".blank{margin-right:0px !important;white-space: pre !important;}"+
				"</style>").appendTo(document.documentElement);
			}
		}
		
		
		//// SET ANIMATION TYPE ///
		
		console.log(options.type);
		if(options.type=='lines'){
			
			var result = splitWords(userInput);
			
			element.html(result);
		
			var obj = splitLines();
			
			if(options.justSplit == true){
				return {'id':element.attr('id'),'value':obj};
			}
			
			element.empty();
			
			$.each(obj,function(index,value){
				
				var item = "<div class='split-lines'>"+value.text+"</div>";
				
				element.append(item);
				
			});
		
		}
		else if(options.type=='words'){
			var result = splitWords(initialText);
			
			if(options.justSplit == true){
				return {'id':element.attr('id'),'value':result};
			}
			
			element.empty();
			element.html(result);
		}
		else if(options.type=='letters'){
			var result = splitLetters(initialText);
			
			if(options.justSplit == true){
				return {'id':element.attr('id'),'value':result};
			}
			
			element.empty();
			element.html(result);
		}
		else if(options.type == 'sentences'){
			var result  = splitSentences(initialText);
			
			if(options.justSplit == true){
				return { 'id':element.attr('id'), 'value':result };
			}
			
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
		
		function splitWords(userInput, justSplit){
			  var a = userInput.replace(/\n/g, " \n<br/> ").split(" ");
   
   			   if(justSplit == true){
   			   		$.each(a, function(i, val) { 
			      		if(!val.match(/\n/) && val!="") a[i] = val;
			   		});
			   		
			   		return a;
   			   }
   			   
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
		
		function splitSentences(userInput){
			
			 var regExp = /[^\.!\?]+[\.!\?]+/g;
			 
			 var words = splitWords(userInput,true);
			 
			 var sentencesArr = String(userInput).match(regExp);
			 var textAcc = new Array();
			 
			 for(var i = 0; i < sentencesArr.length; i++){
			 	 textAcc.push({ 'text' : sentencesArr[i] });
			 }
			 
			 console.log(words);
			 
			 textAcc = new Array();
			 
			 for(var j = 0; j < words.length; j++ ){
			  	var word = words[j];
			    isSentenceEnd = regExp.test(word);
			    if(isSentenceEnd){
			    	words[j] = "<div class='split-sentences endOfSentence'>" + word + "</div>";
			    }
			    else{
			    	words[j] = "<div class='split-sentences'>" + word + "</div>";
			    }
			    
			    textAcc.push(words[j]);
			    
			 }
			 
			 var arr = words.join(" ");
			 return arr;
			
			
		}
	

		 this.animate = function() {
		 	
		 	
		 	if(options.animation == 'glowOnHover'){
		 		TMax = new TimelineMax({align:'start'});
		 		var nChildren = element.children().length;
		 		
		 		var item;
		 		TMax = new TimelineMax({align:'start'});
		 		element.children().each(function(index,value){
			         
			         	item = $(this);
			         	
			         	$(this).on('mouseenter',function(){
			         		
			         		TweenMax.to($(this), options.duration, getAnimation(options));
			         		
			         	});
			         	
			         	$(this).on('mouseleave',function(){
			         		TweenMax.to($(this), options.duration, {'text-shadow':'none',color:'#000'});
			         	});
			  });
			  
			  return true;
		 	}
		 	else if(options.animation == 'scramble'){
		 		
		 		TMax = new TimelineMax({align:'start'});
		 		var nChildren = element.children().length;
		 		var angle = -Math.PI;
		 		var center = getRandom(50,200);
		 		var item;
		 		var radius;
		 		var dividers = 360/nChildren;
		 		
		 		TMax = new TimelineMax({align:'start'});
		 		element.children().each(function(index,value){
		 			
		 			item = $(this);
		 			var pos  = item.position();
			        item.css({'left':pos.left,'top':pos.top});
		 			radius = item.width()+Math.random()*100;
		 			var x = Math.round(center+radius*Math.cos(angle));
				    var y = Math.round(center+radius*Math.sin(angle));
				   
				    // rotation and rotating the text 90 degrees
				    var turnangle = Math.atan2( y - getRandom(100,200), x - getRandom(100,200) ) * 180 / Math.PI + 90;
		 			
		 			TMax.insert(TweenMax.to(item,0.8,{'position':'absolute', 'left':x, 'top':y, rotation:turnangle, ease:Sine.easeOut}));
		 			
		 			var radians = dividers * (Math.PI / getRandom(10,270));
		 			angle += radians;
		 		});
		 		
		 		TMax.play();
		 		
		 		return true;
		 	}
		 	else if(options.animation == 'blackout'){
		 		var item;
		 		element.children().each(function(index,value){
			         
			         	item = $(this);
			         	
			         	$(this).on('mouseenter',function(){
			         		TweenMax.to($(this), options.duration, {
							    color: 'rgba(255, 255, 255, 0.8)',
							    'background-clip': 'text'
							 })
			         		
			         	});
			         	
			         	$(this).on('mouseleave',function(){
			         		TweenMax.to($(this), options.duration, getBlackout());
			         	});
			  	});
		 		
		 	}
		 	else if( options.animation == 'machinegun'){
		 		
			    var tl = new TimelineMax({delay:0.6, repeat:2, repeatDelay:4});
			    var time = 0;
			    var item;
			 	element.children().each(function(index, value){
			 		 
			 		 item = $(this);
			 		 duration = Math.max(0.5, item.length * 0.08);
			 		 console.log(duration);
			 		
			 		 var isSentenceEnd = item.hasClass('endOfSentence');
			 		 if (isSentenceEnd) {
				      duration += 0.6; //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
				    }
				    //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
				    TweenLite.set(item, {autoAlpha:0, scale:0, z:0.01});
				    //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See http://www.greensock.com/v12/#slowmo and http://api.greensock.com/js/com/greensock/easing/SlowMo.html
				    tl.to(item, duration, {scale:1.2,  ease:SlowMo.ease.config(0.25, 0.9)}, time)
				      //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end. 
						 	.to(item, duration, {autoAlpha:1, ease:SlowMo.ease.config(0.25, 0.9, true)}, time);
				    time += duration - 0.05;
				    if (isSentenceEnd) {
				      time += 0.6; //at the end of a sentence, add a pause for dramatic effect.
				    
				  		}
			 	
			 	});
			   
			   
		 		
		 	}
		 	else if(options.animation == 'matrix'){
		 			
		 		TMax = new TimelineMax({align:'start'});	
		 		var parent = element.parent();
		 		
		 		element.children().each(function(index, value){
		 			
		 			var item = $(this);
		 			var pos = $(this).position();
		 		
		 			 item.css({
		 				 'top':getRandom(-800,0),
		 				 'opacity':0,
		 				 'left':pos.left
		 			 });
		 			
		 			TMax.insert(TweenMax.to($(this),getRandom(0.5,2.5),getMatrixTo(pos.top)));
		 			
		 		});
		 		
		 		TMax.play();
		 		
		 		return true;
		 	}
		 	
		 	
		 	
			if(options.type == 'letters'){  ////////////////////// ANIMATE LETTERS
				TMax = new TimelineMax({align:'start'});
				var nChildren = element.children().length;
				
				var item;
				var pos;
				for(var i=0;i<nChildren;i++){
			         
			         	item = element.children().eq(i);
			         	
			         	if(options.animation == 'explode'){
			         		pos  = item.position();
			         		item.css({'left':pos.left,'top':pos.top});
			         		//console.log(pos.left,pos.top);
						}			         	
				        
				        TMax.insert(TweenMax.to(item, options.duration, getAnimation(options)));
				}
				
				TMax.play();
			}
			else if(options.type == 'words'){ /////////////////////  ANIMATE WORDS
				TMax = new TimelineMax();
				var nChildren = element.children().length;
				var pos;
				
				for(var i=0;i<nChildren;i++){
				
				  if(options.animation == 'explode'){
				  		pos  = element.children().eq(i).offset();
						element.children().eq(i).css({'left':pos.left,'top':pos.top});
				  }	
				  TMax.insert(TweenMax.to(element.children().eq(i), options.duration, getAnimation(options)));
				}
				
				TMax.play();
			}
			else if(options.type == 'lines'){ ///////////////// ANIMATE LINES
				
				TMax = new TimelineMax({align:'normal'});
				$(".split-lines").each(function(){
					$(this).css({'white-space':'nowrap'});
					
					if(options.animation == 'slide'){
					var w = $(this).width();
					
					TMax.insert(
						TweenMax.to($(this),options.duration,getAnimation(options,w)),"-=0.45");
					}
					else{
						var pos  = $(this).offset();
						$(this).css({'left':pos.left,'top':pos.top});
						TMax.insert( TweenMax.to($(this), options.duration, getAnimation(options)) );
					}
				});	
				
				TMax.play();
			}
			
			
		};
		
		// ON REVERSE //
		this.reverse = function(){
			TMax.reverse();
		};
		
		return this;
	};
		////////////////////////////////////////////////////////////////////////////////////////////
		
		
		 var getAnimation = function(options,extra){
			
			if(options.animation == 'explode'){
				return getExplode();
			}
			else if(options.animation == 'slide'){
				return getSlide(extra);
			}
			else if(options.animation == 'opacity'){
				return {autoAlpha:0};
			}
			else if(options.animation == '3D'){
				return get3D();
			}
			else if(options.animation == 'colorize'){
				return getColor();
			}
			else if(options.animation == 'smoke'){
				return getSmoke();
			}
			else if(options.animation == 'typography3D'){
				return getTypography3D();
			}
			else if(options.animation == 'blackout'){
				return getBlackout();
			}
			else if(options.animation == 'glowOnHover'){
				if(options.colorize == null || options.colorize == undefined){
					options.colorize = '#FF0084';
				}
				return glowOnHover(options.colorize);
			}
			else if(options.animation == 'matrix'){
				return getMatrixTo();
			}
			else{
				return 'no animation selected!'
			}
			
		}
		
		function getExplode(){
			
			return {
					       position:'absolute', 
					       left:getRandom(-1000,1000), 
					       top:getRandom(-500,350), 
					       fontSize:"+=35",
					       ease:Circ.easeOut,
					       autoAlpha:0
				      };
			
		}
		
		function getMatrixTo(top){
			
			return {		
							position:'absolute',
							opacity:1,
							top:top,
							color:'#ffffff',
							immediateRender:false,
							ease:Circ.easeOut		
			
			};
			
		}
		
		function getSlide(w){
					
			return	{
							autoAlpha:0,
							marginLeft:w,
							ease:Circ.easeIn
						};
		}
		
		function glowOnHover(color){
			
			return {
				textShadow:"2px 2px 15px "+color,             
    			color: color
			}
		}
		
		function getSmoke(){
			
			return {
				textShadow:"0px 0px 15px #cdcdcd",
    			color:"none" 
			}
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
		
		function getBlackout(){
			return {
				 textShadow:"1px 1px 1px rgba(255, 255, 255, 0.5)",
    			 color:"#000"
			};
		}
		
		function getTypography3D(){
			
			return {
				'text-shadow': 
			   '0 1px 0 #ccc,'+
			   '0 2px 0 #c9c9c9,'+
			   '0 3px 0 #bbb,'+
			   '0 4px 0 #b9b9b9,'+
			   '0 5px 0 #aaa,'+
			   '0 6px 1px rgba(0,0,0,.1),'+
			   '0 0 5px rgba(0,0,0,.1),'+
			   '0 1px 3px rgba(0,0,0,.3),'+
			   '0 3px 5px rgba(0,0,0,.2),'+
			   '0 5px 10px rgba(0,0,0,.25),'+
			   '0 10px 10px rgba(0,0,0,.2),'+
			   '0 20px 20px rgba(0,0,0,.15)'
			};
			
		}
		
		
		///// helper /////
		
		function getColor(){
			if(options.colorize == undefined || options.colorize == null){
				return {color:Math.random() * 0xffffff};	
			}
			else{
				{color:options.colorize};
			}
		}
		
		function getRandom(max, min){
			return Math.floor(Math.random() * (1 + max - min) + min);
		}	
		
		
	
})(jQuery); /// end of plugin ///