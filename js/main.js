
function changeMetaColor(pos){
	var B = document.body.scrollHeight;
	var i = ~~((pos-76)*5/B);
	var myBack = [
		'#111632', '#f0f3ff', '#f0f6ff', '#eef7f9', '#ffffff'
	];
	var metaColor = document.querySelector("meta[name=theme-color]") ;
	metaColor.setAttribute("content", myBack[i]);

}

// Parallax
/*
$(document).ready(function(){
var velocity = 0.1;
function update(){ 
    var pos = $(window).scrollTop(); 
    $('.left').each(function() { 
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity - 0.3 * height) + 'px'); 
    }); 
};

$(window).bind('scroll', update);
});
*/

$(document).ready(function() {
  $(document).on("scroll", onScroll);

  //smoothscroll
  $('.box').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");
    var target = this.hash,
      menu = target;
    $target = $(menu);
    var navtop1 = $(".intro").offset().top + $(".intro").outerHeight(true),
      scrollPos1 = $(document).scrollTop(),
      targetPos = $target.offset().top;
	  scrollSpeed1 = Math.abs((navtop1 - scrollPos1)/(scrollPos1-targetPos))*500;
	  scrollSpeed2 = Math.abs((targetPos - navtop1)/(scrollPos1-targetPos))*500;
	  scrollSpeed = 500;

		$target.find('.titletext').removeClass("show");

    $('.box').each(function() {
      if (!$(this).hasClass('box-down') && scrollPos1 > navtop1) {
        $(this).addClass('flip-b box-down').delay(500).queue(function() {
          $(this).removeClass('flip-b').dequeue()
        });
      }
    });
    $(this).removeClass('box-down').addClass('flip').delay(500).queue(function() {
      $(this).removeClass('flip').dequeue()
    });

    if (targetPos > navtop1 && scrollPos1 < navtop1) {
      $('html, body').stop().animate({
        'scrollTop': navtop1
      }, scrollSpeed1, 'linear', function() {
        $('nav').addClass('navfix');
        //	    $(".box").addClass('box-down');
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top
        }, scrollSpeed2, 'linear', function() {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
          $(".box").addClass('box-down');
          $(this).removeClass('box-down');
        });
      });
   }else if (targetPos < navtop1 && scrollPos1 > navtop1) {
      $('html, body').stop().animate({
        'scrollTop': navtop1
      }, scrollSpeed1, 'linear', function() {
        $('nav').removeClass('navfix');
        $(".box").removeClass('box-down');
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top
        }, scrollSpeed2, 'linear', function() {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        });
      });
    }else if(targetPos >= navtop1 && scrollPos1 >= navtop1) {
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, scrollSpeed, 'swing', function() {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    }else {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
    }
		changeMetaColor(targetPos+200);
  });
});



function onScroll(event) {
	var scrollPos = $(document).scrollTop() + 200;
	$('.box').each(function() {
		var currLink = $(this);
		var refElement = $(currLink.attr("href"));
		if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			currLink.removeClass("box-down");
		} else {
			currLink.addClass("box-down");
		}
	});
	$('.titletext').each(function() {
		var currLink = $(this);
		var refElement = $(currLink.attr("href"));
		if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			currLink.removeClass("show");
		} else {
			currLink.addClass("show");
		}
	})
	var navtop = $(".intro").offset().top + $(".intro").outerHeight(true)
	if (navtop <= scrollPos - 200) {
		$("nav").addClass('navfix')
	} else {
		$("nav").removeClass('navfix');
		$(".box").removeClass('box-down')
	}
	changeMetaColor(scrollPos);
}


//Toggle element in line
function toggle(elementId) {
	var ele = $('#' + elementId);
	if (ele.css('display') == 'none') {
		ele.css('display', 'block')
	} else {
		ele.css('display', 'none')
	}
}

$(document).ready(function() {
	$('.abstract').on('click', function() {
		if ($(this).find('.long').css('display') == 'none') {
			$(this).find('.long').css('display', 'block');
			$(this).find('.short').css('display','none');
		} else {
			$(this).find('.long').css('display', 'none');
			$(this).find('.short').css('display','block');
		}
	})
});

$(document).ready(function() {
	$('.long').each(function(){
		$(this).find('p').append("<a> [&#9652Less]</a>")
	});
	$('.short').each(function(){
		$(this).find('p').append("<a> [&#9662More]</a>")
	});
});

