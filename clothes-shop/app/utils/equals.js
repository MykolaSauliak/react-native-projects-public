export default (compareArrys = (arrayOne, array) => {
  // if the other array is a falsy value, return
  if (!array) {
    return false;
  }

  // compare lengths - can save a lot of time
  if (arrayOne.length != array.length) {
    return false;
  }

  for (let i = 0, l = arrayOne.length; i < l; i++) {
    // Check if we have nested arrays
    if (arrayOne[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arrayOne[i].equals(array[i])) {
        return false;
      }
    } else if (arrayOne[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
});
