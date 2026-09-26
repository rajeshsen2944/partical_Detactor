const g = require("./geometry")
const r = require("raylib");

const TITLE = "Partical Detactor";   //window Property
const WIDTH = 500;
const HEIGHT = 500;

function setup() {
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(50);
  r.SetWindowPosition(1200, 200);
}


function running() {
  return !r.WindowShouldClose();
}

function teardown() {
  r.CloseWindow();
}


function scanner(posX, posY, stripeWidth, stripeHeight, color) {
  r.DrawRectangle(posX, posY, stripeWidth, stripeHeight, color);
}

const white = r.WHITE;
const black = r.BLACK;
let stripePosX = 1;
const stripePosY = 0;
const stripeWidth = 20;
let offset = 1;
const partica1lpos= {x:100,y:0}
const partical1Dim={x:50,y:HEIGHT}
// function scannerMove() {5

  const offsetflag = (stripePosX <= 0 || (stripePosX + stripeWidth) >= WIDTH);
  // offset = (offsetflag) ? -offset : offset;
  if (offsetflag) {
    offset = (-offset);
  }
  stripePosX += offset;
}
function update() {
  scannerMove();

}
function partical(posX, posY, weight, height, color) {
  r.DrawRectangle(posX, posY, weight, height, color)
}
function draw() {
  r.BeginDrawing();
  r.ClearBackground(black);
  partical(partica1lpos.x, partica1lpos.y, partical1Dim.x,partical1Dim.y, r.SKYBLUE)
  scanner(stripePosX, stripePosY, stripeWidth, HEIGHT, white)
  r.EndDrawing();
}


module.exports = {
  setup,
  draw,
  running,
  teardown,
  update,
}