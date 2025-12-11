import Game from './game.js';
import Element from './element.js';

export default class CoinToss extends Game {
  constructor() {
    // we don't need any cleanup methods since the game doesn't end 
    // but we can easily add them if needed
    
    super('coin-toss', [
      // buttons
      new Element('coin-toss', 'heads', null),
      new Element('coin-toss', 'tails', null),

      // feedback 
      new Element('coin-toss', 'coin', null),
      new Element('coin-toss', 'choice', null),
      new Element('coin-toss', 'toss', null),
      new Element('coin-toss', 'result', null),
      new Element('coin-toss', 'score', null),
    ]);

    // initiate wins & losses
    this.wins = 0;
    this.losses = 0;
    
    // bind the click event 
    this.onClick = this.onClick.bind(this);

    // hook some events 
    this.getElement('heads').addEventListener('click', this.onClick)
    this.getElement('tails').addEventListener('click', this.onClick)
  }

  getRandomToss() {
    if (Math.random() >= 0.5) {
      return 'heads';
    } else {
      return 'tails';
    }
  }

  // simple method to change elements and make a toss
  makeToss(guess) {
    const toss = this.getRandomToss(); // make a toss (heads/tails)

    this.getElement('coin').src = `assets/${toss}.jpg`;
    this.getElement('choice').innerHTML = `You chose ${guess}`;
    this.getElement('toss').innerHTML = `The toss is ${toss}`;

    if (toss == guess) {
      this.getElement('result').innerHTML = 'You chose wisely!';
      this.wins++;
    } else {
      this.getElement('result').innerHTML = 'Sorry, wrong choice.'
      this.losses++;
    }

    this.getElement('score').innerHTML = `Wins = ${this.wins} &nbsp;&nbsp; Losses = ${this.losses}`
  }

  onClick(event) {
    const guess = event.target.id;

    this.makeToss(guess);
  } 
}
