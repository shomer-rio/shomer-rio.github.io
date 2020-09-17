function buildContact( filePath ) {
    $.getJSON(filePath, function ( json ) {
        $('#contact').html(`
            <h1>${json['title']}</h1>
            <h2>${json['subtitle']}</h2>
            <a>
                <i class="fa fa-id-card"></i>
                <span>${json['register']}</span>
            </a>
            <a href="mailto:${json['email']}">
                <i class="fa fa-envelope"></i>
                <span>${json['email']}</span>
            </a>
            <a href="tel:${json['phone']}">
                <i class="fa fa-phone"></i>
                <span>${json['phone']}</span>
            </a>
        `);
    });
}