export class Domino {
  constructor(){
    this.bazar = [],
    this.players = [],
    this.generateBazar();
  }

  generateBazar(){
    for(var l = 0; l < 7; l += 1 ){
      for(var r = l; r < 7; r += 1){
        this.bazar.push(this.makeDomino(l, r));
      }
    }
  }

  makeDomino(l,r,x,y) {
    return {
      left : l,
      right: r,
      score: function() {
        if (this.left === 0 && this.right === 0){
          return 10;
        } else {
          return this.left + this.right;
        }
      },
      swap: function() {
        let {left, right} = this;
        this.left = right;
        this.right = left;
        return this;
      }
    }
  }

  getRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  deal(player) {
    for(let i = 0; i < 7; i += 1){
      let random = this.getRandom(0, this.bazar.length);
      if( this.bazar[random] ){
        this.players.push(this.bazar[random]);
        this.bazar.splice(random, 1);
      }
    }
  }
}

class User {
  constructor(name = this.generateName()){
    this.hand = [],
    this.score = 0,
    this.name = name;
  }

  move() {
    console.log('moved');
  }

  generateName(){
    return 'Player' + Date.now();
  }
}

var domino = new Domino();