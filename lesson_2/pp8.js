console.clear();

let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.entries(obj).forEach((ele => ele.forEach((arr, idx) => {
  if (idx === 1) {
    arr.forEach(ele3 => {
      ele3.split('').forEach(char => {
        if (['a', 'e', 'i', 'o', 'u'].includes(char)) {
          console.log(char)
        }
      })
    })
  }
})));

