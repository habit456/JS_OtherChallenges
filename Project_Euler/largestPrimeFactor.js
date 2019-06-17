function largestPrimeFactor(number) {
  let LPF = [], counter=0;
  for (let i=2; i<=number; i++) {
    if (number % i === 0) {
      counter = 0;
      for (let j=1; j<=i; j++) {
        if (i % j === 0) {
          counter++
        }
      }
      if (counter === 2) {
        LPF = i;
      }
    }
  }
  return LPF;
}

console.log(largestPrimeFactor(13195));