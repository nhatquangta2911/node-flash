const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
   it('should throw an exception if input is not a number', () => {
      expect(() => exercise1.fizzBuzz(undefined)).toThrow();
      expect(() => exercise1.fizzBuzz(null)).toThrow();
      expect(() => exercise1.fizzBuzz('a')).toThrow();
      expect(() => exercise1.fizzBuzz(false)).toThrow();
      expect(() => exercise1.fizzBuzz({ number: 10 })).toThrow();
   });
   it('should return FizzBuzz if the input is divisible by 3 and 5', () => {
      const result = exercise1.fizzBuzz(15);
      expect(result).toBe('FizzBuzz');
   });
   it('should return Fizz if the input is divisible by 3', () => {
      const result = exercise1.fizzBuzz(9);
      expect(result).toBe('Fizz');
   });
   it('should return Buzz if the input is divisible by 5', () => {
      const result = exercise1.fizzBuzz(10);
      expect(result).toBe('Buzz');
   });
   it('should return the input itself if the input not divisible by 3 or 5', () => {
      const result = exercise1.fizzBuzz(8);
      expect(result).toBe(8);
   });
});