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

function draw() {
    translate(width / 2, height / 2);

    stroke(128);

    /* Verifica se o mouse está dentro da área de desenho */
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;
        
        /* Verifica se o mouse está pressionado */
        
        if (mouseIsPressed) {
            for (let i = 0; i < symmetry; i++) {
                rotate(angle);
                strokeWeight(stroke_weight);
                line(mx, my, pmx, pmy);
                push();
                scale(1, -1);
                line(mx, my, pmx, pmy);
                pop();
            }
        }
    }
}

function windowResized() {
    resizeCanvas(width, height);
}