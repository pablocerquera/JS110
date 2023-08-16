const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const LETTERS = ['a', 'b', 'c' ,'d' ,'e','f'];

const Random = (max) => {
  return Math.floor(Math.random() * max);
}

function randomNumber() {
  return NUMBERS[Random(NUMBERS.length)];
}

function randomLetter() {
  return LETTERS[Random(LETTERS.length)];
}

function sets(end) {
  let id = '';
  for (let idx = 0; idx < end; idx++) {
    let numOrLet = Random(2);
    id += numOrLet === 1 ? randomNumber() : randomLetter();
  }
  return id;
}

function UUID() {
  return `${sets(8)}-${sets(4)}-${sets(4)}-${sets(4)}-${sets(12)}`;
}

console.log(UUID());
console.log(UUID());
console.log(UUID());