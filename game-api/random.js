module.exports = function() {
	return {
		randomInt: (min, max) => Math.floor(Math.random() * (max - min) + min),
	};
};
