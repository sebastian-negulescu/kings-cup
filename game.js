let deck = new Array(52);
let ind = 0;
for (let i = 0; i < 13; ++i) {
    for (let j = 0; j < 4; ++j) {
        deck[ind] = i + 1;
        ++ind;
    }
}
let playerList = [];
let turn = 0;

const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
};

export function init(players) {
    console.log(players);
    console.log(deck);
    playerList = players;
    // shuffle the deck
    shuffle(deck);
    console.log(deck);
}