$.fn.timeline = function () {
	var selectors = {
		id: $(this),
		item: $(this).find(".event"),
		activeClass: "event--active",
		img: ".timeline img"
	};
	
	//
	selectors.item.eq(0).addClass(selectors.activeClass);
	
	// Adds background image as the first one
	selectors.id.css("background-image", `url(${selectors.item.first().find(selectors.img).attr("src")})`);

	// Get item lenght
	var itemLength = selectors.item.length;

	// Triggered by srolling
	$(window).scroll(function() {
		var max, min;
		var pos = $(this).scrollTop(); // Scroll position

		selectors.item.each(function(i) {
			min = $(this).offset().top;
			max = $(this).height() + $(this).offset().top;
		  
			if (i == itemLength - 2 && pos > min + $(this).height() / 2) {
				selectors.item.removeClass(selectors.activeClass);
				selectors.id.css("background-image",`url(${selectors.item.last().find(selectors.img).attr("src")})`);
				selectors.item.last().addClass(selectors.activeClass);
		  	} else if (pos <= max - 40 && pos >= min) {
				selectors.item.removeClass(selectors.activeClass);
				selectors.id.css("background-image", `url(${$(this).find(selectors.img).attr("src")})`);
				$(this).addClass(selectors.activeClass);
		  	}
		});
	});
}

function buildTimeline(filePath) {
    $.getJSON(filePath, function (array) {

		let events = ""

		for (let i=0; i<array.length; i++) {
			let json = array[i];

			events += `
			<div class="event" data-text="${json["title"]}"><img src="${json["img"]}"/>
				<h2>${json["date"]}</h2>
				<p>${json["text"]}</p>
			</div>
			`
		}

		$(".timeline").html(`
			${events}
		`);

		$("#timeline").timeline();
    });
}