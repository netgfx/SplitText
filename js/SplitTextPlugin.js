 ///////////////////////////////      PLUGIN         //////////////////////////////
 
(function($){ 
	
	$.fn.splitText = function(options){
		
		// options //
		// type = 'lines','words','letters'
		// animation = 'explode','slide','opacity','3D','colorize','smoke','glowOnHover'
		// justSplit = 'lines','words','letters'
		// duration = ...in seconds
		// colorize = color hex (if effect is colorize) or glowOnHover
		// scale    = boolean
		// useLite  = boolean
		
		// default
		var opts = {
			'type'		: 'lines',
			'animation'	: 'explode',
			'justSplit' : false,
			'duration'	: 1.0,
			'scale'		: true,
			'useLite'	: false,
			'colorize'	: null
		};
		
		if(options == null || options == undefined || options == '' || (options.type !== 'words' && options.type !== 'lines' && options.type !== 'letters')){
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
			element.attr('id',String(Math.round(Math.random()*100+42)));
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
		
			$("<style>"+
			".splitText{width: 600px;float: left;margin-top: 90px;margin-left: 20px;font-size:20px;}"+
			".splitText>div{white-space:pre-line;float:left;margin-right:5px;cursor:default;}"+
			".letter-measure{margin-right:0 !important;cursor:default;}"+
			".blank{margin-right:0px !important;white-space: pre !important;}"+
			"</style>").appendTo(document.documentElement);
		}
		
		
		//// SET ANIMATION TYPE ///
		
		
		if(options.type=='lines'){
			
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
		 	
		 	
			if(options.type == 'letters'){  ////////////////////// ANIMATE LETTERS
				TMax = new TimelineMax({align:'start'});
				var nChildren = element.children().length;
				
				var item;
				var pos;
				for(var i=0;i<nChildren;i++){
			         
			         	item = element.children().eq(i);
			         	pos  = item.offset();
			         	item.css({'left':pos.left,'top':pos.top});
			         	
				        TMax.insert(TweenMax.to(item, options.duration, getAnimation(options), 'explode'));
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
				  TMax.insert(TweenMax.to(element.children().eq(i), options.duration, getAnimation(options), "3D"));
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
						TweenMax.to($(this),options.duration,{
							autoAlpha:0,
							marginLeft:w,
							ease:Circ.easeIn}),"-=0.45");
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
		
		
		 var getAnimation = function(options){
			
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
			else if(options.animation == 'colorize'){
				return getColor();
			}
			else if(options.animation == 'smoke'){
				return getSmoke();
			}
			else if(options.animation == 'glowOnHover'){
				if(options.colorize == null || options.colorize == undefined){
					options.colorize = '#FF0084';
				}
				return glowOnHover(options.colorize);
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