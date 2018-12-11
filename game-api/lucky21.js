module.exports = (context) => {
	const deckConstructor = context('deck');
	const deck = deckConstructor(context);

	const dealerConstructor = context('dealer');
	const dealer = dealerConstructor(context);

	dealer.shuffle(deck);
	const card0 = dealer.draw(deck);
	const card1 = dealer.draw(deck);
	const state = {
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
			if (game.playerWon(game) === true) {
				return true;
			} else if (game.state.card === undefined && game.getTotal(game) > 21) {
				return true;
			} else if (game.state.card != undefined && game.getTotal(game) <= 21) {
				return true;
			}
			return false;
		},
		// Has the player won (true or false).
		playerWon: (game) => {
			if (game.state.card === undefined && game.getTotal(game) === 21) {
				return true;
			} else if (game.state.card != undefined && game.getTotal(game) > 21) {
				return true;
			} else {
				return false;
			}
		},
		// The highest score the cards can yield without going over 21 (integer).
		getCardsValue: (game) => {
			let cardsValue = 0;
	  
			// count everything and treat all aces as 1.
			for (let i = 0; i < game.state.cards.length; i++) {
			  const cardValue = parseInt(game.state.cards[i].substring(0, 2));
			  cardsValue += Math.min(cardValue, 10);
			}
	  
			// foreach ace check if we can add 10.
			for (let i = 0; i < game.state.cards.length; i++) {
			  const cardValue = parseInt(game.state.cards[i].substring(0, 2));
			  if (cardValue == 1) {
				if (cardsValue + 10 <= 21) {
				  cardsValue += 10;
				}
			  }
			}
	  
			return cardsValue;
		  },
		// The value of the card that should exceed 21
		// if it exists (integer or undefined).
		getCardValue: (game) => {
			const card = game.state.card;
			if (card === undefined) return card;
	  
			const cardValue = parseInt(card.substring(0, 2));
			return Math.min(cardValue, 10);
		  },
		getTotal: (game) => {
			if (game.getCardValue(game) === undefined) {
				return game.getCardsValue(game);
			}

			return game.getCardsValue(game) + game.getCardValue(game);
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
			const nextCard = dealer.draw(game.state.deck);
			game.state.card = undefined;
			game.state.cards.push(nextCard);
		},
		// Player action (void).
		guessOver21: (game) => {
			const nextCard = dealer.draw(game.state.deck);
			game.state.card = nextCard;
		},
		// Get State
		getState: (game) => {
			return {
				cards: game.getCards(game),
				card: game.getCard(game),
				gameOver: game.isGameOver(game),
				total: game.getTotal(game),
				cardValue: game.getCardValue(game),
				cardsValue: game.getCardsValue(game)

			};
		},
	};
};
