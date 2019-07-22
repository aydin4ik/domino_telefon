import Utils from './components/utils';
import Transform from './components/transform';
import { Bone } from './components/bone';
import { Path } from './components/path';

export class Game {
  constructor() {
    this.defaults = {
      multipleDoubles: true,
    }
    this.wrapper = document.getElementById('board');
    this.bazarWrapper = document.getElementById('bazar');
    this.board = [];
    this.players = [];
    this.bazar = [];
    this.played = [];
    this.init();
  }

  init() {
    this.generateBazar();
    this.createBones();  
    this._bindEvents();
  }

  reset() {

  }

  _bindEvents() {
    this.bazar.forEach(bone => {
      bone.el.addEventListener('click', this);
      if(bone.paths.length != 0){
        bone.paths.forEach(path => {
        path.el.addEventListener('click', this);
        });
      }
    });
  }

  _removeEvents() {
    this.bazar.forEach(bone => {
      bone.el.removeEventListener('click', this);
      if(bone.paths.length != 0){
        bone.paths.forEach(path => {
        path.el.removeEventListener('click', this);
        });
      }
    });
  }

  handleEvent(e) {
    if(e.target.className == 'bone'){
      this.selectBone(e);
    }else if(e.target.className == 'path'){
      this.transformbone(e);
    }
  }

  _getObjbyTarget(target) {
    let arr = document.getElementsByClassName(target.className);
    let index = Array.from(arr).indexOf(target);
    let obj = this.bazar[index];
    return obj;
  }


  selectBone({target}) {
    let currentBone = this._getObjbyTarget(target);  
    if(currentBone.playable){
      if(!currentBone.selected ){        
        currentBone.selected = !currentBone.selected;
        currentBone.moveEl(currentBone.transform.x, 20);
            for(let j = 0; j < this.bazar.length; j+=1){
              if(this.bazar.indexOf(currentBone) != j){
                let previousBone = this.bazar[j];       
                if(previousBone.selected) {       
                  if(!currentBone.double || !previousBone.double){ 
                    previousBone.selected = !previousBone.selected;
                    previousBone.moveEl(previousBone.transform.x, 0)
                    this.unsetPath(previousBone);
                  } 
                } 
              }
            }
        this.setPath(currentBone);
      }else{
        currentBone.selected = !currentBone.selected;
        currentBone.moveEl(currentBone.transform.x, 0)
        this.unsetPath(currentBone);
      }    
    }    
  }

  transformbone({target}) {
    // find bone which has in paths arr path which has el == target
    let bone = this.bazar.find(bone => {
      let path = bone.paths.find(path => {
        return path.el == target;
      });
      return bone.paths[bone.paths.indexOf(path)];
    });

    let path = bone.paths.find(path => {
      return path.el == target;
    });    
    
    let index = this.bazar.indexOf(bone);

    let selectedBones = this.bazar.filter(bone => {return bone.selected});

    if(selectedBones.length > 1){
      selectedBones.forEach(bone => {
        Transform.playbone(bone, path, this.played);
      });
    }else{
      Transform.playbone(bone, path, this.played);
    }
    
    bone.selected = !bone.selected;
    bone.el.style.cursor = 'default';
    bone.el.className = 'bone-played';
    this.wrapper.appendChild(bone.el);
    window.getComputedStyle(bone.el).transform;
    bone.moveEl(bone.transform.x, bone.transform.y, bone.transform.r);
    this.unsetPath(bone);
    this.setTelephone();
    this._removeEvents();
    Utils.spliceFromPushTo(index, this.bazar, this.played);    
    this.updateBones(this.bazar, 30);
    this._bindEvents();
  }

  transformBone({target}) {
    let index = target.getAttribute('data-index');
    let bone = this.bazar[index];
    let path = bone.paths[Array.from(document.getElementsByClassName('path')).indexOf(target)];
    let selectedBones = this.bazar.filter(bone => {
      return bone.selected;
    });
    let r = 0;

    if(this.played.length != 0){
      if(selectedBones.length > 1){
        selectedBones.forEach(selectedBone => {
          let index = this.bazar.indexOf(selectedBone);
          Transform.playMultipleBones(selectedBone, this.played, path, index);
            selectedBone.selected = !selectedBone.selected;
            selectedBone.el.style.cursor = 'default';
            selectedBone.el.className = 'bone-played';
            this.unsetPath(selectedBone);
            this.setTelephone();
            this._removeEvents();
            Utils.spliceFromPushTo(index, this.bazar, this.played);    
            this.updateBones(this.bazar, 30);
            this._bindEvents();

        });
      }else{
        this.played.forEach(playedBone => {
          Transform.playBone(bone, playedBone, path, r);
        });
      }
    }else{
      r = bone.double ? 0 : 90;      
      bone.selected = !bone.selected;
      bone.el.style.cursor = 'default';
      this.wrapper.appendChild(bone.el);
      window.getComputedStyle(bone.el).transform;
      bone.moveEl(path.transform.x, path.transform.y, r);
      this.unsetPath(bone);
      this.setTelephone();
      this._removeEvents();
      Utils.spliceFromPushTo(index, this.bazar, this.played);    
      this.updateBones(this.bazar, 30);
      this._bindEvents();
    }
  }



