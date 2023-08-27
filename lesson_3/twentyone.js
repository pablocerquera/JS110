const rl = require('readline-sync');
const PLAYERS_HAND = [];
const DEALERS_HAND = [];
const FULL_DECK = [['H', '2'], ['H', '3'], ['H', '4'], ['H', '5'], ['H', '6'], ['H', '7'],
  ['H', '8'], ['H', '9'],['H', '10'], ['H', 'J'], ['H', 'Q'], ['H', 'K'], ['H', 'A'],
  ['S', '2'], ['S', '3'], ['S', '4'], ['S', '5'], ['S', '6'], ['S', '7'],
  ['S', '8'], ['S', '9'],['S', '10'], ['S', 'J'], ['S', 'Q'], ['S', 'K'], ['S', 'A'],
  ['D', '2'], ['D', '3'], ['D', '4'], ['D', '5'], ['D', '6'], ['D', '7'],
  ['D', '8'], ['D', '9'],['D', '10'], ['D', 'J'], ['D', 'Q'], ['D', 'K'], ['D', 'A'],
  ['C', '2'], ['C', '3'], ['C', '4'], ['C', '5'], ['C', '6'], ['C', '7'],
  ['C', '8'], ['C', '9'],['C', '10'], ['C', 'J'], ['C', 'Q'], ['C', 'K'], ['C', 'A']];

function prompt(msg) {
  return console.log(`=> ${msg}`);
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function busted(cards) {
  return total(cards) >= 21;
}

function dealToPlayer() {

  PLAYERS_HAND.push(FULL_DECK[0]);

  FULL_DECK.shift();

  return PLAYERS_HAND;
}

function dealToDealer() {
  DEALERS_HAND.push(FULL_DECK[0]);

  FULL_DECK.shift();

  return DEALERS_HAND;
}

function playerHitOrStay() {
  while (true) {
    prompt("Would you like to 'Hit' or 'Stay'.");
    let hitOrStay = rl.question().toLowerCase();
    if (hitOrStay === 'stay') {
      return 'stay';
    } else if (hitOrStay === 'hit') {
      return dealToPlayer();
    }
  }
}

function dealerHitOrStay() {
  if (DEALERS_HAND.length === 0) {
    dealToDealer();
  } else if (total(DEALERS_HAND) <= 15) {
    dealToDealer();
  }
}

function justTheValues(array) {
  return array.map(cards => cards[1]);
}


// Main Loop
while (true) {
  shuffle(FULL_DECK);
  let answer = playerHitOrStay();
  if (busted(PLAYERS_HAND) || answer === 'stay') break;
  prompt(`This is your hand: ${justTheValues(PLAYERS_HAND)}`);
  dealerHitOrStay();
  prompt(`This is the Dealers card: ${justTheValues(DEALERS_HAND)[0]}`);
}

if (busted(PLAYERS_HAND)) {
  prompt(`you lost because of you busted your total was: ${total(PLAYERS_HAND)}`);
  prompt(`The dealers total: ${total(DEALERS_HAND)}`);
} else {
  prompt(`You chose to stay! Your total: ${total(PLAYERS_HAND)} the dealers total: ${total(DEALERS_HAND)}`);
}

