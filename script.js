let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;
let terrain = [];
let flying = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  flying -= 0.05; // Animation ki speed
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(240, 242, 245); // Light gray background
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      // Line ka color (Purple/Blue mix jaisa video mein tha)
      stroke(142, 68, 173, 150); 
      noFill();
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

VANTA.WAVES({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x9b59b6, // Purple shade
  shininess: 60.00,
  waveHeight: 20.00,
  waveSpeed: 0.80,
  zoom: 0.90
})