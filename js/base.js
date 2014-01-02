var currentOverlay = 0,
	category = "",
	contHeight = $(window).height(),
	margot = {
	init : function(){
		//sticky nav
		var $window = $(window);
		$window.bind('scroll', function() {
			var pos = $window.scrollTop();
			if (pos > 162)  { 
				$('.menuCont').addClass('menuFixed'); 
				$('.top').addClass('show');
			}
			else  {
				$('.menuCont').removeClass('menuFixed'); 
				$('.top').removeClass('show');
			}
		});

		//smooth scroll
		$('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		});

		//waypoints
		var offset = 0;
		$('.block').waypoint(function(direction){ 
			var id = $(this).attr('id');
			$('.menu ul li a').removeClass('active');
			if(direction=='down') $('.menu ul li a[href=#'+id+']').addClass('active');
			else $('.menu ul li a[href=#'+id+']').parent('li').prev('li').children('a').addClass('active');
		});	

		//trigger overlay 
		$('.block').on('click','div.item[rel]:not(.disabled)',function(){ margot.overlay(this,1,1); });
		$('.block').on('click','div.item.disabled[rel]',function(){ /*alert("Available upon request");*/ });

		//prev / next logic
		$('.overlay').on('click','.prev',function(){ currentOverlay --; margot.overlay(this,0,0); });
		$('.overlay').on('click','.next',function(){ currentOverlay ++; margot.overlay(this,0,0); });

		//close overlay
		$('.overlay').on('mouseenter','.close',function(){ TweenMax.to('.close', 0.25, { rotation:180, ease:Linear.easeNone }); });
		$('.overlay').on('mouseleave','.close',function(){ TweenMax.to('.close ', 0.25, { rotation:360, ease:Linear.easeNone }); });
		$('.overlay').on('click','.close',function(){ margot.clearOverlay(1); });

		$('.header').on('click','.logo',function(){ 
			TweenMax.to('.landingCont', 2, {top:"0px", ease:Power1.easeInOut});
			TweenMax.to('.landingCont', 2, {top:-contHeight, delay:4, ease:Power1.easeInOut});
		});

	},
	overlay: function(that,cat,slide){

			if(cat) category = $(that).parent('.content').parent('.block').attr('id');

			var source = $('#overlay-template').html(),
	            template = Handlebars.compile(source),
	            project = $(that).attr('rel'),
	            length = data[category][project].length - 1;

	        if(currentOverlay<0) currentOverlay = length;
			else if(currentOverlay>length) currentOverlay = 0;

			Handlebars.registerPartial("project", project);

			Handlebars.registerHelper('if_eq', function() {
			    if(length > 0){
			        return '<div rel="'+project+'" class="prev"></div><div rel="'+project+'" class="next"></div>';
			    }
			});

	        var context = data[category][project][currentOverlay],
	            html = template(context);

	       	//console.log(context)

	       	//clear current content and add new
	        margot.clearOverlay(0);
	        $('.overlay').append(html);

	        //animate overlay in
	        contHeight = $(window).height();
	        if(slide) TweenMax.to('.overlayContainer', 0.5, { height:contHeight });
	        else TweenMax.to('.overlayContainer', 0, { height:contHeight });
	        TweenMax.to('.menuCont', 0.5, { opacity:0 });

	        //preload next image
	        var preload = currentOverlay + 1;
	        try { jQuery.preLoadImages(data[category][project][preload].image); }
	        catch(e){ console.log(e); }
	},
    clearOverlay: function(reset){ 
    	if(reset) { 
    		currentOverlay = 0;
    		TweenMax.to('.overlayContainer', 0.5, { height:0, onComplete:function(){ $('.overlay').find('.overlayContainer').remove(); } });
    		TweenMax.to('.menuCont', 0.5, { opacity:1, delay:0.5 });
    	}
    	else { $('.overlay').find('.overlayContainer').remove(); }
    }
}

$(window).load(function() {
	TweenMax.to('.loading', 0.25, {opacity:0 });
	TweenMax.to('.landingCont', 2, {top:-contHeight, delay:0.25, ease:Power1.easeInOut});
	TweenMax.to('.nav', 2, {opacity:1, delay:1 });
	TweenMax.to('.footer', 2, {opacity:0.8, delay:1 });
	TweenMax.to('.block ', 2, {opacity:1, delay:2 });
	margot.init();
});

//simple preloader
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
    	console.log(arguments[i])
      	var cacheImage = document.createElement('img');
      	cacheImage.src = arguments[i];
      	cache.push(cacheImage);
    }
  }
})(jQuery)