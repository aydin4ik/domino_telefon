const Transform = {

  playbone(bone, path, playedBones) {
    
    let r;
    if(!playedBones.length) {
      r = bone.double ? 0 : 90;
    }else{
      playedBones.forEach(playedBone => {
        if(playedBone.playable.left && playedBone.vertical && path.transform.x < playedBone.transform.x) {
          bone.score.left == playedBone.score.left ? (bone.swap(), r = bone.double ? 0 : -90) : (r = bone.double ? 0 : 90);
          bone.playable.right = false;
          playedBone.playable.left = false;
        }else if(playedBone.playable.right && playedBone.vertical && path.transform.x >           playedBone.transform.x) {
          bone.score.right == playedBone.score.right ? (bone.swap(), r = bone.double ? 0 : -90) : (r = bone.double ? 0 : 90);
          bone.playable.left = false;
          playedBone.playable.right = false;
        }else if(playedBone.playable.up && playedBone.vertical && path.transform.y < playedBone.transform.y) {
          bone.score.left == playedBone.score.left ? (bone.swap(), r = 0) : r = 180;
          bone.playable.right = false;
          bone.vertical = false;
          playedBone.playable.up = false;
        }else if(playedBone.playable.down && playedBone.vertical && path.transform.y > playedBone.transform.y) {
          bone.score.right == playedBone.score.right ? (bone.swap(), r = 0) : r = 180;
          bone.playable.left = false;
          bone.vertical = false;
          playedBone.playable.down = false;
        }else if(playedBone.playable.left && !playedBone.vertical && path.transform.y < playedBone.transform.y) {
          bone.score.left == playedBone.score.left ? (bone.swap(), r = bone.double ? 90 : 0) : (r = bone.double ? 90 : 180);
          bone.playable.right = false;
          bone.vertical = false;
          playedBone.playable.left = false;
        }else if(playedBone.playable.right && !playedBone.vertical && path.transform.y > playedBone.transform.y) {
          bone.score.right == playedBone.score.right ? (bone.swap(), r = bone.double ? 90 : 0) : (r = bone.double ? 90 : 180);
          bone.playable.left = false;
          bone.vertical = false;
          playedBone.playable.right = false;
        }        
      });
    }

    bone.setTransform(path.transform.x, path.transform.y, r);
    return bone;
  },

  playBone(bone, playedBone, path) {
    let r = 0;
    if(playedBone.playable.left && playedBone.vertical && bone.score.left == playedBone.score.left && path.transform.x < playedBone.transform.x) {
      bone.swap();
      bone.playable.right = false;
      playedBone.playable.left = false;
      r = bone.double ? 0 : -90;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.left && playedBone.vertical && bone.score.right == playedBone.score.left && path.transform.x < playedBone.transform.x) {
      bone.playable.right = false;
      playedBone.playable.left = false;
      r = bone.double ? 0 : 90;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.right && playedBone.vertical && bone.score.left == playedBone.score.right && path.transform.x > playedBone.transform.x) {
      bone.playable.left = false;
      playedBone.playable.right = false;
      r = bone.double ? 0 : 90;          
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.right && playedBone.vertical && bone.score.right == playedBone.score.right && path.transform.x > playedBone.transform.x) {
      bone.swap();
      bone.playable.left = false;
      playedBone.playable.right = false;
      r = bone.double ? 0 : -90;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.up && playedBone.vertical && bone.score.left == playedBone.score.left && path.transform.y < playedBone.transform.y) {
      bone.swap();
      bone.playable.right = false;
      bone.vertical = false;
      playedBone.playable.up = false;
      r = bone.double ? 90 : 0;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.up && playedBone.vertical && bone.score.right == playedBone.score.left && path.transform.y < playedBone.transform.y) {
      bone.playable.right = false;
      bone.vertical = false;
      playedBone.playable.up = false;
      r = bone.double ? 90 : 180;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.down && playedBone.vertical && bone.score.left == playedBone.score.right && path.transform.y > playedBone.transform.y) {
      bone.playable.left = false;
      bone.vertical = false;
      playedBone.playable.down = false;
      r = bone.double ? 90 : 180;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.down && playedBone.vertical && bone.score.right == playedBone.score.right && path.transform.y > playedBone.transform.y) {
      bone.swap();
      bone.playable.left = false;
      bone.vertical = false;
      playedBone.playable.down = false;
      r = bone.double ? 90 : 0;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.left && !playedBone.vertical && bone.score.left == playedBone.score.left && path.transform.y < playedBone.transform.y) {
      bone.swap();
      bone.playable.right = false;
      bone.vertical = false;
      playedBone.playable.left = false;
      r = bone.double ? 90 : 0;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.left && !playedBone.vertical && bone.score.right == playedBone.score.left && path.transform.y < playedBone.transform.y) {
      bone.playable.right = false;
      bone.vertical = false;
      playedBone.playable.left = false;
      r = bone.double ? 90 : 180;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.right && !playedBone.vertical && bone.score.left == playedBone.score.right && path.transform.y > playedBone.transform.y) {
      bone.playable.left = false;
      bone.vertical = false;
      playedBone.playable.right = false;
      r = bone.double ? 90 : 180;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }else if(playedBone.playable.right && !playedBone.vertical && bone.score.right == playedBone.score.right && path.transform.y > playedBone.transform.y) {
      bone.swap();
      bone.playable.left = false;
      bone.vertical = false;
      playedBone.playable.right = false;
      r = bone.double ? 90 : 0;              
      bone.moveEl(path.transform.x, path.transform.y , r);
    }
  }, 

  playMultipleBones(bone, playedBones, path, index) {
    let r = 0;
    let pathEl;
    
    if(path && index == path.el.getAttribute('data-index')){
      pathEl = path;
    }else {
      pathEl = bone.paths[0];
    }
    playedBones.forEach(playedBone => {
      if(playedBone.playable.left && playedBone.vertical && pathEl.transform.x < playedBone.transform.x) {
        bone.playable.right = false;
        playedBone.playable.left = false;           
        bone.moveEl(pathEl.transform.x, pathEl.transform.y , r);
      }else if (playedBone.playable.right && playedBone.vertical && pathEl.transform.x > playedBone.transform.x) {
        bone.playable.left = false;
        playedBone.playable.right = false;           
        bone.moveEl(pathEl.transform.x, pathEl.transform.y , r);
      }else if (playedBone.playable.left && !playedBone.vertical && pathEl.transform.y < playedBone.transform.y) {
        r = 90;
        bone.playable.right = false;
        bone.vertical = false;
        playedBone.playable.left = false;           
        bone.moveEl(pathEl.transform.x, pathEl.transform.y , r);
      }else if (playedBone.playable.right && !playedBone.vertical && pathEl.transform.y > playedBone.transform.y) {
        r = 90;
        bone.playable.left = false;
        bone.vertical = false;
        playedBone.playable.right = false;           
        bone.moveEl(pathEl.transform.x, pathEl.transform.y , r);
      }
    });
  }
}

export default Transform;