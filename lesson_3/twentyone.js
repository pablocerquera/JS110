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
const CORRECTION_FOR_ACE = 10;
const HIT = 'hit';
const JUST_H = 'h';
const STAY = 'stay';
const JUST_S = 's';
const READY = 'ready';
const YES = 'yes';
const JUST_Y = 'y';
const NO = 'no';
const JUST_N = 'n';

function gameWelcome() {
  prompt('Welcome to Twenty One!');
  prompt(`The player closer to ${WINNING_NUMBER} wins.`);
  prompt(`Ace: 1 or 11, Numbered cards: number on card, Face Cards: 10`);
  prompt('Enjoy!!');
}

function playerReady() {
  prompt('Are you ready?');
  while (true) {
    let ready = rl.question().toLowerCase();
    if (ready === READY || ready === YES || ready === 'y') {
      break;
    } else {
      prompt("Whenever you are ready type ready or (y)es.");
    }
  }
}

function initialDeal(playerHand, dealerHand, fullDeck) {
  playerHand.push(fullDeck[0]);
  removeCard(fullDeck);
  dealerHand.push(fullDeck[0]);
  removeCard(fullDeck);
}

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
    if (sum > WINNING_NUMBER) sum -= CORRECTION_FOR_ACE;
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

function removeCard(fullDeck) {
  fullDeck.shift();
}

function playerHitOrStay() {
  while (true) {
    prompt(`Would you like to ${color.brightBlue('(H)it')} or ${color.brightRed('(S)tay')}.`);
    let hitOrStay = rl.question().toLowerCase();
    // if (busted(playerTotal)) return STAY;
    if (hitOrStay === STAY || hitOrStay === JUST_S) {
      return STAY;
    } else if (hitOrStay === HIT || hitOrStay === JUST_H) {
      return HIT;
    }
  }
}

function dealerHitOrStay(dealerHand) {
  if (dealerHand.length === 0) {
    return HIT;
  } else if (total(dealerHand) <= 17) {
    return HIT;
  } else return STAY;
}

function cardValues(array) {
  return array.map(cards => cards[1]);
}

function playAgain() {
  while (true) {
    prompt("Would you like to play again?");
    let answer = rl.question().toLowerCase();
    if (answer === YES || answer === JUST_Y) {
      return true;
    } else if (answer === NO || answer === JUST_N) {
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
    case playerDistance === dealerDistance:
      return 'ITS A TIE!!!';
    default:
      return 'confusion.';
  }
}

function incrementScore(winner, score) {
  switch (true) {
    case winner === 'You Win!!!':
      score.player += 1;
      break;
    case winner === 'Dealer wins!!!':
      score.dealer += 1;
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
  let dealerHandMsg = `The dealers hand: ${color.brightGreen(dealerCardValues)} and total: ${color.brightGreen(dealerTotal)}`;
  let bustedMsg = `${dealerBusted ? 'Dealer' : 'You'} busted`;

  displayResultsHelper(playerHandMsg, dealerHandMsg, playerTotal,
    bustedMsg, dealerBusted);

}

function displayResultsHelper(playerHandMsg, dealerHandMsg, playerTotal,
  bustedMsg, dealerBusted) {
  if (busted(playerTotal)) {
    prompt(`${bustedMsg}, ${playerHandMsg}`);
    console.log(LARGE_DIVIDER);
    prompt(dealerHandMsg);
  } else if (dealerBusted) {
    prompt(`${bustedMsg}, ${playerHandMsg}`);
    console.log(LARGE_DIVIDER);
    prompt(dealerHandMsg);
  } else {
    prompt(`You chose to stay, ${playerHandMsg}`);
    console.log(LARGE_DIVIDER);
    prompt(dealerHandMsg);
  }
}

function seriesWinner(score) {
  if (score.player === MATCH_LIMIT) {
    return color.blue.bold('You won the series!! Congratulations!');
  } else if ( score.dealer === MATCH_LIMIT) {
    return color.yellow.bold("You lost the series... Maybe practice and next time you'll do better.");
  } else {
    return 'confusion.';
  }
}

function playersTurn(playerTotal, playerHand, dealerHand,
  SCORE_OBJ, fullDeck) {
  while (true) {
    // PLAYER'S TURN
    console.clear();
    playerTotal = total(playerHand);

    console.log(`Best out of 5 wins! You: ${color.blue(SCORE_OBJ.player)} Dealer: ${color.green(SCORE_OBJ.dealer)}`);
    prompt(`This is your hand: ${color.brightBlue(cardValues(playerHand).join(', '))} current total: ${color.brightBlue(playerTotal)}`);
    console.log(LARGE_DIVIDER);
    prompt(`This is the dealers card: ${color.brightGreen(cardValues(dealerHand)[0])}`);
    console.log(HEADER_DIVIDER);
    if (busted(playerTotal)) break;
    let answer = playerHitOrStay(playerTotal);
    if (answer === HIT) {
      dealToPlayer(playerHand, fullDeck);
      removeCard(fullDeck);
    } else if (answer === STAY) break;
  }
  return playerTotal;
}

function dealersTurn(dealerHand, fullDeck, dealerTotal) {
  while (true) {
    // DEALER'S TURN
    console.clear();
    let answer = dealerHitOrStay(dealerHand, fullDeck);
    if (answer === HIT) {
      dealToDealer(dealerHand, fullDeck);
      removeCard(fullDeck);
    } else if (answer === STAY) break;

    dealerTotal = total(dealerHand);

    if (busted(dealerTotal)) break;
  }
  return dealerTotal;
}

function reachedMaxScore(SCORE_OBJ) {
  if (SCORE_OBJ.player === MATCH_LIMIT ||
    SCORE_OBJ.dealer === MATCH_LIMIT) return true;
}

// PLAY AGAIN LOOP
while (true) {
  console.clear();
  gameWelcome();
  const SCORE_OBJ = {player: 0, dealer: 0};

  while (true) {
    let fullDeck = shuffle(FULL_DECK.slice()); // sliced to make a shallow copy.
    let playerHand = [];
    let dealerHand = [];
    let playerTotal = total(playerHand);
    let dealerTotal = total(dealerHand);

    initialDeal(playerHand, dealerHand, fullDeck);
    playerReady();
    // GAME LOOP
    // PLAYER'S TURN
    playerTotal = playersTurn(playerTotal, playerHand, dealerHand,
      SCORE_OBJ, fullDeck);

    if (busted(playerTotal)) {
      SCORE_OBJ.dealer += 1;
      prompt('YOU BUSTED!');
      if (reachedMaxScore(SCORE_OBJ)) break;
      continue;
    }
    // DEALER'S TURN
    dealerTotal = dealersTurn(dealerHand, fullDeck, dealerTotal);

    // GAME LOOP END
    console.clear();
    // RESULTS
    displayResults(playerHand, dealerHand, playerTotal, dealerTotal);
    prompt(color.white.italic(detectWinner(playerTotal, dealerTotal)));
    incrementScore(detectWinner(playerTotal, dealerTotal), SCORE_OBJ);

    if (reachedMaxScore(SCORE_OBJ)) break;
  }
  console.log(SMALL_DIVIDER);
  prompt(seriesWinner(SCORE_OBJ));
  console.log(SMALL_DIVIDER);

  if (!playAgain()) break;
}

console.clear();
prompt(color.rainbow('Thank you for playing Twenty One!'));