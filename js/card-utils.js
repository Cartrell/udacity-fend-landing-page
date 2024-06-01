const CardSuits = Object.freeze({
  'c': 'clubs',
  'd': 'diamonds',
  'h': 'hearts',
  's': 'spades',
});

const CardValues = Object.freeze({
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'x': 10,
  'j': 11,
  'q': 12,
  'k': 13,
  'a': 14,
});

const CardValueLiterals = Object.freeze({
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  'x': '10',
  'j': 'J',
  'q': 'Q',
  'k': 'K',
  'a': 'A',
});

/**
 * @typedef {typeof CardSuits[keyof typeof CardSuits]} CardSuit
 * @typedef {typeof CardValues[keyof typeof CardValues]} CardValue
 */

const CARD_BACK_IMG_SRC = './assets/cards/card-back.png';

// ================================================================================================
class Card {
  // ==============================================================================================
  // properties
  // ==============================================================================================
  /** @type {Readonly<CardSuit>} */
  _suit;

  /** @type {Readonly<CardValue>} */
  _value;

  // ==============================================================================================
  // public
  // ==============================================================================================
  /**
   * @param {CardValue} value
   * @param {CardSuit} suit
   */
  constructor(value, suit) {
    this._suit = suit;
    this._value = value;
  }

  // ----------------------------------------------------------------------------------------------
  get suit() {
    return (this._suit);
  }

  // ----------------------------------------------------------------------------------------------
  get value() {
    return (this._value);
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * Creates a new `Card` object, given a card id.
 * @param {`${keyof CardValues}${keyof CardSuits}`} id 
 * @returns {Card | undefined} The new `Card`, or `undefined` if the id is invalid.
 */
function CreateCardFromId(id) {
  const [value, suit] = [id?.charAt(0), id?.charAt(1)];
  return (value in CardValues && suit in CardSuits ? new Card(value, suit) : undefined);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {Card} card
 */
function CreateImgSrcFromCard(card) {
  return (`./assets/cards/card_${card.value}${card.suit}.png`);
}

export {
  Card,
  CARD_BACK_IMG_SRC,
  CardSuits,
  CardValues,
  CardValueLiterals,
  CreateCardFromId,
  CreateImgSrcFromCard,
};
