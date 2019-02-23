/* eslint-env jest */
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { calculateFPS } from '../helpers_lib';

expect.extend({ toBeDeepCloseTo });

describe('Testing calculateFPS function', () => {
  test('should be calculated right', () => {
    const testingData = [0, 1, 2, 5, 7, 10, 12, 18, 20, 21, 30, 31, 32, 33, 34, 35];
    const expected = [
      null,
      null,
      null,
      null,
      null,
      { averageFPS: 5000 / 10, minFPS: 5000 / 10 },
      { averageFPS: 5000 / 11, minFPS: 4000 / 10 },
      { averageFPS: 5000 / 16, minFPS: 3000 / 11 },
      { averageFPS: 5000 / 15, minFPS: 3000 / 11 },
      { averageFPS: 5000 / 14, minFPS: 3000 / 11 },
      { averageFPS: 5000 / 20, minFPS: 2000 / 10 },
      { averageFPS: 5000 / 19, minFPS: 2000 / 10 },
      { averageFPS: 5000 / 14, minFPS: 2000 / 10 },
      { averageFPS: 5000 / 13, minFPS: 2000 / 10 },
      { averageFPS: 5000 / 13, minFPS: 2000 / 10 },
      { averageFPS: 5000 / 5, minFPS: null },
    ];
    const fpsGen = calculateFPS(6, 10);
    fpsGen.next();
    const received = [];
    testingData.forEach((t) => {
      received.push(fpsGen.next(t).value);
    });
    expect(received).toBeDeepCloseTo(expected, 3);
  });
});
