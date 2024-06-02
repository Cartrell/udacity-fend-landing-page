import * as CardUtils from './card-utils.js';
import * as PokerUtils from './poker-utils.js';
import Deck from './deck-utils.js';

// ================================================================================================
// typedefs
// ================================================================================================
/**
 * @typedef CardUi
 * @type {object}
 * @property {CardUtils.Card | null} card - the card data
 * @property {readonly HTMLElement} element - the HTML element visually representing the card
 *  and all its sub-elements
 * @property {readonly HTMLElement} holdCaption - the caption element representing the state
 *  of the card. One of the sub-elements of `element`.
 * @property {readonly HTMLImageElement} image - the HTML image element visually representing the
 *  card image. One of the sub-elements of `element`.
 * @property {boolean} isFaceUp - specifies if the card is face up
 * @property {boolean} isHeld - specifies if the card is currently being held
 */

// ================================================================================================
/**
 * global state object
 */
const Poker = Object.freeze({
  /** rate, in ms, at which the cards are animated in sequence */
  CardDealRateMs: 100,

  Callbacks: {
    /** @type {Function} */
    DealCardsComplete: null,
  },

  Elements: {
    /** @type {Set<HTMLImageElement>} */
    activeAnimatingCards: new Set(),

    /** @type {CardUi[]} */
    cards: [],

    /** @type {readonly HTMLButtonElement | null} */
    dealButton: document.querySelector('#game-button'),

    /** @type {Deck} */
    deck: undefined,

    /** @type {HTMLParagraphElement | null} */
    pokerHandLabel: document.querySelector('.game-poker-hand-label'),
  },

  States: {
    Step: 0,
  },
});

// ================================================================================================
// functions
// ================================================================================================

// ------------------------------------------------------------------------------------------------
/**
 * @param {number[]} [cardUiIndexes]
 */