$(document).ready(function() {
	resizeText();
	var resizeId;
	$(window).on('resize', function() {
		clearTimeout(resizeId);
		resizeId = setTimeout(resizeText, 250);
		        resizeText();
	});
	$(window).on('mousemove', function() {
		$('*').css('transition-property','');
	});

	function resizeText() {
		// Standard height, for which the body font size is correct
		var preferredFontSize = 16; // %

/*		var preferredSize = 1920 * 1080;
		var currentSize = $(window).width() * $(window).height();
		var scalePercentage = Math.sqrt(currentSize) / Math.sqrt(preferredSize);
		scalePercentage = Math.sqrt(scalePercentage);
		var newFontSize = preferredFontSize * scalePercentage; */

		var preferredNumber = 70
		var currentSize = $(window).width()/Math.pow(Math.max(1,0.6*$(window).width()/$(window).height()),0.6)
		var currentSizeP
		var currentSizeC
		var ratio=0.5
		var fontLargeP=1.5
		var fontLargeC=1.5
		if (currentSize >2560 ){
			currentSize=2560*ratio;
			currentSizeP=currentSize;
			currentSizeC=currentSize
		}
		else if (currentSize<400){
			currentSize=currentSize*0.95;
			currentSizeC=currentSize*fontLargeC;
			currentSizeP=currentSize*fontLargeP
		}
		else {
			currentSizeP=(ratio+Math.pow((2560-currentSize)/2160,2)*(fontLargeP-ratio))*currentSize;
			currentSizeC=(ratio+Math.pow((2560-currentSize)/2160,3)*(fontLargeC-ratio))*currentSize;
			currentSize=(0.95-(0.95-ratio)*(currentSize-400)/2160)*currentSize;
		}
		var newFontSize = Math.round(currentSizeC/preferredNumber);
		var firstHeight = Math.max(50*newFontSize,$(window).height());
		var paraFontSize = Math.max(Math.round(currentSizeP/preferredNumber),12);
		var baseLength = 8 * newFontSize;
		var navHeight = baseLength +0.5*newFontSize;
		
		$('*').css('transition-property','none');
		$('.col').css("width",currentSize+'px');
		$('.col1').css("min-height",firstHeight+'px');
		$('pagetitle').css("height",navHeight+'px');

		
		$(".col1").css("font-size", newFontSize + 'px');
		$('.col').css("font-size", paraFontSize+ 'px');
		$('pagetitle').css("font-size",newFontSize+'px')
	};
})

function shadeColor2(color, percent) {   
	var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

$(document).ready(function() {
	var myColors = [
		'#3f51b5','#3f51b5', '#5677fc', '#03a9f4', '#00bcd4', '#24c7c7'
	];

	var myBack = [
		'#e1e1ee', '#111632' , '#f0f3ff', '#f0f6ff', '#eef7f9', '#ffffff'
	];
	var i = 1;
	$('.box').each(function() {
		$(this).css('background-color', myColors[i]);
		i = (i + 1) % myColors.length;
	});

	var i = 1;
	$('section').each(function() {
		$(this).find('.col a').css('color', shadeColor2(myColors[i],-0.2));
		$(this).find('hr').css('background-color', myColors[i]);
		$(this).css('background-color', myBack[i]);
		i = (i + 1) % myColors.length;
	});

});

function is_touch_device() {
	return 'ontouchstart' in window        // works on most browsers 
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
};
$(document).ready(function() {
	if ( !is_touch_device() ) {
		$('html').addClass('no-touch').removeClass('touch')
	} 
	else{
		$('html').addClass('touch').removeClass('no-touch')
	}
});

function sort_li(a, b) {
	return ($(b).data('position')) > ($(a).data('position')) ? 1 : -1;
}

$(document).ready(function() {
	$("#wp .topic").each(function(){$(this).css('display', 'none')});
	$("#wp li").wrapAll('<ul class="listitems autosort" />');
	$(".listitems.autosort li").sort(sort_li).appendTo('.listitems.autosort');
	$('.sort').on('click', function() {
		if (!$(this).hasClass('sorted')){
			$("#wp li").unwrap();
			$("#wp .topic").each(function(){
				$(this).css('display', 'block');
				$("#wp li[title='"+$(this).text()+"']").insertAfter($(this)).wrapAll('<ul class="listitems" />');
			})
			//		sort_list();
			$('.sort').addClass('sorted')
			$('.sort').text('by date')
		}
		else{
			$("#wp li").unwrap();
			$("#wp .topic").each(function(){$(this).css('display', 'none')});
			$("#wp li").wrapAll('<ul class="listitems" />');
	$(".listitems li").sort(sort_li).appendTo('.listitems');			//				sort_list();
			$('.sort').removeClass('sorted')
			$('.sort').text('by topics')
		}
	})
});


$(document).ready(function() {
	$('.outfill').on('click',(function() {
		$(this).find('.card').toggleClass('flipped')
	}));

	$('.titletext').on('click',(function(e){e.preventDefault();}));
});
