function buildContact( filePath ) {
    $.getJSON(filePath, function ( json ) {
        $('#contact').html(`
        <div class="info">
            <h1>${json['title']}</h1>
            <h2>${json['subtitle']}</h2>
            <a>
                <i class="fa fa-id-card fa-fw"></i>
                <span>${json['register']}</span>
            </a>
            <a href="mailto:${json['email']}">
                <i class="fa fa-envelope fa-fw"></i>
                <span>${json['email']}</span>
            </a>
            <a href="tel:${json['phone']}">
                <i class="fa fa-phone fa-fw"></i>
                <span>${json['phone']}</span>
            </a>
        </div>
        <a href="./" class="logo">
            <img src="https://shomer-rio.github.io/assets/images/color_semel_750px.png" alt="Shomer"/>
        </a>
        `);
    });
}