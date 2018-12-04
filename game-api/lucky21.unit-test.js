const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  let game = lucky21Constructor();
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  let game = lucky21Constructor();
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

//test for get cardsValue
test('return the sum of cards in deck', () => {
    let deck = deckConstructor();
    deck = [
        '03C', '02C', '04C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = game.state.deck;

    expect(game.getCardsValue(game)).toEqual(9);
});

//test for getCardValue
test('returns the value of card in deck', () => {
    let deck = deckConstructor();
    deck = [
        '13C', '01H'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    game.state.cards = game.state.deck[0];

    expect(game.getCardValue(game)).toEqual(10);
});

//Test for getTotal
test('returns the sum of cards on hand and the next card in', () => {
    let deck = deckConstructor();
    deck = [
        '13C', '01H', '04C', '03C'
    ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);
    game.state.cards = ['13C', '01H', '04C'];
    game.state.card = '03C';

    expect(game.getTotal(game)).toEqual(18);
});

//test for Guess over 21
test('Guess oveer 21 function', () => {
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