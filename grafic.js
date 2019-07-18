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
  c.lineWidth = 2;
  c.moveTo(0, xAxis);
  c.lineTo(width, xAxis);
  c.moveTo(yAxis, 0);
  c.lineTo(yAxis, height);
  c.stroke();
  // draw units
  c.lineWidth = 0.25;

  while (x.position < x.end) {
    x.position = x.position + one;
    c.moveTo(x.position + 0.5, 0);
    c.lineTo(x.position + 0.5, height);
  }

  while (x.position > x.start) {
    x.position = x.position - one;
    c.moveTo(x.position + 0.5, 0);
    c.lineTo(x.position + 0.5, height);
  }
  while (y.position < y.end) {
    y.position = y.position + one;
    c.moveTo(0, y.position);
    c.lineTo(width, y.position);
  }
  while (y.position > y.start) {
    y.position = y.position - one;
    c.moveTo(0, y.position + 0.5);
    c.lineTo(width, y.position + 0.5);
  }

  c.stroke();
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
    let currentX = (i - cero.y) / one;
    let currentY = math.evaluate(exp, { x: currentX });
    let graphX = i;
    let graphY = cero.x - currentY * one;

    // coditional for points out of the domain
    if (i > 1) {
      if (values[i - 1].y === Infinity || values[i - 1].y === -Infinity) {
        console.log(currentX, currentY);
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

const input = document.getElementById('input');
input.addEventListener('change', e => {
  // clear graph
  graphing();
  // graph function
  console.log(funcGrapher(e.target.value));
});
