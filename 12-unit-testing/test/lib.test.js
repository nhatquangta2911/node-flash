const lib = require("../lib");

describe("absolute", () => {
   //TODO: A TEST CASE
   it("Should return a positive number if input is positive", () => {
      const result = lib.absolute(1);
      expect(result).toBe(1);
   });

   it("Should return a positive number if input is negative", () => {
      const result = lib.absolute(-1);
      expect(result).toBe(1);
   });

   it("Should return a positive number if input is negative", () => {
      const result = lib.absolute(0);
      expect(result).toBe(0);
   });
});

describe("floating", () => {
   it("Should return a close number to the actual result", () => {
      const result = lib.floating(2.9, 1.1);
      expect(result).toBeCloseTo(4);
   });
});

describe('greet', () => {
   it("Should return the greeting message with the given name", () => {
      const result = lib.greet('Shawn');
      //TODO: Too specific
      expect(result).toBe('Welcome Shawn to my website!');
      //TODO: 2 ways 
      expect(result).toMatch(/Shawn/);
      expect(result).toContain('Shawn');
   });
});