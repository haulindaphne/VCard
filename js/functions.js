// remap jQuery to $
(function($){})(window.jQuery);


/* Tabbs settings  */
$(document).ready(function (){

	$('article:first').show();
	$('ul.menu > li > a:first').addClass('active');
			
	$('ul.menu > li > a').on('click', function(){
		var $this = $(this),
			clicked = $this.attr('href'),
			selArticle = 'article'+clicked;
		$('.active').removeClass('active');
		$this.addClass('active');
		$('article:visible').slideUp(400);
		$(selArticle).delay(400).slideDown(400, 'easeOutBounce');
	});
		
});

/*  prettyPhoto customizations */

$(document).ready(function (){
	$("a[rel^='prettyPhoto']").prettyPhoto({
		gallery_markup: '',
		custom_markup: '',
		social_tools: 'false' /* html or false to disable */
		});

});

/* Slider settings  */

$(document).ready(function (){
	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'),
		imgs = sliderUL.find('img'),
		imgWidth = imgs.width(), 
		imgsLen = imgs.length, 
		current = 1,
		totalImgsWidth = imgsLen * imgWidth;
		console.log(imgWidth); 


	$('#slider-nav').show().find('button').on('click', function() {
		var direction = $(this).data('dir'),
			loc = imgWidth; 
			
		// update current value
		( direction === 'next' ) ? ++current : --current;
		
		// if first image
		if ( current === 0 ) {
			current = imgsLen;
			loc = totalImgsWidth - imgWidth; 
			direction = 'next';
		} else if ( current - 1 === imgsLen ) { // Are we at end? Should we reset?
			current = 1;
			loc = 0;
		}
		
		transition(sliderUL, loc, direction);
	});

	function transition( container, loc, direction ) {
		var unit; // -= +=

		if ( direction && loc !== 0 ) {
			unit = ( direction === 'next' ) ? '-=' : '+=';
		}

		container.animate({
			'margin-left': unit ? (unit + loc) : loc
		});
	}
});

/* Contact form settings */

$(document).ready(function (){
	var input = $(':input');
	input.on('focus', function(){
		$(this).addClass('highlight');
	});	

	input.on('blur', function(){
		$(this).removeClass('highlight');
	});

	$('.contact-form').submit(function(){
		$('.required').removeClass('error');
		$('p.error').remove();
		
		var error = false;
		
		$('.required').each(function() {	
			var fieldName = $(this).attr('name'), 
				emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				
			if( $.trim($(this).val()) == '' ) {
				$(this).parent().prepend('<p class="error">Please enter your ' + fieldName + '.</p>');
				error = true;
			} else if( $(this).hasClass('email') ) {	
				if(!emailReg.test(jQuery.trim($(this).val()))) {
					$(this).parent().prepend('<p class="error">Please enter a valid '+fieldName+'.</p>');
					error = true;
				}
			}
		});
						
		if(!error){
			$('#submit').parent().prepend('<span class="success">The message has been sent. Thanks!</span>');
			var formValues = $(this).serialize();
			
			$.post($(this).attr('action'), formValues, function(data){
				$('.contact-form').before(data);				
			});
			
			$(':input').each(function() {
			    var type = this.type;
			    var tag = this.tagName.toLowerCase(); 
			    if (type == 'text' || tag == 'textarea')
			      this.value = "";
				 });
		}
		
		return false
			
	});	

});


/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/