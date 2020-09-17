function buildContact( filePath ) {
    $.getJSON(filePath, function ( json ) {
        $('#contact').html(`
            <h1>${json['title']}</h1>
            <h2>${json['subtitle']}</h2>
            <i class="fa fa-id-card"><span>${json['register']}</span></i>
            <a class="fa fa-envelope" href="mailto:${json['email']}"><span>${json['email']}</span></a>
            <a class="fa fa-phone" href="tel:${json['phone']}"><span>${json['phone']}</span></a>
        `);
    });
}