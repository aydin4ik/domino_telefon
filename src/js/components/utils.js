const Utils = {
  spliceFromPushTo(boneIndex, from, to) {
    to.push(from[boneIndex]);
    from.splice(boneIndex, 1);
  },

  getTranslateCord(string){
    return string.replace(/[^\d.]/g, '');
  }
}



export default Utils;