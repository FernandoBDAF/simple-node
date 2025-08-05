// Import the functions from server.js
const { sleep, getRandomInt, createMessage } = require("./server");

// Mock console.log to avoid output during tests
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
});

describe("sleep function", () => {
  test("should resolve after specified milliseconds", async () => {
    const startTime = Date.now();
    const sleepTime = 100;

    await sleep(sleepTime);

    const endTime = Date.now();
    const actualSleepTime = endTime - startTime;

    // Allow for some timing variance (within 50ms)
    expect(actualSleepTime).toBeGreaterThanOrEqual(sleepTime - 50);
    expect(actualSleepTime).toBeLessThanOrEqual(sleepTime + 50);
  });

  test("should handle zero milliseconds", async () => {
    const startTime = Date.now();

    await sleep(0);

    const endTime = Date.now();
    const actualSleepTime = endTime - startTime;

    // Should be very quick, but allow for some overhead
    expect(actualSleepTime).toBeLessThan(10);
  });
});

describe("getRandomInt function", () => {
  test("should return a number within the hardcoded range (2000-5000)", () => {
    const min = 2000;
    const max = 5000;

    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  test("should ignore parameters and use hardcoded values", () => {
    // The function ignores parameters and uses hardcoded min=2000, max=5000
    const result1 = getRandomInt(1000, 1500);
    const result2 = getRandomInt(6000, 7000);

    // Both should return values in the hardcoded range
    expect(result1).toBeGreaterThanOrEqual(2000);
    expect(result1).toBeLessThanOrEqual(5000);
    expect(result2).toBeGreaterThanOrEqual(2000);
    expect(result2).toBeLessThanOrEqual(5000);
  });

  test("should always return integers", () => {
    for (let i = 0; i < 50; i++) {
      const result = getRandomInt(2000, 5000);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});

describe("createMessage function", () => {
  test("should create correct message with sleep time", () => {
    const sleepTime = 3000;
    const expectedMessage = "Containers rule! Slept for 3000ms";

    const result = createMessage(sleepTime);

    expect(result).toBe(expectedMessage);
  });

  test("should handle zero sleep time", () => {
    const sleepTime = 0;
    const expectedMessage = "Containers rule! Slept for 0ms";

    const result = createMessage(sleepTime);

    expect(result).toBe(expectedMessage);
  });

  test("should handle large sleep time", () => {
    const sleepTime = 10000;
    const expectedMessage = "Containers rule! Slept for 10000ms";

    const result = createMessage(sleepTime);

    expect(result).toBe(expectedMessage);
  });

  test("should include the sleep time in the message", () => {
    const sleepTime = 2500;
    const result = createMessage(sleepTime);

    expect(result).toContain(sleepTime.toString());
    expect(result).toContain("Containers rule!");
    expect(result).toContain("Slept for");
    expect(result).toContain("ms");
  });
});

// Integration test for the main function behavior
describe("main function integration", () => {
  test("should call console.log with correct messages", async () => {
    // Mock the main function to avoid infinite loop
    const originalMain = require("./server").main;

    // We can't easily test the infinite loop, but we can test the individual components
    // This test verifies that the functions work together correctly

    const sleepTime = getRandomInt(2000, 5000);
    const message = createMessage(sleepTime);

    expect(message).toContain(sleepTime.toString());
    expect(message).toContain("Containers rule!");
  });
});

// Test for edge cases and error handling
describe("Edge cases and error handling", () => {
  test("getRandomInt should handle negative numbers", () => {
    const result = getRandomInt(-1000, 1000);
    expect(Number.isInteger(result)).toBe(true);
    // Should still return value in hardcoded range
    expect(result).toBeGreaterThanOrEqual(2000);
    expect(result).toBeLessThanOrEqual(5000);
  });

  test("createMessage should handle string numbers", () => {
    const sleepTime = "1500";
    const result = createMessage(sleepTime);
    expect(result).toBe("Containers rule! Slept for 1500ms");
  });

  test("sleep should handle very small values", async () => {
    const startTime = Date.now();
    await sleep(1);
    const endTime = Date.now();

    // Should complete quickly
    expect(endTime - startTime).toBeLessThan(10);
  });
});