  setPath(bone) {
    let index = this.bazar.indexOf(bone);
    let r = bone.double ? 0 : 90;  

    if(this.played.length > 0){
      this.played.forEach(playedBone => {
        if(playedBone.playable.left ){
          if(bone.score.left == playedBone.score.left || bone.score.right == playedBone.score.left) {
            let offset;
            if(bone.double){
              offset = playedBone.double || bone.double ? 39 : 52;
            }else{
              offset = playedBone.double || bone.double ? 40 : 52;
            }
            let path = new Path();
            path.el.setAttribute('data-index', index);
            if(playedBone.vertical){
              r = bone.double ? 0 : 90;
              path.moveEl(playedBone.transform.x - offset , playedBone.transform.y, r);
            }else{
              r = bone.double ? 90 : 0;
              path.moveEl(playedBone.transform.x , playedBone.transform.y - offset, r);
            }
            bone.paths.push(path);
            this.wrapper.appendChild(path.el);
          }
        }
        if(playedBone.playable.right) {
          if(bone.score.left == playedBone.score.right || bone.score.right == playedBone.score.right){
            let offset = playedBone.double || bone.double ? 39 : 52;
            let path = new Path();
            path.el.setAttribute('data-index', index);
            if(playedBone.vertical) {
              r = bone.double ? 0 : 90;
              path.moveEl(playedBone.transform.x + offset , playedBone.transform.y, r);
            }else{
              r = bone.double ? 90 : 0;
              path.moveEl(playedBone.transform.x , playedBone.transform.y + offset, r);
            }
            bone.paths.push(path);
            this.wrapper.appendChild(path.el);
          }
        }
        if(playedBone.playable.up) {
          if(bone.score.left == playedBone.score.right || bone.score.right == playedBone.score.right){
            let offset = 52;
            let path = new Path();
            path.el.setAttribute('data-index', index);
            path.moveEl(playedBone.transform.x, playedBone.transform.y - offset, 0);
            bone.paths.push(path);
            this.wrapper.appendChild(path.el);
          }
        }
        if(playedBone.playable.down) {
          if(bone.score.left == playedBone.score.left || bone.score.right == playedBone.score.left){
            let offset = 52;
            let path = new Path();
            path.el.setAttribute('data-index', index);
            path.moveEl(playedBone.transform.x, playedBone.transform.y + offset, 0);
            bone.paths.push(path);
            this.wrapper.appendChild(path.el);
          }
        }
      });
      this._bindEvents();
    }else{
      let path = new Path();
      bone.paths.push(path);
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      path.el.setAttribute('data-index', index);
      path.moveEl(x,y,r);
      this.wrapper.appendChild(path.el);
      this._bindEvents();
    }      
  }



  unsetPath(bone){
    bone.paths.forEach(path => {
      this.wrapper.removeChild(path.el);
    });
    bone.paths = [];
  }

  checkTelephone(bone) {
    return bone.telephone == true;
  }

  setTelephone() {
    if(!this.played.find(this.checkTelephone)){
      this.played.forEach(bone => {
        if(bone.double && !bone.playable.left && !bone.playable.right){
          bone.telephone = true;
          bone.playable.up = true;
          bone.playable.down = true;
        }
      });
    }
  }


  setPlayableBones() {
    for (let i = 0; i < this.played.length; i++) {
      const played = this.played[i];
      for (let j = 0; j < this.bazar.length; j++) {
        const bone = this.bazar[j];
        if( bone.score.left == played.score.left ||
          bone.score.left == played.score.right ||
          bone.score.right == played.score.left ||
          bone.score.right == played.score.right){
            bone.playable = true;
            bones[i].style.opacity = 1;
          }
      }
      
    }
  }

  generateBazar() {
    for(let l = 0; l <= 6; l += 1){
      let y = -l*58;
      for(let r = l, tr = 0; r <= 6; r += 1, tr += 1){
        let x = -tr*33;
        this.bazar.push(new Bone(l,r,x,y));
      }
    }
  }

  createBones(){
      this.bazar.forEach((bone) => {
        let elem = bone.el;
        this.bazarWrapper.appendChild(elem);
      });
      this.updateBones(this.bazar, 30);
  }

  updateBones(arr, px=0) {    
    arr.forEach((bone, index) => {
      bone.moveEl(index * px, 0, 0);      
    });
  }
}