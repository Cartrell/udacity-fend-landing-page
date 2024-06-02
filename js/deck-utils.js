// import * as CardUtils from './card-utils.js';

// ================================================================================================
class Deck {
  // ==============================================================================================
  // properties
  // ==============================================================================================
  /** @type {CardUtils.Card[]} */
  _cards;

  _index;

  // ==============================================================================================
  // public
  // ==============================================================================================
  // ----------------------------------------------------------------------------------------------
  constructor() {
    this._cards = [];
    this._index = 0;

    CardUtils.CardValues.forEach((value) => {
      CardUtils.CardSuits.forEach((suit) => {
        this._cards.push(new CardUtils.Card(value, suit));
      });
    });
  }

  // ----------------------------------------------------------------------------------------------
  draw() {
    const card = this._cards[this._index];
    this._index += 1;
    return (card);
  }

  // ----------------------------------------------------------------------------------------------
  /**
   * Shuffles the cards in the deck, and resets the deck index.
   * The shuffling algorith used is "Fisher-Yates"
   * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle|Fisher-Yates}
   */
  shuffle() {
    const n = this._cards.length;
    for (let index = n - 1; index > 0; index -= 1) {
      const index2 = Math.floor(Math.random() * index);
      [this._cards[index], this._cards[index2]] = [this._cards[index2], this._cards[index]];
    }

    this._index = 0;
  }
}

// export default Deck;
modules.exports = {
  Deck,
};
