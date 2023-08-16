let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort((a, b) => {
  let num1 = a.filter(num => num % 2 === 1)
              .reduce((num, next) => num + next)  
  
  let num2 = b.filter(num => num % 2 === 1)
              .reduce((num, next) => num + next)  

  return num1 - num2;
});

console.log(arr)