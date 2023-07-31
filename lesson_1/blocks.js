function calculateLeftoverBlocks(num) {
  let blocksRemaining = num;
  let currentLayer = 0;
  let blocksReq = (currentLayer + 1) ** 2;

  while (blocksRemaining >= blocksReq) {
      blocksRemaining -= blocksReq;
      currentLayer += 1;
      blocksReq = (currentLayer + 1) ** 2;
    }
    return blocksRemaining;
}

  



console.log(calculateLeftoverBlocks(0) === 0); //true
console.log(calculateLeftoverBlocks(1) === 0); //true
console.log(calculateLeftoverBlocks(2) === 1); //true
console.log(calculateLeftoverBlocks(4) === 3); //true
console.log(calculateLeftoverBlocks(5) === 0); //true
console.log(calculateLeftoverBlocks(6) === 1); //true
console.log(calculateLeftoverBlocks(14) === 0); //true