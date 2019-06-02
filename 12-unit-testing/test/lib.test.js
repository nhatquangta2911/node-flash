const lib = require('../lib');


//TODO: A TEST CASE
test('absolute - should return a positive number if input is positive', () => {
   const result = lib.absolute(1);
   expect(result).toBe(1);
});

test('absolute - should return a positive number if input is negative', () => {
   const result = lib.absolute(-1);
   expect(result).toBe(1);
});

test('absolute - should return a positive number if input is negative', () => {
   const result = lib.absolute(0);
   expect(result).toBe(0);
});

test('floating - Should return a close number to the actual result', () => {
   const result = lib.floating(2.9, 1.1);
   expect(result).toBeCloseTo(4);
})