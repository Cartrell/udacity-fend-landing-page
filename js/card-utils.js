const CardSuits = Object.freeze(['c', 'd', 'h', 's']);
const CardValues = Object.freeze([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
const CardValuesMap = Object.freeze({
  '2': Object.freeze({name: '2', value: CardValues[0]}),
  '3': Object.freeze({name: '3', value: CardValues[1]}),
  '4': Object.freeze({name: '4', value: CardValues[2]}),
  '5': Object.freeze({name: '5', value: CardValues[3]}),
  '6': Object.freeze({name: '6', value: CardValues[4]}),
  '7': Object.freeze({name: '7', value: CardValues[5]}),
  '8': Object.freeze({name: '8', value: CardValues[6]}),
  '9': Object.freeze({name: '9', value: CardValues[7]}),
  'x': Object.freeze({name: '10', value: CardValues[8]}),
  'j': Object.freeze({name: 'J', value: CardValues[9]}),
  'q': Object.freeze({name: 'Q', value: CardValues[10]}),
  'k': Object.freeze({name: 'K', value: CardValues[11]}),
  'a': Object.freeze({name: 'A', value: CardValues[12]}),
});

/**
 * @typedef {'c' | 'd' | 'h' | 's'} CardSuit
 * @typedef {2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14} CardValue
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
 * @param {`${keyof CardValuesMap}${CardSuit}`} id 
 * @returns {Card | undefined} The new `Card`, or `undefined` if the id is invalid.
 */
function CreateCardFromId(id) {
  const [valueKey, suit] = [id?.charAt(0), id?.charAt(1)];
  return (valueKey in CardValuesMap && CardSuits.includes(suit)
    ? new Card(CardValuesMap[valueKey].value, suit)
    : undefined);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {keyof CardValuesMap} cardValueKey
 */
function GetValueFromValueKey(cardValueKey) {
  const valueData = CardValuesMap[cardValueKey];
  return (valueData ? valueData.value : undefined);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardValue} cardValue
 * @returns {CardValue | undefined}
 */
function GetValueKeyFromValue(cardValue) {
  const valueKeys = Object.keys(CardValuesMap);
  return (valueKeys.find((valueKey) => {
    const valueData = CardValuesMap[valueKey];
    return (valueData.value === cardValue);
  }));
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {Card} card
 */
function CreateImgSrcFromCard(card) {
  return (`./assets/cards/card_${GetValueKeyFromValue(card.value)}${card.suit}.png`);
}

const CardUtils = {
  Card,
  CARD_BACK_IMG_SRC,
  CardSuits,
  CardValues,
  CardValuesMap,
  CreateCardFromId,
  CreateImgSrcFromCard,
  GetValueFromValueKey,
  GetValueKeyFromValue,
};

modules.export = {
  CardUtils,
};
