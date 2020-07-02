var div_element = document.getElementById('chanichimot');
var width = div_element.offsetWidth;
var height = div_element.offsetHeight;

function setup(){
    createCanvas(width, height);
}

function draw() {
    translate(width / 2, height / 2);

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
          let sw = sizeSlider.value();
          strokeWeight(sw);
          line(mx, my, pmx, pmy);
          push();
          scale(1, -1);
          line(mx, my, pmx, pmy);
          pop();
        }
      }
    }
  }