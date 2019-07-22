export class Bone {
  constructor(scoreLeft, scoreRight, backgroundPositionX, backgroundPositionY) {
    this.score = {
      left: scoreLeft,
      right: scoreRight,
      total : scoreLeft + scoreRight
    },
    this.backgroundPosition = {
      x: backgroundPositionX,
      y: backgroundPositionY
    },
    this.transform = {
      x: 0,
      y: 0,
      r: 0
    },
    this.playable = {
      left: true,
      right: true,
    }
    this.double = this.score.left == this.score.right ? true : false,
    this.selected = false,
    this.vertical = true,
    this.el = document.createElement('div'),
    this.paths = [],
    this._setElStyles();
    this._checkTelephone();
  }


  _setElStyles(){
    this.el.classList.add('bone');
    this.el.style.backgroundPosition = `${this.backgroundPosition.x}px ${this.backgroundPosition.y}px`;
    this.el.style.opacity = this.playable ? 1 : 0.8;
  }

  setTransform(x,y,r=0) {
    this.transform.x = x;
    this.transform.y = y;
    this.transform.r = r;
  }

  moveEl(x,y,r) {
    this.el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  move() {
    this.el.style.transform = `translate(${this.transform.x}px, ${this.transform.y}px) rotate(${this.transform.r})`;
  }

  scaleEl(num) {
    this.el.style.transform += `scale(${num})`;
  }

  swap() {
    [this.score.left, this.score.right] = [this.score.right, this.score.left];
  }

  _checkTelephone() {
    if(this.double) {
      this.telephone = false;
      this.playable.up = false;
      this.playable.down = false;
    }
  }
}