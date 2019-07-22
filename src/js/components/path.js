export class Path {
  constructor() {
    this.transform = {
      x: 0,
      y: 0
    }
    this.el = document.createElement('div');
    this.el.className = 'path';
  }

  moveEl(x, y, r=0) {
    this.transform.x = x;
    this.transform.y = y;
    this.el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  scaleEl(num) {
    this.el.style.transform += `scale(${num})`
  }
}