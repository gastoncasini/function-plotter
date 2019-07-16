const canvas = document.getElementById('canvas');
const height = window.innerHeight - 200;
const width = window.innerWidth - 100;
canvas.height = height;
canvas.width = width;
c = canvas.getContext('2d');

console.log(height, width);

function graphing() {
  // canvas
  c.fillRect(0, 0, width, height);
  // graph cuadricule variables
  const one = 40;
  const xAxis = height / 2;
  const yAxis = width / 2;
  const cero = {
    x: xAxis,
    y: yAxis,
  };

  let x = {
    position: cero.y,
    start: 0,
    end: width,
  };
  let y = {
    position: cero.x,
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
  console.log(y.position, y.end);

  c.stroke();
}

graphing();
