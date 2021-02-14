let deck;
let playerList;
let turn;

const shuffle = array => { // taken from stackoverflow
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

const removeCard = () => {
    turn = (turn + 1) % playerList.length;

    if (deck.length <= 0) {
        return 0;
    }
    return deck.pop();
};

module.exports = {
    init: players => {
        deck = new Array(52);
        let ind = 0;
        for (let i = 0; i < 13; ++i) {
            for (let j = 0; j < 4; ++j) {
                deck[ind] = i + 1;
                ++ind;
            }
        }
        playerList = players;

        console.log(players);
        console.log(deck);

        // shuffle the deck
        shuffle(deck);
        console.log(deck);

        turn = 0;
    },

    draw: player => {
        if (player !== playerList[turn].id) {
            return {cardValue: -1, playerTurn: playerList[turn].name};
        }
        
        return {cardValue: removeCard(), playerTurn: playerList[turn].name};
    }
};
