import Game from './game.js';
import Element from './element.js';

// import add and remove game
import { addGame, removeGame } from './GameManager.js';

export default class RandomNumberGame extends Game {
  // define a bunch of elements in the constructor
  // these "elements" have cleanup tasks

  constructor() {
    super("random-number", 
      [
        new Element('random-number', 'form', (element) => {
          element.removeEventListener('submit', this.onSubmit); // remove the previous listener
        }),

        new Element('random-number', 'input', (element) => {
          element.disabled = false 
        }),

        new Element('random-number', 'guesses', (element) => {
          element.innerHTML = ''
        }),

        new Element('random-number', 'result', (element) => {
          element.className = ''
        }),

        new Element('random-number', 'result-text', (element) => {
          element.innerHTML = ''
        }),
      ]
    );
    
    this.number = Math.floor(Math.random() * 100 + 1);  // declare number
    this.guesses = []; // declare guesses as empty array

    // bind events
    this.onSubmit = this.onSubmit.bind(this);
    this.restart = this.restart.bind(this);
    this.getElement('form').addEventListener('submit', this.onSubmit);
  }

  onSubmit(event) {
    const guess = Number(event.target[0].value); // get the guess
    event.preventDefault(); // prevent refresh
    
    event.target[0].value = ''; // clear the value

    let formatting = {}; // assign an empty table for formatting of the 'result'

    if (this.guesses.length < 11) {
      this.guesses.push(guess); // add a guess 

      // convert the array to a readable format and set the HTML
      const guesses_readable = this.guesses.toString().replaceAll(',', ' ');
      this.getElement('guesses').innerHTML = `Previous guesses: ${guesses_readable}`;

      // if statements to change formatting
      if (guess > this.number) {
        formatting = {text: 'WRONG, that guess was too BIG', styling: 'tooBig'};
      } else if (guess < this.number) {
        formatting = {text: 'WRONG, that guess was too small', styling: 'tooSmall'};
      } else {
        formatting = {text: 'Congratulations! You got it right!', styling: 'justRight'};

        this.end(); // end the game since the answer was correct
      }
    } 

    if (this.guesses.length == 10) {
      this.end(); // end the game since too many attempts

      formatting = {text: '!!! Too many attempts, GAME OVER !!!', styling: 'tooMany'};
    }

    // apply formatting
    this.getElement('result-text').innerHTML = formatting.text;
    this.getElement('result').className = formatting.styling;
  }

  end() {
    this.getElement('input').disabled = true; // ends the game 

    /*
     * The following code creates a button
     * and appends it to the body 
     * it also registers an event listener so the game can be restarted
    */
    const button = document.createElement('button');

    this.gameElement.appendChild(button);

    button.id = 'restart_button';
    button.innerHTML = 'Start new game';
    button.addEventListener('click', this.restart);
    
    button.focus(); // focus the button

    // append the button so it can be reset on restart
    this.elements.push(new Element(this.gameElement.id, 'restart_button', (element) => {
      element.parentNode.removeChild(element);
      element.removeEventListener('click', this.restart);
    }));
  }

  restart() {
    this.cleanup(); // call the base cleanup method

    removeGame(this); // remove the game
    addGame(new RandomNumberGame()); // add the new one
  }
}
