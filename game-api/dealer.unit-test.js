const dealerConstructor = require('./dealer.js');

test('dealer should should draw 2 cards', () => {
  // Arrange
  const deck = ['a', 'b', 'c'];
  const dealer = dealerConstructor();
  // Act
  dealer.draw(deck);
  dealer.draw(deck);
  // Assert
  expect(deck.length).toEqual(1);
});
