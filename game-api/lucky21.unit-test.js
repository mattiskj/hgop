const lucky21Constructor = require('./lucky21.js');
const dependencies = {
  'deck': () => [
    '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', // Hearts
    '01C', '02C', '03C', '04C', '05C', '06C', '07C', '08C', '09C', '10C', '11C', '12C', '13C', // Clubs
    '01D', '02D', '03D', '04D', '05D', '06D', '07D', '08D', '09D', '10D', '11D', '12D', '13D', // Diamonds
    '01S', '02S', '03S', '04S', '05S', '06S', '07S', '08S', '09S', '10S', '11S', '12S', '13S', // Spades
  ],
  'dealer': () => {
    return {
      'shuffle': () => {},
      'draw': (deck) => {
        return deck.pop();
      },
    };
  },

};
const getDependencies = (name) => {
  return dependencies[name];
};
test('a new game should have 50 cards left in the deck', () => {
  const game = lucky21Constructor((name) => {
    return dependencies[name];
  });
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  const game = lucky21Constructor((name) => {
    return dependencies[name];
  });
  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  dependencies.deck = () => [
    '05C', '01D', '09S', '10H',
  ];

  // Inject our dependencies
  const game = lucky21Constructor(getDependencies);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  dependencies.deck = () =>[
    '05C', '01D', '04S', '10H',
  ];

  // Inject our dependencies
  const game = lucky21Constructor(getDependencies);

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);


  // Assert
  expect(game.state.cards.length).toEqual(4);
  expect(game.state.cards[3]).toEqual('05C');
});

// Test for getCards
test('Get the player cards should return array of strings', () => {
  dependencies.deck = () => [
    '03C', '02C', '04C',
  ];
  const game = lucky21Constructor(getDependencies);

  game.state.cards = game.state.deck;

  expect(game.getCards(game)).toEqual(game.state.deck);
});

test('Get the player cards should return array of strings', () => {
  dependencies.deck = () => [
    '06C', '09C', '04C', '01C',
  ];
  const game = lucky21Constructor(getDependencies);

  game.guess21OrUnder(game);

  expect(game.getCard(game)).toEqual(undefined);
});

// test for getCard
test('Get the players card (string or undefined)', () => {
  dependencies.deck = () => [
    '03C', '02C', '04C',
  ];
  const game = lucky21Constructor(getDependencies);

  game.guess21OrUnder(game);


  expect(game.getCard(game)).toEqual(game.state.card);
});

test('Get the players card (string or undefined)', () => {
  dependencies.deck = () =>[
    '05C', '01C', '010C',
  ];
  const game = lucky21Constructor(getDependencies);

  game.state.card = dependencies.dealer().draw(dependencies.deck());


  expect(game.getCard(game)).toEqual(game.state.card);
});

// test for get cardsValue
test('return the sum of cards in deck', () => {
  dependencies.deck = () => [];
  const game = lucky21Constructor(getDependencies);

  game.state.cards = ['03C', '02C', '04C'];
  expect(game.getCardsValue(game)).toEqual(9);
});
test('return the sum of cards in deck', () => {
  deck = [];
  const game = lucky21Constructor(getDependencies);

  game.state.cards = ['05C', '09C', '02C'];
  expect(game.getCardsValue(game)).toEqual(16);
});


// test for getCardValue
test('returns the value of card in deck', () => {
  dependencies.deck = () =>[
    '01H',
  ];
  const game = lucky21Constructor(getDependencies);
  game.state.card = '13C';
  expect(game.getCardValue(game)).toEqual(10);
});
test('returns the value of card in deck', () => {
  dependencies.deck = () => [];
  const game = lucky21Constructor(getDependencies);

  game.state.card = '01H';

  expect(game.getCardValue(game)).toEqual(11);
});
test('returns the value of card in deck', () => {
  dependencies.deck = () =>[
    '01H',
  ];

  const game = lucky21Constructor(getDependencies);

  game.state.card = undefined;

  expect(game.getCardValue(game)).toEqual(undefined);
});

// Test for getTotal
test('returns the sum of cards on hand and the next card in', () => {
  dependencies.deck = () =>[];
  const game = lucky21Constructor(getDependencies);
  game.state.cards = ['13C', '01H', '04C'];
  game.state.card = '03C';

  expect(game.getTotal(game)).toEqual(18);
});
test('returns the sum of cards on hand and the next card in', () => {
  dependencies.deck = () =>[];

  const game = lucky21Constructor(getDependencies);
  game.state.cards = ['13C', '01H', '04C'];
  game.state.card = '03C';

  expect(game.getTotal(game)).toEqual(18);
});

// test for Guess over 21
test('Guess over 21 function', () => {
  dependencies.deck = () =>[
    '13C', '01H', '04C', '03C', '02C', '05C',
  ];
  const game = lucky21Constructor(getDependencies);

  game.state.cards = ['13C', '01H', '04C', '03C', '02C'];
  game.state.card = '05C';
  game.guessOver21(game);

  expect(game.state.cards.length).toEqual(5);
});
test('Guess over 21 function', () => {
  dependencies.deck = () =>[
    '13C', '12H', '05C',
  ];
  const game = lucky21Constructor(getDependencies);

  game.state.cards = ['13C', '12H'];
  game.state.card = '05C';
  game.guessOver21(game);

  expect(game.state.cards.length).toEqual(2);
});

// test is game over
test('check if the game is over', () => {
  const game = lucky21Constructor(getDependencies);
  game.state.deck = ['03H'];
  game.state.cards = ['04C', '03C', '02C', '13C'];
  expect(game.isGameOver(game)).toEqual(false);
  game.guess21OrUnder(game);

  expect(game.isGameOver(game)).toEqual(true);
});
test('check if the game is over', () => {
  const game = lucky21Constructor(getDependencies);
  game.state.deck = ['03H'];
  game.state.cards = ['12C', '09C'];

  expect(game.isGameOver(game)).toEqual(false);
  game.guessOver21(game);
  expect(game.isGameOver(game)).toEqual(true);
});

// test if player has won
test('check if player has won', () => {
  const game = lucky21Constructor(getDependencies);
  game.state.deck = ['04A'];
  game.state.cards = ['04C', '04H', '13C'];
  game.guessOver21(game);

  expect(game.playerWon(game)).toEqual(true);
});
test('check if player has won', () => {
  const game = lucky21Constructor(getDependencies);
  game.state.deck = ['04H'];
  game.state.cards = ['04C', '04H'];
  game.guessOver21(game);

  expect(game.playerWon(game)).toEqual(false);
});
