function buildContact( filePath ) {
    $.getJSON(filePath, function ( json ) {
        $('#contact').html(`
            <h1>${json['title']}</h1>
            <h2>${json['subtitle']}</h2>
            <p class="fa fa-address-card">${json['register']}</p>
            <a class="fa fa-envelope" href="mailto:${json['email']}">${json['email']}</a>
            <a class="fa fa-phone" href="tel:${json['phone']}">${json['phone']}</a>
        `);
    });
}