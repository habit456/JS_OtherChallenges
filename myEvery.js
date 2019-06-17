function myEvery(arr, test) {
  for (let i = 0; i < arr.length; i++) {
    if (!test(arr[i])) {
      return false;
    }
  }
  return true;
}

//console.log(myEvery([1,2,3,4], a => a % 1 === 0));

function every2(arr, test) {
  if (arr.some(a => !test(a))) {
    return false;
  } else {
    return true;
  }
}

//console.log(myEvery([1,2,3,4], a => a % 2 === 0));