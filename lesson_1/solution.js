function sumEvenNumberRow(rowNumber) {
  const rows = [];
  let startInteger = 2;

  for (let currentRowNumber = 1; currentRowNumber <= rowNumber; currentRowNumber += 1) {
    let row = createRow(startInteger, currentRowNumber);
    rows.push(row);
    startInteger = row[row.length - 1] + 2;
  }

  let finalRow = rows.pop();
  return finalRow.reduce((a, b) => a + b);
}

function createRow(startInteger, rowLength) {
  const row = [];
  let currentInteger = startInteger;


  while (row.length < rowLength) {
    row.push(currentInteger);
    currentInteger += 2;
  }

  return row;
}


// row number: 1 --> sum of integers in row: 2
// row number: 2 --> sum of integers in row: 10
// row number: 3 --> sum of integers in row: 68

console.log(sumEvenNumberRow(1)); // 2
console.log(sumEvenNumberRow(2)); // 10
console.log(sumEvenNumberRow(4)); // 68

// start: 2, length: 1 --> [2]
// start: 4, length: 1 --> [4, 6]
// start: 8, length: 1 --> [8, 10, 12]

// console.log(createRow(2, 1)); // [2]
// console.log(createRow(4, 2)); // [4, 6]
// console.log(createRow(8, 3)); // [8, 10, 12]