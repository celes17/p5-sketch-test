let sx, sy, ex, ey;
let lines = [];
let shadow_lines = [];
let slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 100, 5);
  slider.position(0, 600);
}

function draw() {
  background(0);

  //to draw strokes
  for (let l of lines) {
    l.display();
  }

  //to show unfinished strokes
  for (let i = 0; i < shadow_lines.length; i++) {
    shadow_lines[i].shadow();
    shadow_lines.splice(i, 1);
  }

  //to show cursor
  cursor1 = new Cursor(mouseX, mouseY, slider.value(), slider.value());
  cursor1.display();
}

function mouseClicked() {
  ex = mouseX;
  ey = mouseY;
  let l = new Line(sx, sy, ex, ey, slider.value());
  lines.push(l);
}

function mousePressed() {
  sx = mouseX;
  sy = mouseY;
}

function mouseDragged() {
  ex = mouseX;
  ey = mouseY;
  let shadow_l = new Line(sx, sy, ex, ey, slider.value());
  shadow_lines.push(shadow_l);
}

class Line {
  constructor(sx, sy, ex, ey, weight) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    this.weight = weight;
  }

  shadow() {
    stroke(255, 100);
    strokeWeight(this.weight);
    line(this.sx, this.sy, this.ex, this.ey);
  }

  display() {
    stroke(255);
    strokeWeight(this.weight);
    line(this.sx, this.sy, this.ex, this.ey);
  }
}

class Cursor {
  constructor(x, y, sizex, sizey) {
    this.x = x;
    this.y = y;
    this.sizex = sizex;
    this.sizey = sizey;
  }

  display() {
    noStroke();
    fill(255, 100);
    ellipse(this.x, this.y, this.sizex, this.sizey);
  }
}
