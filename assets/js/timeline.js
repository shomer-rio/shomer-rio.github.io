function centerDistance( jQElement ) {
	return Math.abs((jQElement.offset().top - $(window).scrollTop() + jQElement.height() / 2) - $(window).height() / 2);
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
		element.addClass(selectors.addClass);
		let img_src = element.find(selectors.img).attr("src");
		selectors.item.css("backgroud-image", `url("${img_src}")`);

		$(window).scroll( function () {
			var closest = {
				index: null,
				distance: Infinity
			};
		
			console.log('scrolling');

			selectors.items.each( function ( i ) {
				let element = $( selectors.items.eq( i ) );
				let distance = centerDistance( element );
		
				if (distance < closest.distance) {
					closest.index = i;
					closest.distance = distance;
				}
			});
		
			if (closest.index !== null) {
				if (active !== undefined) {
					let element = selectors.items.eq( active );
					element.removeClass(selectors.activeClass);
				} 
				active = closest.index;
				let element = selectors.items.eq( active );
				element.addClass(selectors.addClass);
				let img_src = element.find(selectors.img).attr("src");
				selectors.item.css("backgroud-image", `url("${img_src}")`);

				console.log('setting image @', element);
			}
		});
	}
})(jQuery);

function buildTimeline(filePath) {
  $.getJSON(filePath, function (array) {

  let events = ""

  for (let i=0; i<array.length; i++) {
    let json = array[i];

    events += `
    <div class="timeline-item" data-text="${json["title"]}">
      <div class="timeline__content"><img class="timeline__img" src="${json["img"]}" onerror="this.img='https://shomer-rio.github.io/assets/images/CYNA.jpg'"/>
        <h2 class="timeline__content-title">${json["date"]}</h2>
        <p class="timeline__content-desc">${json["text"]}</p>
      </div>
    </div>
    `
  }

  $(".timeline").html(`
    ${events}
  `);

  $("#timeline").timeline();
  });
}