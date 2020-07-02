var SHOW_CLUE = true;
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

function draw() {
    translate(width / 2, height / 2);

    if (SHOW_CLUE && !(frameCount % 4)){
        magen_david(step++, 20);
        return;
    }
    
    stroke(128);

    /* Verifica se o mouse está dentro da área de desenho */
    if (inside()) {
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;
        
        /* Verifica se o mouse está pressionado */
        
        if (mouseIsPressed) {
            for (let i = 0; i < symmetry; i++) {
                rotate(angle);
                strokeWeight(stroke_weight);
                stroke(100);
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
    if (SHOW_CLUE && inside()){
        background(255);
        SHOW_CLUE = false;
    }
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