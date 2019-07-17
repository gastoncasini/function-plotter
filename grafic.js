const canvas = document.getElementById('canvas');
const height = window.innerHeight;
const width = window.innerWidth;
canvas.height = height;
canvas.width = width;
c = canvas.getContext('2d');

// graph cuadricule variables
const xAxis = height / 2;
const yAxis = width / 2;
const cero = {
  x: xAxis,
  y: yAxis,
};
const one = 40;

function graphing() {
  // canvas
  c.fillRect(0, 0, width, height);

  let x = {
    position: width / 2,
    axis: height / 2,
    start: 0,
    end: width,
  };
  let y = {
    position: height / 2,
    axis: width / 2,
    start: 0,
    end: height,
  };

  // draw Axis
  c.beginPath();
  c.strokeStyle = 'white';
  c.strokeWidth = '1px';
  c.moveTo(0, xAxis);
  c.lineTo(width, xAxis);
  c.moveTo(yAxis, 0);
  c.lineTo(yAxis, height);
  // draw units

  while (x.position < x.end) {
    x.position = x.position + one;
    c.moveTo(x.position, cero.x);
    c.lineTo(x.position, cero.x + 5);
  }

  while (x.position > x.start) {
    x.position = x.position - one;
    c.moveTo(x.position, cero.x);
    c.lineTo(x.position, cero.x + 5);
  }
  while (y.position < y.end) {
    y.position = y.position + one;
    c.moveTo(cero.y, y.position);
    c.lineTo(cero.y + 5, y.position);
  }
  while (y.position > y.start) {
    y.position = y.position - one;
    c.moveTo(cero.y, y.position);
    c.lineTo(cero.y + 5, y.position);
  }

  c.stroke();
}

function funcGrapher(exp) {
  c.beginPath();
  // evaluate the expresion for all values of x
  // map canvas width to domain
  // map canvas height to codomain
  for (let i = 0; i <= width; i++) {
    let currentX = (i - cero.y) / one;
    let currentY = math.evaluate(exp, { x: currentX });
    let graphX = i;
    let graphY = cero.x - currentY * one;
    if (i === 0) {
      c.moveTo(graphX, graphY);
    }
    c.lineTo(graphX, graphY);
  }
  c.stroke();
}

graphing();

// take input from the user

const input = document.getElementById('input');
input.addEventListener('change', e => {
  graphing();
  funcGrapher(e.target.value);
});
