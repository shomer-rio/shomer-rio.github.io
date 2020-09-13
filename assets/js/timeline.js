function centerDistance( jQElement ) {
	return (jQElement.offset().top - $(window).scrollTop() + jQElement.height() / 2) - $(window).height() / 2;
}

function inside( jQElement ) {
	return ( Math.abs(centerDistance( jQElement )) <= jQElement.height() / 2 )
}

function above( jQElement ) {
	return ( !inside( jQElement ) ) && ( centerDistance( jQElement ) < 0 );
}

function below( jQElement ) {
	return ( !inside( jQElement ) ) && ( centerDistance( jQElement ) > 0 );
}

(function($) {
  	$.fn.timeline = function () {
		var selectors = {
			item: $(this),
			items: $(this).find(".timeline-item"),
			activeClass: "timeline-item--active",
			img: ".timeline__img"
		};

		var active = 0;
		let element = selectors.items.eq( active );
		element.addClass(selectors.activeClass);

		let img_src = element.find(selectors.img).attr("src");
		selectors.item.css("background-image", `url("${img_src}")`);

		$(window).scroll( function () {

			let active_element = $( selectors.items.eq( active ) );
			
			if ( inside( active_element ) ) {
				return
			} else {

				let n = selectors.items.length;

				if (active !== undefined) {
					let element = selectors.items.eq( active );
					element.removeClass(selectors.activeClass);
				} 

				while ( active < (n - 1) && above( active_element ) ){
					active_element = $( selectors.items.eq( ++active ) );
				}
				
				while ( active > 0 && below( active_element ) ){
					active_element = $( selectors.items.eq( --active ) );
				}

				active_element.addClass(selectors.activeClass);

				let img_src = active_element.find(selectors.img).attr("src");
				selectors.item.css("background-image", `url("${img_src}")`);
			}
		});
	}
})(jQuery);

function buildMobileTimeline(filePath) {
	$.getJSON(filePath, function (array) {
  
	let events = []
  
	for (let i=0; i<array.length; i++) {
	  let json = array[i];
  
	  events.push(`
	  <div class="timeline-event">
		<h2 class="timeline-event-title">${json["title"]}</h2>
		<h1 class="timeline-event-date">${json["date"]}</h1>
		<div class="timeline-event-content">
			<img class="timeline-event-img" src="${json["img"]}"/>
			<p class="timeline-event-text">${json["text"]}</p>
		</div>
	  </div>
	  `);
	}
  
	$(".timeline").html(`
	  ${events.join('\n')}
	`);
  });
}

function buildDesktopTimeline(filePath) {
  $.getJSON(filePath, function (array) {

  let events = [];

  for (let i=0; i<array.length; i++) {
    let json = array[i];

    events.push(`
    <div class="timeline-item" data-text="${json["title"]}">
      <div class="timeline__content"><img class="timeline__img" src="${json["img"]}" onerror="this.img='https://shomer-rio.github.io/assets/images/CYNA.jpg'"/>
        <h2 class="timeline__content-title">${json["date"]}</h2>
        <p class="timeline__content-desc">${json["text"]}</p>
      </div>
    </div>
    `);
  }

  $(".timeline").html(`
    ${events.join('\n')}
  `);

  $("#timeline").timeline();
  });
}

function buildTimeline( filePath ) {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { // if mobile
		buildMobileTimeline( filePath )
	} else { // Desktop
		buildDesktopTimeline( filePath )
	}
}