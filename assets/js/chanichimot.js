var PEN = true;
var SHOW_CLUE = true;
var COLORS = [
    //'red'
    [255, 0, 0],
    // 'orange'
    [255, 127, 0],
    // 'yellow'
    [255, 255, 0],
    // 'green'
    [0, 255, 0],
    // 'blue'
    [0, 0, 255],
    // 'indigo'
    [46, 43, 95],
    // 'violet'
    [139, 0, 255]
    ];
var COLOR = [0,0,0] // black
var color_step = ~~(Math.random() * COLORS.length);

var step = 0;

let symmetry = 6;
let angle = 360 / symmetry;

let stroke_weight = 4;

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

function pick_color(){
    return COLORS[(color_step++) % COLORS.length]
}

function draw() {
    if (!PEN) {
        return
    }
    translate(width / 2, height / 2);

    if (SHOW_CLUE && !(frameCount % 4)){
        magen_david(step++, 20);
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
    COLOR = pick_color();
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