const CardSuits = Object.freeze({
  'c': 'clubs',
  'd': 'diamonds',
  'h': 'hearts',
  's': 'spades',
})

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
  'a': 14
});

const CardValueNames = Object.freeze({
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  'x': 'ten',
  'j': 'jack',
  'q': 'queen',
  'k': 'king',
  'a': 'ace',
});

// ================================================================================================
class Card {
  // ==============================================================================================
  // properties
  // ==============================================================================================
  /** @type {Readonly<keyof CardSuits>} */
  _suit;

  /** @type {Readonly<keyof CardValues>} */
  _value;

  // ==============================================================================================
  // public
  // ==============================================================================================
  /**
   * @param {keyof CardValues} value
   * @param {keyof CardSuits} suit
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
 * 
 * @param {keyof CardValues} value 
 */
function CardValueToLiteral(value) {
  return (value === 'x' ? '10' : value);
}

const CardUtils = {
  Card,
  CardSuits,
  CardValues,
  CardValueNames,
  CardValueToLiteral,
  CreateCardFromId,
};

export default CardUtils;
