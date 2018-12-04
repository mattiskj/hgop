module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21.
        card: undefined,
    };
    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            // TODO
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            // TODO
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            let hand = game.state.cards;
            hand.sort();
            hand.reverse();
            let value = 0;
            for(let i = 0; i < hand.length; i++) {
                var integer = parseInt(hand[i], 10);
                if(integer === 11 || integer === 12 || integer === 13){
                    integer = 10;
                }
                if(integer === 1){
                    if((value + 11) > 21){
                        integer = 1;
                    }
                    else{
                        integer = 11;
                    }
                }
                value += integer;
            }
            return value;
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            let cardValue = game.state.card;
            cardValue = parseInt(cardValue, 10);
            console.log(cardValue);
            if(cardValue === 11 || cardValue === 12 || cardValue === 13){
                cardValue = 10;
            }
            return cardValue;
        },
        getTotal: (game) => {
            // TODO
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return game.state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            // TODO
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
        },
    };
};