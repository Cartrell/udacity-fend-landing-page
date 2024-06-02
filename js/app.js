/*
import * as CardUtils from './card-utils.js';
import './poker.js';
*/

/**
 * Global state object.
 */
const App = Object.freeze({
  /**
   * Indicates percentage of the current window height that the y position that a section must
   * cross before it is considered active.
   */
  ActiveSectionWindowHeightThresholdRatio: 0.15,

  /** Delay, in ms, that the header will hide after no scrolling has occurred */
  AutoHideNavBarDelayMs: 1500,

  /** CSS classes to avoid magic strings */
  Classes: Object.freeze({
    ActiveSection: 'active-section',
    ActiveSectionLinkClasses: ['active-link-unvisited', 'active-link-visited'],
    HeaderNavbarList: 'header-navbar-list',
    HeaderNavbarListItem: 'header-navbar-list-item',
    HeaderNavbarListItemActive: 'header-navbar-list-item-active',
    PokerHandSample: 'poker-hand-sample',
    PokerHandSampleCard: 'poker-hand-sample-card',
  }),

  Elements: {
    /** @type {number | undefined} */
    AutoHideNavHeaderHandle: undefined,

    /** @type {HTMLElement | null} */
    NavHeader: null,

    /** @type {Map<HTMLElement, HTMLLIElement>} */
    NavHeaderItemsBySection: new Map(),

    /** @type {HTMLButtonElement | null} */
    ScrollToTopButton: null,

    /** @type {HTMLElement[]} */
    Sections: [],
  },

  /** CSS ids to avoid magic strings */
  Ids: Object.freeze({
  }),

  /**
   * Maintains state for `scroll` event halding
   * @see {@link initDocumentScrollEvent}
   */
  ScrollState: {
    IsBusy: false,
  },

  /** @type {Object<string, DOMRect>} */
  SectionVisibleRects: {},
});

