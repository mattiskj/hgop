const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
    let dealer = dealerConstructor();
    let deck = deckConstructor();
    let game = lucky21Constructor(deck, dealer);
    expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
    let dealer = dealerConstructor();
    let deck = deckConstructor();
    let game = lucky21Constructor(deck, dealer);
    expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
        '05C', '01D', '09S', '10H',
    ];
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
  });

  test('guess21OrUnder should draw the next card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
        '05C', '01D', '04S', '10H',
    ];
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);


    // Assert
    expect(game.state.cards.length).toEqual(4);
    expect(game.state.cards[3]).toEqual('05C');
  });

//Test for getCards
test('Get the player cards should return array of strings', () => {
    let deck = deckConstructor();
    deck = [
        '03C', '02C', '04C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = game.state.deck;

    expect(game.getCards(game)).toEqual(game.state.deck);

});
test('Get the player cards should return array of strings', () => {
    let deck = deckConstructor();
    deck = [
        '06C', '09C', '04C', '01C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = game.state.deck;

    expect(game.getCards(game)).toEqual(game.state.deck);

});

//test for getCard
test('Get the players card (string or undefined)', () => {
    let deck = deckConstructor();
    deck = [
        '03C', '02C', '04C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.card = dealer.draw(deck);


    expect(game.getCard(game)).toEqual(game.state.card);
});
test('Get the players card (string or undefined)', () => {
    let deck = deckConstructor();
    deck = [
        '05C', '01C', '010C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.card = dealer.draw(deck);


    expect(game.getCard(game)).toEqual(game.state.card);
});

//test for get cardsValue
test('return the sum of cards in deck', () => {
    let deck = deckConstructor();
    deck = [];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = ['03C', '02C', '04C'];
    expect(game.getCardsValue(game)).toEqual(9);
});
test('return the sum of cards in deck', () => {
    let deck = deckConstructor();
    deck = [];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = ['05C', '09C', '02C'];
    expect(game.getCardsValue(game)).toEqual(16);
});


//test for getCardValue
test('returns the value of card in deck', () => {
    let deck = deckConstructor();
    deck = [
        '01H'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.card = '13C';

    expect(game.getCardValue(game)).toEqual(10);
});
test('returns the value of card in deck', () => {
    let deck = deckConstructor();
    deck = [
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.card = '01H';

    expect(game.getCardValue(game)).toEqual(11);
});
test('returns the value of card in deck', () => {
    let deck = deckConstructor();
    deck = [
        '01H'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.card = undefined;

    expect(game.getCardValue(game)).toEqual(undefined);
});

//Test for getTotal
test('returns the sum of cards on hand and the next card in', () => {
    let deck = deckConstructor();
    deck = [];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);
    game.state.cards = ['13C', '01H', '04C'];
    game.state.card = '03C';

    expect(game.getTotal(game)).toEqual(18);
});
test('returns the sum of cards on hand and the next card in', () => {
    let deck = deckConstructor();
    deck = [];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);
    game.state.cards = ['13C', '01H', '04C'];
    game.state.card = '03C';

    expect(game.getTotal(game)).toEqual(18);
});

//test for Guess over 21
test('Guess over 21 function', () => {
    let deck = deckConstructor();
    deck = [
        '13C', '01H', '04C', '03C' , '02C', '05C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = ['13C', '01H', '04C', '03C' , '02C'];
    game.state.card = '05C';
    game.guessOver21(game);

    expect(game.state.cards.length).toEqual(5);
});
test('Guess over 21 function', () => {
    let deck = deckConstructor();
    deck = [
        '13C', '12H', '05C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = ['13C', '12H'];
    game.state.card = '05C';
    game.guessOver21(game);

    expect(game.state.cards.length).toEqual(2);
});

//test is game over
test('check if the game is over', () => {
    let deck = deckConstructor();
    let dealer = dealerConstructor();
    let game = lucky21Constructor(deck, dealer);
    game.state.deck = [ '03H' ];
    
    game.state.cards = ['04C', '03C', '02C', '13C'];
    expect(game.isGameOver(game)).toEqual(false);
    game.guess21OrUnder(game);

    expect(game.isGameOver(game)).toEqual(true);
});
test('check if the game is over', () => {
    let dealer = dealerConstructor();
    let deck = deckConstructor();
    let game = lucky21Constructor(deck, dealer);
    game.state.deck = [ '03H' ];
    game.state.cards = ['12C', '09C'];
    
    expect(game.isGameOver(game)).toEqual(false);
    game.guessOver21(game);
    expect(game.isGameOver(game)).toEqual(true);
});

//test if player has won
test('check if player has won', () => {
    let deck = deckConstructor();
    let dealer = dealerConstructor();
    let game = lucky21Constructor(deck, dealer);
    game.state.deck = [ '04A' ];
    game.state.cards = ['04C', '04H', '13C'];
    game.guessOver21(game);

    expect(game.playerWon(game)).toEqual(true);
});
test('check if player has won', () => {
    let deck = deckConstructor();
    let dealer = dealerConstructor();
    let game = lucky21Constructor(deck, dealer);
    game.state.deck = [ '04H' ];
    game.state.cards = ['04C', '04H'];
    game.guessOver21(game);

    expect(game.playerWon(game)).toEqual(false);
});