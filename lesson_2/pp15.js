let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

console.log(arr.filter(obj => {
  return Object.values(obj).every(subArr => {
    return subArr.every(numb => numb % 2 === 0);
  })
}));