function multiplesOf3and5(number) {
  let rangeArray = [], multiplesArray = [], result = 0;
  for (let i=1; i<number; i++) {
    rangeArray.push(i);
  }
  multiplesArray = rangeArray.filter(num => num % 3 === 0 || num % 5 === 0);
  result = multiplesArray.reduce((a,b) => a + b);
  return result;
}

console.log(multiplesOf3and5(10));
