// import both game objects
import CoinTossGame from './Game/CoinTossGame.js'; 
import RandomNumberGame from './Game/RandomNumberGame.js';

// import methods from game manager
import { getGame, getGames, addGame } from './Game/GameManager.js';

// create and add two new games
addGame(new CoinTossGame());
addGame(new RandomNumberGame());

// get game options
const options = document.querySelectorAll('.game-option');


function changeTab(tabIndex) {
  // iterate through all games 
  for (let index = 0; index < getGames().length; index++) {
    const game = getGame(index); // game from index 
    const option = options[index]; // option from index

    // hide both game and option
    game.hide(); 
    option.classList.remove('active');
  }

  // show the correct tab and game  
  getGame(tabIndex).show();
  options[tabIndex].classList.add('active');
}

// hook all game options
for (let index = 0; index<getGames().length; index++) {
  options[index].addEventListener('click', (event) => {
    changeTab(index);
  })
}
