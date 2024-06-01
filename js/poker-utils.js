import * as CardUtils from './card-utils.js';

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

const PokerHandFunctins = Object.freeze({
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

// ================================================================================================
// typedefs
// ================================================================================================
/**
 * @typedef PokerHandResult
 * @type {object}
 * @property {typeof PokerHandTypes[keyof typeof PokerHandTypes]} card - the type of poker hand
 */

// ================================================================================================
// properties
// ================================================================================================
const NUM_CARDS_IN_HAND = 5;

evalRoyalFlush

// ================================================================================================
// "local" functions
// ================================================================================================

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalRoyalFlush(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalStraightFlush(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalFourKind(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalFullHouse(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalFlush(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalStraight(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalThreeKind(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalTwoPair(cards) {
  // TODO
  return (false);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 */
function evalJacksBetterPair(cards) {
  // TODO
  return (false);
}

// ================================================================================================
// "public" functions
// ================================================================================================

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUtils.Card[]} cards
 * @return {PokerHandResult | null}
 */
function Evaluate(cards) {
  if (!cards || cards.length !== NUM_CARDS_IN_HAND) {
    return (null);
  }

  const sortedCardDesc = cards.sort((card1, card2) => card2.value - card1.value);
}

export {
  Evaluate,
  NUM_CARDS_IN_HAND,
};
