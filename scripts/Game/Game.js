/*
 * This is a base class for the games 
 * The coin toss and random number game can inherit from it
*/ 

export default class game {
  constructor(gameID, elements) {
    this.gameElement = document.querySelector(`#${gameID}`) 
    this.elements = elements;
  }

  // get an element's HTML element from an ID
  getElement(id) {
    for (const element of this.elements) {
      if (element.id == id) {
        return element.getElement();
      }
    }

    // return null if none found
    return null;
  }

  // cleanup method to cleanup the entire game
  cleanup() {
    for (const element of Object.values(this.elements)) {
      element.cleanup(element.element);
    } 
  }

  // two very simple helper methods
  show() {
    this.gameElement.classList.add('active');
  }

  hide() {
    this.gameElement.classList.remove('active');
  }
}
