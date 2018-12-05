const dealerConstructor = require('./dealer.js');

test('dealer should should shuffle cards', () => {
  // Arrange
  const deck = ['a', 'b', 'c'];
  const dealer = dealerConstructor();

  // Act
  dealer.shuffle(deck, () => {
    return 0.99;
  });

  // Assert
  expect(deck).toEqual(['c', 'b', 'a']);
});
