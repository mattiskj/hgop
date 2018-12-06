const deckConstructor = require('./deck');

test('Should return 52 becouse there are 52 cards in the deck', () => {
  const deck = deckConstructor();
  expect(deck.length).toEqual(52);
});
