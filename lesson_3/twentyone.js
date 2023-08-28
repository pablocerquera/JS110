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
  return total(cards) > 21;
}

function dealToPlayer(fullDeck) {

  PLAYERS_HAND.push(fullDeck[0]);

  fullDeck.shift();

  return PLAYERS_HAND;
}

function dealToDealer(fullDeck) {
  DEALERS_HAND.push(fullDeck[0]);

  fullDeck.shift();

  return DEALERS_HAND;
}

function playerHitOrStay(fullDeck) {
  while (true) {
    prompt("Would you like to 'Hit' or 'Stay'.");
    let hitOrStay = rl.question().toLowerCase();
    if (hitOrStay === 'stay') {
      return 'stay';
    } else if (hitOrStay === 'hit') {
      return dealToPlayer(fullDeck);
    }
  }
}

function dealerHitOrStay(fullDeck) {
  if (DEALERS_HAND.length === 0) {
    dealToDealer(fullDeck);
  } else if (total(DEALERS_HAND) <= 15) {
    dealToDealer(fullDeck);
  }
}

function justTheValues(array) {
  return array.map(cards => cards[1]).join(', ');
}

function playAgain() {
  while (true) {
    prompt("Would you like to play again?");
    let answer = rl.question().toLowerCase();
    if (answer === 'yes') {
      return true;
    } else if (answer === 'no') {
      return false;
    } else {
      prompt('We need a yes or no answer.');
    }
  }
}

function detectWinner(player, dealer) {
  let playerDistance = 21 - total(player);
  let dealerDistance = 21 - total(dealer);

  switch (true) {
    case busted(DEALERS_HAND):
      return 'You Win!!!';
    case busted(PLAYERS_HAND):
      return 'Dealer wins!!!';
    case playerDistance < dealerDistance:
      return 'You Win!!!';
    case playerDistance > dealerDistance:
      return 'Dealer wins!!!';
    default:
      return 'ITS A TIE!!!';
  }

  // if (playerDistance > 0) {
  //   if (playerDistance < dealerDistance) {
  //     return 'You win!!!';
  //   } else if (playerDistance > dealerDistance) {
  //     return 'Dealer wins!!!';
  //   } else {
  //     return 'ITS A TIE!!!';
  //   }
  // } else if (playerDistance < 0) {
  //   if (playerDistance > dealerDistance) {
  //     return 'You win!!!';
  //   } else if (playerDistance < dealerDistance) {
  //     return 'Dealer wins!!!';
  //   } else {
  //     return 'ITS A TIE!!!';
  //   }
  // }
}

// PLAY AGAIN LOOP
while (true) {
  console.clear();
  let fullDeck = FULL_DECK.slice();
  PLAYERS_HAND.length = 0;
  DEALERS_HAND.length = 0;

  shuffle(FULL_DECK);

  let dealerTotal = total(DEALERS_HAND);

  // GAME LOOP
  while (true) {
    console.log('===================================');
    let answer = playerHitOrStay(fullDeck);
    dealerHitOrStay(fullDeck);
    if (busted(PLAYERS_HAND) || answer === 'stay') break;
    if (busted(DEALERS_HAND)) break;
    console.clear();

    prompt(`This is your hand: ${justTheValues(PLAYERS_HAND)} current total: ${playerTotal}`);
    console.log('--------------------------------------------');
    prompt(`This is the dealers card: ${justTheValues(DEALERS_HAND)[0]}`);// I want better readabilty for the user.

    let playerTotal = total(PLAYERS_HAND);

  }
  // GAME LOOP END
  console.clear();
  // RESULTS
  if (busted(PLAYERS_HAND)) {
    prompt(`You busted, your hand: ${justTheValues(PLAYERS_HAND)} your total was: ${total(PLAYERS_HAND)}`);
    console.log('--------------------------------------------');
    prompt(`The dealers hand: ${justTheValues(DEALERS_HAND)} and total: ${total(DEALERS_HAND)}`);
  } else if (busted(DEALERS_HAND)) {
    prompt(`Dealer busted, your hand: ${justTheValues(PLAYERS_HAND)} your total was: ${total(PLAYERS_HAND)}`);
    console.log('--------------------------------------------');
    prompt(`The dealers hand: ${justTheValues(DEALERS_HAND)} and total: ${total(DEALERS_HAND)}`);
  } else {
    prompt(`You chose to stay, your hand: ${justTheValues(PLAYERS_HAND)} your total was: ${total(PLAYERS_HAND)}`);
    console.log('--------------------------------------------');
    prompt(`The dealers hand: ${justTheValues(DEALERS_HAND)} and total: ${total(DEALERS_HAND)}`);
  }

  console.log('-------------');
  prompt(detectWinner(PLAYERS_HAND, DEALERS_HAND));
  console.log('-------------');

  let repeat = playAgain(); // not a huge fan of this solution I feel like there is a better way.
  if (repeat === false) break;
}

console.clear();
prompt('Thank you for playing Twenty One!');