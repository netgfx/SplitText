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