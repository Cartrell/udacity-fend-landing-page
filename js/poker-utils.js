// import * as CardUtils from './card-utils.js';

// ================================================================================================
// locals
// ================================================================================================
const PokerHandTypes = Object.freeze({
  JACKS_OR_BETTER_PAIR: 'jacksOrBetterPair',
  TWO_PAIR: 'twoPair',
  THREE_KIND: 'threeKind',
  STRAIGHT: 'straight',
  FLUSH: 'flush',
  FULL_HOUSE: 'fullHouse',
  FOUR_KIND: 'fourKind',
  STRAIGHT_FLUSH: 'straightFlush',
  ROYAL_FLUSH: 'royalFlush',
});

/** @typedef {typeof PokerHandTypes[keyof typeof PokerHandTypes]} PokerHandType */

/** @type {Object.<string, (cards: readonly CardUtils.Card[]) => CardUtils.Card[] | undefined>} */
const PokerHandFunctions = Object.freeze({
  [PokerHandTypes.ROYAL_FLUSH]: evalRoyalFlush,
  [PokerHandTypes.STRAIGHT_FLUSH]: evalStraightFlush,
  [PokerHandTypes.FOUR_KIND]: evalFourKind,
  [PokerHandTypes.FULL_HOUSE]: evalFullHouse,
  [PokerHandTypes.FLUSH]: evalFlush,
  [PokerHandTypes.STRAIGHT]: evalStraight,
  [PokerHandTypes.THREE_KIND]: evalThreeKind,
  [PokerHandTypes.TWO_PAIR]: evalTwoPair,
  [PokerHandTypes.JACKS_OR_BETTER_PAIR]: evalJacksBetterPair,
});

const PokerHandNames = Object.freeze({
  [PokerHandTypes.ROYAL_FLUSH]: 'ROYAL FLUSH',
  [PokerHandTypes.STRAIGHT_FLUSH]: 'STRAIGHT FLUSH',
  [PokerHandTypes.FOUR_KIND]: 'FOUR OF A KIND',
  [PokerHandTypes.FULL_HOUSE]: 'FULL HOUSE',
  [PokerHandTypes.FLUSH]: 'FLUSH',
  [PokerHandTypes.STRAIGHT]: 'STRAIGHT',
  [PokerHandTypes.THREE_KIND]: 'THREE OF A KIND',
  [PokerHandTypes.TWO_PAIR]: 'TWO PAIR',
  [PokerHandTypes.JACKS_OR_BETTER_PAIR]: 'JACKS OR BETTER PAIR',
});

// ================================================================================================
// typedefs
// ================================================================================================
/**
 * @typedef PokerHandResult
 * @type {object}
 * @property {typeof PokerHandTypes[keyof typeof PokerHandTypes]} handType - the type of poker hand
 * @property {CardUtils.Card[] matchingCards} - the cards that make up the identifying poker hand
 */

// ================================================================================================
// properties
// ================================================================================================
const NUM_CARDS_IN_HAND = 5;

// ================================================================================================
// "local" functions
// ================================================================================================

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalRoyalFlush(cards) {
  let card1 = cards[0];
  if (card1.value !== CardUtils.GetValueFromValueKey('a')) {
    return (null);
  }

  for (let index = 1; index < cards.length - 1; index += 1) {
    const card2 = cards[index];
    if ((card1.value - card2.value !== 1) || (card1.suit !== card2.suit)) {
      return (null);
    }

    card1 = card2;
  }

  return ([...cards]);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalStraightFlush(cards) {
  for (let index = 0; index < cards.length - 1; index += 1) {
    const card1 = cards[index];
    const card2 = cards[index + 1];
    if ((card1.value - card2.value !== 1) || (card1.suit !== card2.suit)) {
      return (null);
    }
  }

  return ([...cards]);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalFourKind(cards) {
  const [card1, card2, card3, card4, card5] = cards;
  if (card1.value === card2.value && card1.value === card3.value && card1.value === card4.value) {
    return ([card1, card2, card3, card4]);
  }

  if (card2.value === card3.value && card3.value === card4.value && card4.value === card5.value) {
    return ([card2, card3, card4, card5]);
  }

  return (null);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalFullHouse(cards) {
  const [card1, card2, card3, card4, card5] = cards;
  if ((card1.value === card2.value && card1.value === card3.value)
      && (card4.value === card5.value)) {
    return ([...cards]);
  }

  if ((card3.value === card4.value && card4.value === card5.value)
      && (card1.value === card2.value)) {
    return ([...cards]);
  }

  return (null);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalFlush(cards) {
  for (let index = 0; index < cards.length - 1; index += 1) {
    const card1 = cards[index];
    const card2 = cards[index + 1];
    if ((card1.value - card2.value !== 1) || (card1.suit !== card2.suit)) {
      return (null);
    }
  }

  return (cards);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalStraight(cards) {
  for (let index = 0; index < cards.length - 1; index += 1) {
    const card1 = cards[index];
    const card2 = cards[index + 1];
    if (card1.value - card2.value !== 1) {
      return (null);
    }
  }

  return ([...cards]);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalThreeKind(cards) {
  for (let index = 0; index < cards.length - 2; index += 1) {
    const card1 = cards[index];
    const card2 = cards[index + 1];
    const card3 = cards[index + 2];
    if (card1.value === card2.value && card1.value === card3.value) {
      return [card1, card2, card3];
    }
  }

  return (null);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalTwoPair(cards) {
  let matchingCards = null;
  let firstPairValue;
  for (let index = 0; index < 4; index += 1) {
    const card1 = cards[index];
    const card2 = cards[index + 1];
    if (card1.value === card2.value) {
      if (firstPairValue === undefined) {
        firstPairValue = card1.value;
        matchingCards = [card1, card2];
      } else if (card1.value !== firstPairValue) {
        matchingCards.push(card1, card2);
        return (matchingCards);
      }
    }
  }

  return (null);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 */
function evalJacksBetterPair(cards) {
  for (let index = 0; index < cards.length - 2; index += 1) {
    const card1 = cards[index];
    const card2 = cards[index + 1];
    if (card1.value >= CardUtils.GetValueFromValueKey('j') && card1.value === card2.value) {
      return [card1, card2];
    }
  }

  return (null);
}

// ================================================================================================
// "public" functions
// ================================================================================================

// ------------------------------------------------------------------------------------------------
/**
 * @param {readonly CardUtils.Card[]} cards
 * @return {PokerHandResult | null}
 */
function Evaluate(cards) {
  if (!cards || cards.length !== NUM_CARDS_IN_HAND) {
    return (null);
  }

  const sortedCardDesc = cards.sort((card1, card2) => card2.value - card1.value);
  const handTypes = Object.keys(PokerHandFunctions);
  for (let index = 0; index < handTypes.length; index += 1) {
    const handType = handTypes[index];
    const handEvalFunction = PokerHandFunctions[handType];
    const matchingCards = handEvalFunction(sortedCardDesc);
    if (matchingCards) {
      return ({
        handType,
        matchingCards,
      });
    }
  }

  return (null);
}

const PokerUtils = {
  Evaluate,
  NUM_CARDS_IN_HAND,
  PokerHandNames,
};

modules.exports = {
  PokerUtils,
};
