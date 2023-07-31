function sortStringsByConsonants(array) {
  let sortedArray = array.sort((a, b) => countMaxAdjacentConsonants(b) - countMaxAdjacentConsonants(a));

  return sortedArray;
}




function countMaxAdjacentConsonants(str) {
  str = str.split(' ').join('');
  let count = 0;
  let temp = "";

  for (let y = 0; y < str.length; y++) {
    let letter = str[y];

    if ('bcdfghjklmnpqrstvwxyz'.includes(letter)) {
      temp += letter;
      if (temp.length > 1 && temp.length > count) { count = temp.length }
      console.log(count)
    } else {
      if (temp.length > 1 && temp.length > count) { count = temp.length }
      temp = '';
    }
  }
  return count;
}
  
  


console.log(countMaxAdjacentConsonants('monthietrlk')); // 3
// console.log(countMaxAdjacentConsonants('ccaa')); // 2
// console.log(countMaxAdjacentConsonants('baa')); // 0
// console.log(countMaxAdjacentConsonants('aa')); // 0




// +remove the spaces from the input string
// +initialize a count  to zero
// +initialize a temp string to empty string
// +iterate through the input string. for each letter:
//   +if the letter is a consanant, concatenate it to the temp string
//   +if the letter is a vowel:
//     +if the temp string has a length greater than 1 AND the temp string has a length greater than the current count, set the count to the length of the temp string
//     +reset the temp string to an empy string
// +return the count


// console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
// console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['', 'can can', 'batman', 'toucan']
// console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
// console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']