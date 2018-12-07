const dealerConstructor = require('./dealer.js');

function newRandom(randomReturnValues) {
	return {
		randomInt: (min, max) => {
			return randomReturnValues;
		},
	};
}
const newDependencies = () => {
	return {
		'random': newRandom(0),
	};
};
let dependencies = newDependencies();
const context = (name) => {
	return dependencies[name];
};

test('dealer should should draw 2 cards', () => {
	// Arrange
	const deck = ['a', 'b', 'c'];
	const dealer = dealerConstructor(context);
	// Act
	dealer.draw(deck);
	dealer.draw(deck);
	// Assert
	expect(deck.length).toEqual(1);
});
test('after 3 draws the deck should be empty', () => {
	// Arrange
	const deck = ['a', 'b', 'c'];
	const dealer = dealerConstructor(context);
	// Act
	dealer.draw(deck);
	dealer.draw(deck);
	dealer.draw(deck);
	// Assert
	expect(deck).toEqual([]);
});

test('dealer should should shuffle cards', () => {
	// Arrange
	dependencies = newDependencies();
	dependencies.random = newRandom(0);
	let dealer = dealerConstructor(context);
	let deck = ['a', 'b', 'c'];

	// Act
	dealer.shuffle(deck);

	// Assert
	expect(deck).toEqual(['b', 'a', 'c']);
});
