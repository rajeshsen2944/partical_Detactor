const g = require("./geometry");
const r = require("raylib");

const WINDOW_TITLE = "Particle Detactor";   //window Property
const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 300;

function setup() {
  r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, WINDOW_TITLE);
  r.SetTargetFPS(50);
  r.SetWindowPosition(1200, 200);
}
function running() {
  return !r.WindowShouldClose();
}
function teardown() {
  r.CloseWindow();
}

//drawing functions
function scannerDraw(scanner) {
  r.DrawRectangle(scanner.x, scanner.y, scanner.width, scanner.height, scanner.color);
}
function particleDraw(particle, color) {
  r.DrawRectangle(particle.x, particle.y, particle.width, particle.height, color);
}

//color Setup
const bgColor = r.BLACK;
const scannerDefaultColor = r.WHITE;
const scannerDetactColor = r.RED;
const particleColor = r.SKYBLUE;

//-------------------------------- Define scanners
let scanner1 = {
  x: 0,
  y: 0,
  width: WINDOW_WIDTH / 15,
  height: WINDOW_HEIGHT,
  speed: 1,
  color: scannerDefaultColor,
  dir: "vertical",
}
let scanner2 = {
  x: WINDOW_WIDTH / 2,
  y: 0,
  width: WINDOW_WIDTH / 15,
  height: WINDOW_HEIGHT,
  speed: 2,
  color: scannerDefaultColor,
  dir: "vertical",

}
let scanner3 = {
  x: 0,
  y: 0,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT / 15,
  speed: 2,
  color: scannerDefaultColor,
  dir: "horizontal",

}

//-------------------------------------- Define particles
const particle1 = {
  x: 100,
  y: 0,
  width: 40,
  height: WINDOW_HEIGHT,
}
const particle2 = {
  x: 350,
  y: 0,
  width: 10,
  height: WINDOW_HEIGHT,
}
const particle3 = {
  x: 0,
  y: 100,
  width: WINDOW_WIDTH,
  height: 20,
}

//----------------------------------- Define boundarys
const boundary1 = {
  p1: 0,
  p2: WINDOW_WIDTH / 2,
}
const boundary2 = {
  p1: WINDOW_WIDTH / 2,
  p2: WINDOW_WIDTH,
}
const boundary3 =
{
  p1: 0,
  p2: WINDOW_HEIGHT,
}


function isAtBoundary(lenght, scannerLenght, boundary) {
  return (lenght < boundary.p1 || (lenght + scannerLenght) >= boundary.p2);
}

function updateScannerPosition(scanner, boundary) {

  if (scanner.dir === "vertical") {

    scanner.speed = (isAtBoundary(scanner.x, scanner.width, boundary)) ? -scanner.speed : scanner.speed;
    scanner.x += scanner.speed;
  }
  if (scanner.dir === "horizontal") {
    scanner.speed = (isAtBoundary(scanner.y, scanner.height, boundary)) ? -scanner.speed : scanner.speed;
    scanner.y += scanner.speed;
    console.log(scanner.y);
  }

}

function isParticalDetacted(particle, scanner) {

  let scStart = scanner.y;
  let scLength = scanner.height;

  let parStart = particle.y;
  let parLength = particle.height;

  if (scanner.dir === "vertical") {
    scStart = scanner.x;
    scLength = scanner.width;

    parStart = particle.x;
    parLength = particle.width;
  }

  const scLeft = scStart;
  const scRight = scStart + scLength;

  const parLeft = parStart;
  const parRight = parStart + parLength;

  return (!(scRight < parLeft || scLeft > parRight)) ? true : false;
}

function updateColor(scanner, particle1, particle2) {
  const p1Detected = isParticalDetacted(particle1, scanner);
  const p2Detected = isParticalDetacted(particle2, scanner);
  scanner.color = (p1Detected || p2Detected) ? scannerDetactColor : scannerDefaultColor;
}

function update() {
  updateScannerPosition(scanner1, boundary1);
  updateScannerPosition(scanner2, boundary2);
  updateScannerPosition(scanner3, boundary3);


  updateColor(scanner1, particle1, particle2);
  updateColor(scanner2, particle1, particle2);
  updateColor(scanner3, particle3, particle3);



}



function draw() {
  r.BeginDrawing();
  r.ClearBackground(bgColor);



  particleDraw(particle1, particleColor);
  particleDraw(particle2, particleColor);
  particleDraw(particle3, particleColor);
  scannerDraw(scanner1);
  scannerDraw(scanner2);
  scannerDraw(scanner3);

  r.EndDrawing();

}


module.exports = {
  setup,
  draw,
  running,
  teardown,
  update,
}


