var selectedSlide = 'blockWhite';
$(document).ready(function(){
	
	
	
	var explode = $("#explode").splitText({
		'type':'letters',
		'animation':'explode'
	});
	
	var threeD = $("#threeD").splitText({
		'type':'words',
		'animation':'3D'
	});
	
	var smoke = $("#smoke").splitText({
		'type':'words',
		'animation':'smoke'
	});
	
	var slide = $("#slide").splitText({
		'type':'lines',
		'animation':'slide'
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
	});
	
	$(".next").on('click',function(){
		
		var nChildren = $("#mainContainer").children().length;
		var index = $("#mainContainer").children(".selected").index();
		
		
		TweenMax.to($(".selected"),0.8,{'right':-2000,onComplete:function(){
			$(".selected").removeClass('selected');
			$("#mainContainer").children("div").eq(index-1).addClass('selected');
			selectedSlide = $("#mainContainer").children("div").eq(index-1).attr('id');
		}});
		
		
		
	});
	
	$(".back").on('click',function(){
		
		var nChildren = $("#mainContainer").children().length;
		
		
		
	});
	
});