const canvas = document.getElementById('canvas');
const height = window.innerHeight;
const width = window.innerWidth;
canvas.height = height;
canvas.width = width;
c = canvas.getContext('2d');

// graph cuadricule variables
let x = {
  cero: width / 2,
  axis: height / 2,
  start: 0,
  end: width,
};
let y = {
  cero: height / 2,
  axis: width / 2,
  start: 0,
  end: height,
};
// value of one
const one = 40;

// print a string in the canvas
function print(text, y, x) {
  c.font = '16px serif';
  c.fillStyle = 'white';
  c.fillText(text, x, y);
  if (y === y.cero + 20) {
    console.log(x / one, (x - 20) / one);
  }
}
function drawLine(from, to, width, style = 'white') {
  c.beginPath();
  c.strokeStyle = style;
  c.lineWidth = width;

  c.moveTo(from.x, from.y);

  c.lineTo(to.x, to.y);
  c.stroke();
}

function graphing() {
  // canvas
  c.beginPath();
  c.fillStyle = 'black';
  c.fillRect(0, 0, width, height);

  // start position of graph lines
  // horizontal
  let hLine = (y.cero % one) + 0.5;
  // vertical
  let vLine = (x.cero % one) + 0.5;

  for (let i = 0; i < 01000; i++) {
    // inside the loop the line width changes when:
    // 1- the line is one of the axis
    // 2- the line is one of the indicated numbers
    let lineWidthY = 0.25;
    let lineWidthX = 0.25;
    // values of x
    let xValue = (vLine - 0.5 - x.cero) / one;
    /* next step use a variable insted of 5,
     to divide xValue to use it when resizing the graph */
    if (xValue % 5 === 0 || xValue === 0) {
      print(xValue, y.cero, vLine);
      lineWidthY = 0.5;
    }

    // values of y
    let yValue = (hLine - 0.5 - y.cero) / one;
    if (yValue % 5 === 0 && yValue !== 0) {
      print(-yValue, hLine, x.cero);
      lineWidthX = 0.5;
    }

    // bolder line to axis

    if (hLine - 0.5 === y.cero) {
      lineWidthX = 1;
    } else if (vLine - 0.5 === x.cero) {
      lineWidthY = 1;
    }
    drawLine({ x: 0, y: hLine }, { x: width, y: hLine }, lineWidthX);
    drawLine({ x: vLine, y: 0 }, { x: vLine, y: height }, lineWidthY);

    hLine = hLine + one;
    vLine = vLine + one;
  }
}

function funcGrapher(exp) {
  c.lineWidth = 1;
  c.beginPath();
  // map of the function
  let values = [];

  // evaluate the expresion for all values of x
  // map canvas width to domain
  // map canvas height to codomain
  for (let i = 0; i <= width; i++) {
    let currentX = (i - x.cero) / one;
    let currentY = math.evaluate(exp, { x: currentX });
    let graphX = i;
    let graphY = y.cero - currentY * one;

    // coditional for discontinuous functions
    // moves the last point to the current point
    // without drawing
    if (i > 1) {
      if (values[i - 1].y === Infinity || values[i - 1].y === -Infinity) {
        c.moveTo(graphX, graphY);
      }
    }

    if (i === 0) {
      c.moveTo(graphX, graphY);
    }

    c.lineTo(graphX, graphY);

    const point = {
      x: currentX,
      y: currentY,
      graphX,
      graphY,
    };

    values.push(point);
  }

  c.stroke();

  return values;
}
graphing();

// take input from the user
let curve;
const input = document.getElementById('input');
input.addEventListener('change', e => {
  // clear graph
  graphing();
  // graph function
  exp = e.target.value;
  curve = funcGrapher(exp);
  console.log(curve);
});

// on click moves the graph
let isMoving;
let xPosition;
let xOldPosition;

let yPosition;
let yOldPosition;

canvas.addEventListener('mousedown', e => {
  isMoving = true;
  xPosition = e.clientX;
  yPosition = e.clientY;
});

canvas.addEventListener('mouseup', e => {
  isMoving = false;
});

canvas.addEventListener('mousemove', e => {
  if (isMoving) {
    // x graph move
    xOldPosition = xPosition;
    xPosition = e.clientX;
    x.cero = x.cero + (xPosition - xOldPosition);
    // y graph move

    yOldPosition = yPosition;
    yPosition = e.clientY;
    y.cero = y.cero + (yPosition - yOldPosition);

    graphing();
  }
});
