const countChar = (str, char) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count += 1;
    }
  }
  return count;
};

const countBs = (str) => {
  return countChar(str, 'B');
};

console.log(countBs('BaBBBByyy'))
console.log(countChar('fifteenth', 'f'));