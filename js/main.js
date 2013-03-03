
$(document).ready(function(){
	
	
	var split = $(".splitText").splitText({'type':'words','animation':'glowOnHover','useLite':true});
	
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
	
	$("#type").on('change',function(){
		
		var value = $(this).val();
		var opts = {'type':value,'animation':'explode','useLite':true};
		
		if(value == 'lines'){
			opts.animation = 'slide';
		}
		
		split = $(".splitText").splitText(opts);
		
	});

 });


