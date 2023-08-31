const rl = require('readline-sync');
const color = require('colors/safe');
const FULL_DECK = [['H', '2'], ['H', '3'], ['H', '4'], ['H', '5'], ['H', '6'], ['H', '7'],
  ['H', '8'], ['H', '9'],['H', '10'], ['H', 'J'], ['H', 'Q'], ['H', 'K'], ['H', 'A'],
  ['S', '2'], ['S', '3'], ['S', '4'], ['S', '5'], ['S', '6'], ['S', '7'],
  ['S', '8'], ['S', '9'],['S', '10'], ['S', 'J'], ['S', 'Q'], ['S', 'K'], ['S', 'A'],
  ['D', '2'], ['D', '3'], ['D', '4'], ['D', '5'], ['D', '6'], ['D', '7'],
  ['D', '8'], ['D', '9'],['D', '10'], ['D', 'J'], ['D', 'Q'], ['D', 'K'], ['D', 'A'],
  ['C', '2'], ['C', '3'], ['C', '4'], ['C', '5'], ['C', '6'], ['C', '7'],
  ['C', '8'], ['C', '9'],['C', '10'], ['C', 'J'], ['C', 'Q'], ['C', 'K'], ['C', 'A']];
const HEADER_DIVIDER = '===================================';
const LARGE_DIVIDER = '--------------------------------------------';
const SMALL_DIVIDER = '-------------';
const WINNING_NUMBER = 21;
const MATCH_LIMIT = 3;
const FACE_CARD_VALUE = 10;


function prompt(msg) {
  return console.log(`=> ${msg}`);
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return array;
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === 'A') {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += FACE_CARD_VALUE;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === 'A').forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function busted(total) {
  return total > WINNING_NUMBER;
}

function dealToPlayer(playerHand, fullDeck) {
  playerHand.push(fullDeck[0]);
}

function dealToDealer(dealerHand, fullDeck) {
  dealerHand.push(fullDeck[0]);
}

function discard(fullDeck) {
  fullDeck.shift();
}

function playerHitOrStay() {
  while (true) {
    prompt(`Would you like to ${color.brightBlue('(H)it')} or ${color.brightRed('(S)tay')}.`);
    let hitOrStay = rl.question().toLowerCase();
    if (hitOrStay === 'stay' || hitOrStay === 's') {
      return 'stay';
    } else if (hitOrStay === 'hit' || hitOrStay === 'h') {
      return 'hit';
    }
  }
}

function dealerHitOrStay(dealerHand, fullDeck) {
  if (dealerHand.length === 0) {
    dealToDealer(dealerHand, fullDeck);
  } else if (total(dealerHand) <= 15) {
    dealToDealer(dealerHand, fullDeck);
  }
}

function cardValues(array) {
  return array.map(cards => cards[1]);
}

function playAgain() {
  while (true) {
    prompt("Would you like to play again?");
    let answer = rl.question().toLowerCase();
    if (answer === 'yes' || answer === 'y') {
      return true;
    } else if (answer === 'no' || answer === 'n') {
      return false;
    } else {
      prompt('We need a (y)es or (n)o answer.');
    }
  }
}

function detectWinner(playerTotal, dealerTotal) {
  let playerDistance = WINNING_NUMBER - playerTotal;
  let dealerDistance = WINNING_NUMBER - dealerTotal;

  switch (true) {
    case busted(dealerTotal):
      return 'You Win!!!';
    case busted(playerTotal):
      return 'Dealer wins!!!';
    case playerDistance < dealerDistance:
      return 'You Win!!!';
    case playerDistance > dealerDistance:
      return 'Dealer wins!!!';
    default:
      return 'ITS A TIE!!!';
  }
}

function incrementScore(winner, score) {
  switch (true) {
    case winner === 'You Win!!!':
      score.p += 1;
      break;
    case winner === 'Dealer wins!!!':
      score.d += 1;
      break;
    case winner === 'ITS A TIE!!!':
      break;
  }
}

function displayResults(playerHand, dealerHand, playerTotal, dealerTotal) {
  let playerCardValues = cardValues(playerHand).join(', ');
  let dealerCardValues = cardValues(dealerHand).join(', ');
  let dealerBusted = busted(dealerTotal);
  let playerHandMsg = `your hand: ${color.brightBlue(playerCardValues)} your total was: ${color.brightBlue(playerTotal)}`;
  let dealersHandMsg = `The dealers hand: ${color.brightGreen(dealerCardValues)} and total: ${color.brightGreen(dealerTotal)}`;
  let bustedMsg = `${dealerBusted ? 'Dealer' : 'You'} busted`;

  if (busted(playerTotal)) {
    prompt(`${bustedMsg}, ${playerHandMsg}`);
    console.log(LARGE_DIVIDER);
    prompt(dealersHandMsg);
  } else if (dealerBusted) {
    prompt(`${bustedMsg}, ${playerHandMsg}`);
    console.log(LARGE_DIVIDER);
    prompt(dealersHandMsg);
  } else {
    prompt(`You chose to stay, ${playerHandMsg}`);
    console.log(LARGE_DIVIDER);
    prompt(dealersHandMsg);
  }
}

function seriesWinner(score) {
  if (score.p === MATCH_LIMIT) {
    return color.blue.bold('You won the series!! Congratulations!');
  } else if ( score.d === MATCH_LIMIT) {
    return color.yellow.bold("You lost the series... Maybe practice and next time you'll do better.");
  } else {
    return 'confusion.';
  }
}

// PLAY AGAIN LOOP
while (true) {
  console.clear();
  const SCORE_OBJ = {p: 0, d: 0};
  let playerHand = [];
  let dealerHand = [];
  let playerTotal = total(playerHand);
  let dealerTotal = total(dealerHand);

  while (true) {
    let fullDeck = shuffle(FULL_DECK.slice()); // sliced to make a shallow copy.
    playerHand = [];
    dealerHand = [];

    playerTotal = total(playerHand);
    dealerTotal = total(dealerHand);
    // GAME LOOP
    while (true) {
      console.log(HEADER_DIVIDER);
      let answer = playerHitOrStay();
      if (answer === 'hit') {
        dealToPlayer(playerHand, fullDeck);
      } else if (answer === 'stay') break;

      discard(fullDeck);
      dealerHitOrStay(dealerHand, fullDeck);
      discard(fullDeck);
      playerTotal = total(playerHand);
      dealerTotal = total(dealerHand);

      if (busted(playerTotal) || busted(dealerTotal)) break;

      console.clear();
      console.log(`Best out of 5 wins! You: ${color.blue(SCORE_OBJ.p)} Dealer: ${color.green(SCORE_OBJ.d)}`);
      prompt(`This is your hand: ${color.brightBlue(cardValues(playerHand).join(', '))} current total: ${color.brightBlue(playerTotal)}`);
      console.log(LARGE_DIVIDER);
      prompt(`This is the dealers card: ${color.brightGreen(cardValues(dealerHand)[0])}`);
    }
    // GAME LOOP END
    console.clear();
    // RESULTS
    displayResults(playerHand, dealerHand, playerTotal, dealerTotal);
    prompt(color.white.italic(detectWinner(playerTotal, dealerTotal)));
    incrementScore(detectWinner(playerTotal, dealerTotal), SCORE_OBJ);

    if (SCORE_OBJ.p === 3 || SCORE_OBJ.d === 3) break;
  }
  console.log(SMALL_DIVIDER);
  prompt(seriesWinner(SCORE_OBJ));
  console.log(SMALL_DIVIDER);

  if (playAgain() === false) break;
}

console.clear();
prompt(color.rainbow('Thank you for playing Twenty One!'));