let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

console.log(arr.map(arr1 => {
  if (typeof arr1[0] === 'number') {
    return arr1.slice().sort((a, b) => b - a);
  } else {
    return arr1.slice().sort((a, b) => b.charCodeAt() - a.charCodeAt());
  }
}));

console.log(arr);



