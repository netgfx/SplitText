var selectedSlide = 'blockWhite';
$(document).ready(function(){
	
	
	var explode = $("#explode").splitText({
		'type':'letters',
		'animation':'explode',
		'useCSS':true
	});
	
	var threeD = $("#threeD").splitText({
		'type':'words',
		'animation':'3D'
	});
	
	var scramble = $("#scramble").splitText({
		'type':'words',
		'animation':'scramble'
	});
	
	var blackout = $("#blackout").splitText({
		'type':'words',
		'animation':'blackout'
	});
	
	var smoke = $("#smoke").splitText({
		'type':'words',
		'animation':'smoke'
	});
	
	var slide = $("#slide").splitText({
		'type':'lines',
		'animation':'slide'
	});
	
	var matrix = $("#matrix").splitText({
		'type':'letters',
		'animation':'matrix'
	});
	
	var machinegun = $("#machinegun").splitText({
		'type':'sentences',
		'animation':'machinegun'
	});
	
	var splitOnlyWords = $("#splitOnlyWords").splitText({
		'type':'words',
		'justSplit':true
	});
	
	var splitOnlyLetters = $("#splitOnlyLetters").splitText({
		'type':'letters',
		'justSplit':true
	});
	
	var splitOnlyLines = $("#splitOnlyLines").splitText({
		'type':'lines',
		'justSplit':true
	});
	
	
	$("#menuList>li").on('click',function(){
		
		var _selectedSlide = String($(this).attr("id")).replace('menu_','');
		var index = $("#mainContainer").children("#"+_selectedSlide).index();
		var nChildren = $("#mainContainer").children().length;
		var currentIndex = $("#mainContainer").children('.selected').index();
				
		if((index < currentIndex)){
			$(".selected").removeClass('selected');
			for(var i=nChildren;i>index;i--){
				
				TweenMax.to($("#mainContainer").children().eq(i),0.8,{'right':-2000,onComplete:function(){
					
				}});
				
			}
		}
		else{
			$(".selected").removeClass('selected');
			
			for(var j=currentIndex;j<=index;j++){
				
				TweenMax.to($("#mainContainer").children().eq(j),0.8,{'right':0,onComplete:function(){
					
				}});
			}
		}
		
		$("#mainContainer").children("div").eq(index).addClass('selected');
		
		TweenMax.delayedCall(0.8, function(){
			if($(".selected").attr('id') == 'blockNavyBlue'){
					machinegun.animate();
				}
		});
		
		selectedSlide = _selectedSlide;
		
	});
	
	
	$(".play").on('click',function(){
		
		if(selectedSlide == 'blockWhite'){
			slide.animate();
		}
		else if(selectedSlide == 'blockGrey'){
			smoke.animate();
		}
		else if(selectedSlide == 'blockRed'){
			explode.animate();
		}
		else if(selectedSlide == 'blockGreen'){
			threeD.animate();
		}
		else if(selectedSlide == 'blockBlue'){
			scramble.animate();
		}
		else if(selectedSlide == 'blockBlack'){
			blackout.animate();
		}
		else if(selectedSlide == 'blockBlack2'){
			matrix.animate();
		}
		else if(selectedSlide == 'blockNavyBlue'){
			machinegun.animate();
		}
		else if(selectedSlide == 'blockOrange'){
			
			$("#"+splitOnlyWords.id).empty().html(splitOnlyWords.value);
			
			console.log(splitOnlyLetters.value);
			$("#"+splitOnlyLetters.id).empty().html(splitOnlyLetters.value);
			
			console.log(splitOnlyLines.value);
			$("#"+splitOnlyLines.id).empty();
			
			$.each(splitOnlyLines.value,function(index,value){
				
				var item = "<div class='split-lines'>"+value.text+"</div>";
				
				$("#"+splitOnlyLines.id).append(item);
				
			});
			
			$("#blockOrange>.splitText>div").addClass('justSplit');
		}
		
	});
	
	// undo //
	$(".arrowleft").on('click',function(){
		if(selectedSlide == 'blockWhite'){
			slide.reverse();
		}
		else if(selectedSlide == 'blockGrey'){
			smoke.reverse();
		}
		else if(selectedSlide == 'blockRed'){
			explode.reverse();
		}
		else if(selectedSlide == 'blockGreen'){
			threeD.reverse();
		}
		else if(selectedSlide == 'blockBlue'){
			scramble.reverse();
		}
		else if(selectedSlide == 'blockBlack'){
			scramble.reverse();
		}
		else if(selectedSlide == 'matrix'){
			matrix.reverse();
		}
		else if(selectedSlide == 'blockNavyBlue'){
			machinegun.reverse();
		}
	});
	
	$(".next").on('click',function(){
		
		var nChildren = $("#mainContainer").children().length;
		var index = $("#mainContainer").children(".selected").index();
		
		if(index == 0){console.log('the end');}
		else{
			TweenMax.to($(".selected"),0.8,{'right':-2000,onComplete:function(){
				$(".selected").removeClass('selected');
				$("#mainContainer").children("div").eq(index-1).addClass('selected');
				selectedSlide = $("#mainContainer").children("div").eq(index-1).attr('id');
				
				if($(".selected").attr('id') == 'blockNavyBlue'){
					machinegun.animate();
				}
				
			}});
		}
	});
	
	$(".back").on('click',function(){
		var nChildren = $("#mainContainer").children().length;
		var index = $("#mainContainer").children(".selected").index();
		
		if(index == nChildren-1){}
		else{		
			$(".selected").removeClass('selected');
			$("#mainContainer").children("div").eq(index+1).addClass('selected');
			selectedSlide = $("#mainContainer").children("div").eq(index+1).attr('id');
			
			TweenMax.to($(".selected"),0.8,{'right':0,onComplete:function(){
				
				if($(".selected").attr('id') == 'blockNavyBlue'){
					machinegun.animate();
				}
				
			}});
		}
	});
	
	$(".home").on('click',function(){
		console.log('home');
		var nChildren = $("#mainContainer").children().length;
		
		var index = $("#mainContainer").children(".selected").index();
		
		$("#mainContainer").children().each(function(){
			
			TweenMax.to($(this),0.4,{'right':0,onComplete:function(){
					
			}});
		});
		
		$(".selected").removeClass('selected');
		$("#mainContainer").children("div").eq(nChildren-1).addClass('selected');
		selectedSlide = $("#mainContainer").children("div").eq(nChildren-1).attr('id');
		
		
		
	});
	
});