// ------------------------------------------------------------------------------------------------
// functions
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
function cancelAutoNavHeaderTimeout() {
  if (App.Elements.AutoHideNavHeaderHandle) {
    clearTimeout(App.Elements.AutoHideNavHeaderHandle);
    App.Elements.AutoHideNavHeaderHandle = undefined;
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * Determines if the window has scrolled to its very bottom.
 * @returns `true` if window has scrolled to its very bottom.
 */
function isScrolledToBottom() {
  // scrollTop is a fallback in case scrollY isn'o't supported (for example, on *cough*Safari)
  const scrollPosition = window.scrollY ?? document.documentElement.scrollTop;

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  return (scrollPosition + windowHeight) >= documentHeight;
}

// ------------------------------------------------------------------------------------------------
/**
 * Sets the active state of a nav bar header item according to its corresponding section element
 * @param {HTMLElement} section
 * @param {boolean} isActive
 */
function setNavHeaderItemActive(section, isActive) {
  const listItem = App.Elements.NavHeaderItemsBySection.get(section);
  if (!listItem) {
    return;
  }

  if (isActive) {
    listItem.classList.add(App.Classes.HeaderNavbarListItemActive);
  } else {
    listItem.classList.remove(App.Classes.HeaderNavbarListItemActive);
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * Sets the active state of the anchor elements in a section element
 * @param {HTMLElement} section
 * @param {boolean} isActive
 */
function setSectionAnchorsActive(section, isActive) {
  const anchorElements = section.querySelectorAll('a');

  if (isActive) {
    anchorElements.forEach((anchorElement) => {
      anchorElement.classList.add(...App.Classes.ActiveSectionLinkClasses);
    });
  } else {
    anchorElements.forEach((anchorElement) => {
      anchorElement.classList.remove(...App.Classes.ActiveSectionLinkClasses);
    });
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * Sets the active state of a section element and its other corresponding elements
 * @param {HTMLElement} section
 * @param {boolean} isActive
 */
function setSectionActive(section, isActive) {
  if (isActive) {
    section.classList.add(App.Classes.ActiveSection);
  } else {
    section.classList.remove(App.Classes.ActiveSection);
  }

  setSectionAnchorsActive(section, isActive);
  setNavHeaderItemActive(section, isActive);
}

// ------------------------------------------------------------------------------------------------
function updateActiveSection() {
  const _isScrolledToBottom = isScrolledToBottom();
  const { Sections } = App.Elements;
  const lastSectionIndex = Sections.length - 1;

  // modified version of the course's suggestion
  const thresholdRatio = window.innerHeight * App.ActiveSectionWindowHeightThresholdRatio;
  Sections.forEach((section, index) => {
    let isActive = false;

    if (index === lastSectionIndex) {
      // the last section will automatically become active if the page is scrolled to its very
      // bottom
      isActive = _isScrolledToBottom;
    } else {
      const rect = section.getBoundingClientRect();
      isActive = !_isScrolledToBottom
        && (rect.top <= thresholdRatio && rect.bottom >= thresholdRatio);
    }

    setSectionActive(section, isActive);
  });
}

// ------------------------------------------------------------------------------------------------
/**
 * Called when handling a scroll event is permitted. Due to the possibility that `scroll` events
 * can fire extremely rapidly, this function is a throttled version of the `scroll` event.
 * @param {number} position
 */
function onThrottledScroll(position) {
  updateActiveSection();
  updateNavHeader(position);
  updateScrollToTopButton(position);
}

// ------------------------------------------------------------------------------------------------
/**
 * Auto-hides the navbar header after a specified time has passed.
 * @param {number} delayMs The time, in milliseconds, to wait until the navbar is hidden.
 */
function hideNavHeaderAfter(delayMs) {
  cancelAutoNavHeaderTimeout();

  App.Elements.AutoHideNavHeaderHandle = setTimeout(() => {
    cancelAutoNavHeaderTimeout();

    if (App.Elements.NavHeader) {
      App.Elements.NavHeader.style.top = `-${App.Elements.NavHeader.clientHeight}px`;
    }
  }, delayMs);
}

// ------------------------------------------------------------------------------------------------
/**
 * Due to the possibility that `scroll` events can fire extremely rapidly, this function is a
 * throttled version of the `scroll` event.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling}
 */
function onDocumentScroll() {
  const { ScrollState } = App;
  if (!ScrollState.IsBusy) {
    window.requestAnimationFrame(() => {
      onThrottledScroll(window.scrollY);
      ScrollState.IsBusy = false;
    });

    ScrollState.IsBusy = true;
  }
}

// ------------------------------------------------------------------------------------------------
function _initNavBarHeader() {
  App.Elements.NavHeader = document.querySelector('.page-header');
  if (App.Elements.NavHeader) {
    // the nav header will remain visible as long as the pointer is over it
    App.Elements.NavHeader.addEventListener('pointerover', () => {
      showBavHeader();
    });

    // once the pointer leaves the nav header, it will auto-hide
    App.Elements.NavHeader.addEventListener('pointerout', () => {
      if (window.scrollY > 0) {
        hideNavHeaderAfter(App.AutoHideNavBarDelayMs);
      }
    });
  }
}

// ------------------------------------------------------------------------------------------------
function _initNavBarItems() {
  /** @type {HTMLUListElement | null} */
  const unorderedListElement = document.querySelector(`.${App.Classes.HeaderNavbarList}`);

  if (!unorderedListElement) {
    return;
  }

  App.Elements.Sections.forEach((section) => {
    const navSectionData = section.dataset.navSection;
    if (!navSectionData) {
      return;
    }

    const detailsElement = section.parentElement;
    if (!detailsElement) {
      return;
    }

    // create list items inside to scroll to theur designated sections when pressed
    const listItem = document.createElement('li');
    listItem.classList.add(App.Classes.HeaderNavbarListItem);
    listItem.textContent = navSectionData;
    listItem.addEventListener('pointerdown', () => {
      window.scroll({
        top: detailsElement.getBoundingClientRect().top
          + window.scrollY
          - App.Elements.NavHeader.clientHeight,

        behavior: 'smooth',
      });
    });

    // associate the list item element with its corresponding section element
    App.Elements.NavHeaderItemsBySection.set(section, listItem);

    unorderedListElement.appendChild(listItem);
  });
}

// ------------------------------------------------------------------------------------------------
/**
 * Initializes the navigation header bar.
 */
function initNavBar() {
  _initNavBarHeader();
  _initNavBarItems();
}

// ------------------------------------------------------------------------------------------------
/**
 * Sets the card images and caption for an article element.
 * @param {HTMLElement} articleElement The target `<article>` element.
 * @param {string} cardIdsSpecs The string of card ids from which the cards are created. Format
 * is one or more ID as: `cardId1-cardId2-...-cardIdN`. Each card id is made up of a card value
 * immediately by card suit, ie: `4c` represents the four of clubs.
 */
function initPokerHand(articleElement) {
  const {cardIds: cardIdsSpecs, caption} = articleElement.dataset;
  if (!cardIdsSpecs || !caption) {
    return;
  }

  const paraElement = articleElement.querySelector('p');
  if (!paraElement) {
    return;
  }

  const figureElement = document.createElement('figure');
  figureElement.classList.add(App.Classes.PokerHandSample);

  /** @type {CardUtils.CardValues[]} */
  const cardValues = [];
  const cardIds = cardIdsSpecs.split('-');
  cardIds.forEach((cardId) => {
    // create a new card; card id must be valid
    const card = CardUtils.CreateCardFromId(cardId);
    if (!card) {
      return;
    }

    // save card value for later processing of text in sibling p element
    cardValues.push(CardUtils.CardValuesMap[card.value]);

    // build an img for each card, and add it to the figure
    /** @type {HTMLDivElement} */
    const imageElement = document.createElement('img');
    imageElement.src = CardUtils.CreateImgSrcFromCard(card);
    imageElement.classList.add(App.Classes.PokerHandSampleCard);
    figureElement.appendChild(imageElement);
  });

  const figCaptionElement = document.createElement('figcaption');
  figCaptionElement.textContent = caption;
  figureElement.appendChild(figCaptionElement);

  // update the span inside the p element's text with the card values
  /** @type {HTMLSpanElement | null} */
  const spanElement = paraElement.querySelector('span');
  if (spanElement) {
    spanElement.textContent = cardValues.join('-');
  }

  const h3Element = document.createElement('h3');
  h3Element.textContent = caption;
  articleElement.insertBefore(h3Element, paraElement);

  articleElement.appendChild(figureElement);
}

// ------------------------------------------------------------------------------------------------
/**
 * Initializes the poker hand of every article in the poker hands section.
 */
function initPokerHands() {
  /** @type {NodeListOf<HTMLElement>} */
  const articleElements = document.querySelectorAll('article.poker-hand-container');
  articleElements.forEach((articleElement) => {
    initPokerHand(articleElement);
  });
}

// ------------------------------------------------------------------------------------------------
/**
 * Initializes the content sections.
 */
function initSections() {
  const sections = document.querySelectorAll('section[data-nav-section]');
  App.Elements.Sections.push(...Array.from(sections.values()));
}

// ------------------------------------------------------------------------------------------------
/**
 * Initializes the scroll-to-top button.
 */
function initScrollToTopButton() {
  App.Elements.ScrollToTopButton = document.querySelector(`.scroll-to-top-button`);
  if (App.Elements.ScrollToTopButton) {
    App.Elements.ScrollToTopButton.addEventListener('click', onScrollToTopButtonClick);
  }
}

// ------------------------------------------------------------------------------------------------
function onScrollToTopButtonClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// ------------------------------------------------------------------------------------------------
function showBavHeader() {
  cancelAutoNavHeaderTimeout();

  if (App.Elements.NavHeader) {
    App.Elements.NavHeader.style.top = `0`;
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {number} windowScrollPosition 
 */
function updateNavHeader(windowScrollPosition) {
  showBavHeader();

  if (windowScrollPosition > 0) {
    hideNavHeaderAfter(App.AutoHideNavBarDelayMs);
  }
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {number} windowScrollPosition 
 */
function updateScrollToTopButton(windowScrollPosition ) {
  const { ScrollToTopButton } = App.Elements;
  if (ScrollToTopButton) {
    ScrollToTopButton.style.display = windowScrollPosition > 0 ? 'block' : 'none';
  }
}

// ------------------------------------------------------------------------------------------------
// main execution
// ------------------------------------------------------------------------------------------------
initSections();
initNavBar();
initPokerHands();
initScrollToTopButton();

document.addEventListener('scroll', onDocumentScroll);
