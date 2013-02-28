
$(document).ready(function(){
	
	
	var split = $(".splitText").splitText({'type':'words','animation':'explode'});

	$("#letters").on('click',function(){
		split.animate();
	});
	
	$("#words").on('click',function(){
		split.animate();
	});
	
	$("#lines").on('click',function(){
		split.animate();
	});
	
	$("#reverse").on('click',function(){
		split.reverse();
	});

 });


