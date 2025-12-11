// helper method for HTML elements

export default class Element {
  constructor(gameId, id, cleanupTask) {
    this.gameId = gameId; // the HTML id for the game this element is referencing
    this.id = id; // id of the HTML element
    this.cleanupTask = cleanupTask; // task used for cleanup
  }

  // helper method to query the correct HTML element
  getElement() {
    return document.querySelector(`#${this.gameId} #${this.id}`);
  }

  // cleanup method to simplify cleaning
  cleanup() {
    const element = this.getElement();

    this.cleanupTask(element);
  }
} 
