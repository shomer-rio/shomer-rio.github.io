var PEN = true;
var SHOW_CLUE = true;

var color_step = 0;
var color_stop = 100;

var magen_step = 0;

let symmetry = 6;
let angle = 360 / symmetry;

let stroke_weight = 4;

function hsv_to_rgb(h, s=1.0, v=1.0) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        ~~Math.round(r * 255),
        ~~Math.round(g * 255),
        ~~Math.round(b * 255)
    ];
}

function setup() {
    var canvas_div = document.getElementById('chanichimot');
    var width = canvas_div.offsetWidth;
    var height = canvas_div.offsetHeight;
    var canvas = createCanvas(width, height);   

    canvas.parent("chanichimot");
    angleMode(DEGREES);
}

function inside(){
    return (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
}

function pick_color(i, n){
    return hsv_to_rgb(
        (i % n) / n, // color
        0.7, // saturation (0.5 = pastel)
        0.95  // lightness
        );
}

function draw() {
    if (!PEN) {
        return
    }
    translate(width / 2, height / 2);

    if (SHOW_CLUE && !(frameCount % 4)){
        magen_david(magen_step++, 20);
        return;
    }
    /* Verifica se o mouse está dentro da área de desenho */
    if (inside()) {
        /* Verifica se o mouse está pressionado */
        if (mouseIsPressed) {
            let mx = mouseX - width / 2;
            let my = mouseY - height / 2;
            let pmx = pmouseX - width / 2;
            let pmy = pmouseY - height / 2;
            strokeWeight(stroke_weight);
            COLOR = pick_color(color_step++, color_stop)
            stroke(COLOR[0], COLOR[1], COLOR[2]);
            for (let i = 0; i < symmetry; i++) {
                rotate(angle);                
                line(mx, my, pmx, pmy);
                push();
                scale(1, -1);
                line(mx, my, pmx, pmy);
                pop();
            }
        }
    }
}

function mousePressed() {
    if (!inside()) {
        PEN = false;
        return
    }
    if (SHOW_CLUE){
        background(255);
        SHOW_CLUE = false;
    }
}

function mouseReleased() {
    PEN = true;
}

function windowResized() {
    resizeCanvas(width, height);
}

// Dica de como desenhar a Magen David
function magen_david(step=0, total=10, offset=30) {
    step = step % (total + offset)
    if (step > total) return;

    if (!step) {
        background(255);
    }

    let dx = (height / 4) * Math.sqrt(3);
    let y = (height / 4);

    strokeWeight(5);
    stroke(0);
   
    let x = lerp(-dx, 0, step/total);
    point(x, y);
}