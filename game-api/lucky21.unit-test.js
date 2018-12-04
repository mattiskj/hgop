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

//