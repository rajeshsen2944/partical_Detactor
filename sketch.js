const g = require("./geometry");
const r = require("raylib");



const TITLE = "Particle Detactor";   //window Property
const WIN_WIDTH = 500;
const WIN_HEIGHT = 300;
const WIN_FPS = 50;
const WIN_POSITION = { x: 1200, y: 200 }

const bgColor = r.BLACK;
const scDefaultColor = r.WHITE;
const scDetactColor = r.RED;
const particleColor = r.SKYBLUE;

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIN_WIDTH, WIN_HEIGHT, TITLE);
  r.SetTargetFPS(WIN_FPS);
  r.SetWindowPosition(WIN_POSITION.x, WIN_POSITION.y);
}
function running() {
  return !r.WindowShouldClose();
}
function teardown() {
  r.CloseWindow();
}

//drawing functions
function scannerDraw(...scanner) {
  let i = 0;
  while (i < scanner.length) {
    r.DrawRectangle(scanner[i].x, scanner[i].y, scanner[i].width, scanner[i].height, scanner[i].color);
    i++;
  }
}
function particleDraw(color, ...particle) {
  let i = 0;
  while (i < particle.length) {
    r.DrawRectangle(particle[i].x, particle[i].y, particle[i].width, particle[i].height, color);
    i++;
  }
}


//-------------------------------- Define scanners
const scanner1 = {
  x: 0,
  y: 0,
  width: WIN_WIDTH / 15,
  height: WIN_HEIGHT,
  speed: 1,
  color: scDefaultColor,
  dir: "vertical",
  boundary: {
    p1: 0,
    p2: WIN_WIDTH / 2,
  }
}
const scanner2 = {
  x: WIN_WIDTH / 2,
  y: 0,
  width: WIN_WIDTH / 15,
  height: WIN_HEIGHT,
  speed: 2,
  color: scDefaultColor,
  dir: "vertical",
  boundary: {
    p1: WIN_WIDTH / 2,
    p2: WIN_WIDTH,
  }

}
const scanner3 = {
  x: 0,
  y: 0,
  width: WIN_WIDTH,
  height: WIN_HEIGHT / 15,
  speed: 2,
  color: scDefaultColor,
  dir: "horizontal",
  boundary: {
    p1: 0,
    p2: WIN_HEIGHT,
  }

}

//-------------------------------------- Define particles
const particle1 = {
  x: 100,
  y: 0,
  width: 40,
  height: WIN_HEIGHT,
}
const particle2 = {
  x: 350,
  y: 0,
  width: 10,
  height: WIN_HEIGHT,
}
const particle3 = {
  x: 0,
  y: 100,
  width: WIN_WIDTH,
  height: 20,
}

//----------------------------------- Define boundarys

// const boundary2 = {
//   p1: WIN_WIDTH / 2,
//   p2: WIN_WIDTH,
// }
// const boundary3 =
// {
//   p1: 0,
//   p2: WIN_HEIGHT,
// }

function updateScannerPosition(scanner) {
  if (scanner.dir === "vertical") {
    scanner.speed = (g.isAtBoundary(scanner.x, scanner.width, scanner.boundary)) ? -scanner.speed : scanner.speed;
    scanner.x += scanner.speed;
  }
  if (scanner.dir === "horizontal") {
    scanner.speed = (g.isAtBoundary(scanner.y, scanner.height, scanner.boundary)) ? -scanner.speed : scanner.speed;
    scanner.y += scanner.speed;
  }
}

function updateColor(scanner, ...particle) {
  scanner.color = g.checkParticle(particle, scanner) ? scDetactColor : scDefaultColor;
}

function update() {
  updateScannerPosition(scanner1);
  updateScannerPosition(scanner2);
  updateScannerPosition(scanner3);

  updateColor(scanner1, particle1, particle2);
  updateColor(scanner2, particle1, particle2);
  updateColor(scanner3, particle3);
}



function draw() {
  r.BeginDrawing();
  r.ClearBackground(bgColor);

  particleDraw(particleColor, particle1, particle2, particle3);
  scannerDraw(scanner1, scanner2, scanner3);
  // particleDraw(particle2, particleColor);
  // particleDraw(particle3, particleColor);
  // scannerDraw(scanner2);
  // scannerDraw(scanner3);

  r.EndDrawing();

}


module.exports = {
  setup,
  draw,
  running,
  teardown,
  update,
}


// const p1Detected = isParticalDetacted(particle1, scanner);
// const p2Detected = isParticalDetacted(particle2, scanner);
// scanner.color = (p1Detected || p2Detected) ? scDetactColor : scDefaultColor;

// function isParticalDetacted(particle, scanner) {

//   let scStart = scanner.y;
//   let scLength = scanner.height;

//   let parStart = particle.y;
//   let parLength = particle.height;

//   if (scanner.dir === "vertical") {
//     scStart = scanner.x;
//     scLength = scanner.width;

//     parStart = particle.x;
//     parLength = particle.width;
//   }

//   const scLeft = scStart;
//   const scRight = scStart + scLength;

//   const parLeft = parStart;
//   const parRight = parStart + parLength;

//   return (!(scRight < parLeft || scLeft > parRight)) ? true : false;
// }
// function rec(partical,scanner,num = 0){
//   if(num == partical.length){ return false;}
//   console.log(partical.length ,num);
//   return (isParticalDetacted(partical[num],scanner) || rec(partical,scanner,++num));
// }