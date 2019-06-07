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
      //TODO: Float is not accurate
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

describe('getColors', () => {
   it('should return valid colors in system', () => {
      const result = lib.getColors();
      //TODO: Too General
      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      //TODO: Too Specific
      expect(result[0]).toBe('GREEN');
      expect(result[1]).toBe('CYAN');
      expect(result[2]).toBe('ORANGE');
      expect(result[3]).toBe('RED');
      expect(result.length).toBe(4);
      //TODO: Proper way
      expect(result).toContain('CYAN');
      expect(result).toContain('ORANGE');
      expect(result).toContain('RED');
      expect(result).toContain('GREEN');
      //TODO: Ideal way
      expect(result).toEqual(expect.arrayContaining([
         'GREEN', 'ORANGE', 'RED', 'CYAN'
      ]))

   });
});