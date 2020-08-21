(function($) {
  $.fn.timeline = function() {
    var selectors = {
      id: $(this),
      item: $(this).find(".timeline-item"),
      activeClass: "timeline-item--active",
      img: ".timeline__img"
    };

    selectors.item.eq(0).addClass(selectors.activeClass);
    selectors.id.css("background-image", `url("${selectors.item.first().find(selectors.img).attr("src")}")"`);
    
    var itemLength = selectors.item.length;
    $(window).scroll(function() {
      var max, min;
      var pos = $(this).scrollTop();
      selectors.item.each(function( i ) {
        min = $(this).offset().top;
        max = $(this).height() + min;

        console.log('i = ', i, 'min = ', min, 'max = ', max, 'pos = ', pos);

        if (i == itemLength - 2 && pos > ((min + max) / 2)) {
          selectors.item.removeClass(selectors.activeClass);
          selectors.id.css("background-image", `url("${selectors.item.last().find(selectors.img).attr("src")}")"`);
          selectors.item.last().addClass(selectors.activeClass);

        } else if (min <= pos && pos <= max) {
          selectors.id.css("background-image", `url("${$(this).find(selectors.img).attr("src")}")"`);
          selectors.item.removeClass(selectors.activeClass);
          $(this).addClass(selectors.activeClass);
        }
      });
    });
  };
})(jQuery);

function buildTimeline(filePath) {
  $.getJSON(filePath, function (array) {

  let events = ""

  for (let i=0; i<array.length; i++) {
    let json = array[i];

    events += `
    <div class="timeline-item" data-text="${json["title"]}">
      <div class="timeline__content"><img class="timeline__img" src="${json["img"]}"/>
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