function dealCards(cardUiIndexes) {
  if (!cardUiIndexes) {
    cardUiIndexes = [0, 1, 2, 3, 4];
  }

  let index = cardUiIndexes.shift();
  while (index !== undefined) {
    const cardUi = Poker.Elements.cards[index];
    if (cardUi) {
      setCardHeld(cardUi, false);
      Poker.Elements.activeAnimatingCards.add(cardUi.image);

      const card = Poker.Elements.deck.draw();
      setTimeout(() => {
        setCard(cardUi, card, false);
        cardUi.image.classList.remove('discard-card-anim');
        cardUi.image.classList.add('deal-card-anim');
      }, index * Poker.CardDealRateMs);
    }

    index = cardUiIndexes.shift();
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUi} cardUi 
 */
function discardCard(cardUi) {
  cardUi.image.classList.add('discard-card-anim');
}

// ------------------------------------------------------------------------------------------------
function discardNonHeldCards() {
  const nonHeldCards = Poker.Elements.cards.filter((cardUi) => !cardUi.isHeld);
  if (nonHeldCards.length > 0) {
    Poker.Callbacks.DealCardsComplete = onDiscardCardsComplete;

    nonHeldCards.forEach((cardUi, index) => {
      Poker.Elements.activeAnimatingCards.add(cardUi.image);

      setTimeout(() => {
        discardCard(cardUi);
      }, index * Poker.CardDealRateMs);
    });
  } else {
    presentGameEnd();
  }
}

// ------------------------------------------------------------------------------------------------
function drawReplacementCards() {
  const nonHeldCardsIndexes = Poker.Elements.cards
    .filter((cardUi) => !cardUi.isHeld)
    .map((cardUi) => Poker.Elements.cards.indexOf(cardUi));

  Poker.Callbacks.DealCardsComplete = onDrawReplacementCardsComplete;
  dealCards(nonHeldCardsIndexes);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {boolean} isEnabled 
 */
function enableDealButton(isEnabled) {
  if (Poker.Elements.dealButton) {
    Poker.Elements.dealButton.disabled = !isEnabled;
  }
}

// ------------------------------------------------------------------------------------------------
function evaluateHand() {
  /** @type {CardUtils[]} */
  const cards = Poker.Elements.cards
    .map((cardUi) => cardUi.card)
    .filter((card) => !!card);

  return (PokerUtils.Evaluate(cards));
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {HTMLElement} imageElement 
 */
function findCardUiFromImage(imageElement) {
  return (Poker.Elements.cards.find((cardUi) => cardUi.image === imageElement));
}

// ------------------------------------------------------------------------------------------------
function initCards() {
  if (Poker.Elements.cards.length > 0) {
    return;
  }

  /** @type {NodeListOf<HTMLElement>} */
  const cardElements = document.querySelectorAll('div.game-cards-container figure');
  cardElements.forEach((element) => {
    const image = element.querySelector('img');
    Poker.Elements.cards.push({
      card: null,
      element,
      holdCaption: element.querySelector('figcaption'),
      image,
      isFaceUp: false,
    });


    element.addEventListener('animationend', onElementAnimationEnd);
    image.addEventListener('pointerdown', onCardImagePointerDown);
  });
}

// ------------------------------------------------------------------------------------------------
function initDeck() {
  if (!Poker.Elements.deck) {
    Poker.Elements.deck = new Deck();
  }

  Poker.Elements.deck.shuffle();
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {PointerEvent} event
 */
function onCardImagePointerDown(event) {
  /** @type {HTMLImageElement} */
  const cardImage = event.target;
  const cardUi = findCardUiFromImage(cardImage);
  if (!cardUi) {
    return;
  }

  setCardHeld(cardUi, !cardUi.isHeld);
}

// ------------------------------------------------------------------------------------------------
function onDealButtonClick() {
  enableDealButton(false);

  if (Poker.States.Step === 0) {
    setPokerHandLabel(null);
    initDeck();
    initCards();
    dealCards();
    Poker.Callbacks.DealCardsComplete = onDealCardsComplete;
  } else if (Poker.States.Step === 1) {
    discardNonHeldCards();
  }
}

// ------------------------------------------------------------------------------------------------
function onDealCardsComplete() {
  Poker.States.Step = 1;

  Poker.Elements.cards.forEach((cardUi) => {
    cardUi.image.style.pointerEvents = 'auto';
  });

  enableDealButton(true);
}

// ------------------------------------------------------------------------------------------------
function onDiscardCardsComplete() {
  drawReplacementCards();
}

// ------------------------------------------------------------------------------------------------
function onDrawReplacementCardsComplete() {
  presentGameEnd();
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {AnimationEvent} event 
 */
function onElementAnimationEnd(event) {
  /** @type {HTMLImageElement} */
  const imageElement = event.target;
  if (event.animationName === 'flip1-keyframes') {
    const cardUi = findCardUiFromImage(imageElement);
    if (cardUi) {
      setCardFaceUp(cardUi, true);
    }
  } else if (event.animationName === 'flip2-keyframes') {
    imageElement.classList.remove('deal-card-anim');

    const numActiveBefore = Poker.Elements.activeAnimatingCards.size;
    Poker.Elements.activeAnimatingCards.delete(imageElement);

    if (numActiveBefore > 0 && Poker.Elements.activeAnimatingCards.size === 0) {
      if (Poker.Callbacks.DealCardsComplete) {
        Poker.Callbacks.DealCardsComplete();
      }
    }
  } else if (event.animationName === 'discard-keyframes') {
    const numActiveBefore = Poker.Elements.activeAnimatingCards.size;
    Poker.Elements.activeAnimatingCards.delete(imageElement);

    if (numActiveBefore > 0 && Poker.Elements.activeAnimatingCards.size === 0) {
      if (Poker.Callbacks.DealCardsComplete) {
        Poker.Callbacks.DealCardsComplete();
      }
    }
  }
}

// ------------------------------------------------------------------------------------------------
function presentGameEnd() {
  Poker.States.Step = 0;
  enableDealButton(true);

  const results = evaluateHand();
  if (!results) {
    return;
  }

  setPokerHandLabel(results.handType);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUi} cardUi
 * @param {CardUtils.Card} card
 * @param {boolean} isFaceUp
 */
function setCard(cardUi, card, isFaceUp) {
  cardUi.card = card;
  setCardFaceUp(cardUi, isFaceUp);
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUi} cardUi
 * @param {boolean} isFaceUp
 */
function setCardFaceUp(cardUi, isFaceUp) {
  cardUi.isFaceUp = isFaceUp;

  if (isFaceUp && cardUi.card) {
    cardUi.image.src = CardUtils.CreateImgSrcFromCard(cardUi.card);
  } else {
    cardUi.image.src = CardUtils.CARD_BACK_IMG_SRC;
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {CardUi} cardUi
 * @param {boolean} isHeld
 */
function setCardHeld(cardUi, isHeld) {
  cardUi.isHeld = isHeld;
  cardUi.holdCaption.style.visibility = isHeld ? 'visible' : 'hidden';
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {PokerUtils.PokerHandType | null} handType
 */
function setPokerHandLabel(handType) {
  if (Poker.Elements.pokerHandLabel) {
    Poker.Elements.pokerHandLabel.textContent = handType !== null
      && handType in PokerUtils.PokerHandNames
        ? PokerUtils.PokerHandNames[handType]
        : '------------';
  }
}

// ================================================================================================
// main execution
// ================================================================================================
Poker.Elements.dealButton?.addEventListener('click', onDealButtonClick);

/*
modules.export = {
  Poker,
};
*/
export default Poker;
