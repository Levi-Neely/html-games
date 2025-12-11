/* Why do I need a game manager?
 * - separation of concerns 
 * - Avoids circular dependency loops
*/

// define an empty array
let games = [];

// simple add method 
export function addGame(game) {
  games.push(game);
}

// simple remove method 
export function removeGame(game) {
  const index = games.indexOf(game);

  if (index !== -1) {
    games.splice(index, 1); 
  } 
}

// get game from index 
export function getGame(index) {
  return games[index];
}

// getter for games array
export function getGames() {
  return games;
}
