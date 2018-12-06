const randomConstructor = require('./random.js');

test('Should return exacly 100', () =>{
  const max = 100;
  const min = 100;
  const random = randomConstructor();
  expect(random.randomInt(min, max)).toEqual(100);
});
test('Should return a number between 0 and 11', () =>{
  const max = 10;
  const min = 1;
  const random = randomConstructor();
  expect(random.randomInt(min, max)).toBeLessThan(11);
  expect(random.randomInt(min, max)).toBeGreaterThan(0);
});
test('should retun undefinesd', () =>{
  const max = 1;
  const min = 10;
  const random = randomConstructor();
  expect(random.randomInt(min, max)).toBeLessThan(11);
  expect(random.randomInt(min, max)).toBeGreaterThan(0);
});
