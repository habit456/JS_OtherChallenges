function fiboEvenSum(n) {
  let num1=1, num2=2, total=2, counter=1;
  while(counter < n) {
    num1 += num2;
    counter++;
    if (num1 % 2 === 0) {
      total += num1;
    }
    if (counter < n) {
      num2 += num1;
      counter++;
      if (num2 % 2 === 0) {
        total += num2;
      }
    }
  }
  return total;
}

console.log(fiboEvenSum(23));