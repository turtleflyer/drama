/* eslint-env jest */
import mugTypesGenerator from '../mugTypesGenerator';
import stage from '../../../../../../stage/stage';

jest.mock('../../../../../../stage/stage');
const nAttempts = 10000;

describe('Distribution is close to expected', () => {
  function testDist(projectDist) {
    const gen = mugTypesGenerator();
    stage.params = { levelParams: { mugsDistribution: projectDist } };
    const dist = {};

    for (const type in projectDist) {
      if (Object.prototype.hasOwnProperty.call(projectDist, type)) {
        dist[type] = 0;
      }
    }

    for (let i = 0; i < nAttempts; i++) {
      dist[gen.next().value]++;
    }

    let satisfy = true;

    for (const type in dist) {
      if (Object.prototype.hasOwnProperty.call(dist, type)) {
        const v = dist[type] / nAttempts;
        const d = projectDist[type];
        satisfy = satisfy && v < d + 0.05 && v > d - 0.05;
      }
    }

    return satisfy;
  }

  test('One type', () => {
    expect(testDist({ 1: 1 })).toBeTruthy();
  });

  test('Two types, equal occurrence', () => {
    expect(testDist({ 1: 0.5, 2: 0.5 })).toBeTruthy();
  });

  test('Two types, unequal occurrence', () => {
    expect(testDist({ 1: 0.1, 2: 0.9 })).toBeTruthy();
  });

  test('Three types, equal occurrence', () => {
    expect(testDist({ 1: 0.333, 2: 0.333, 3: 0.334 })).toBeTruthy();
  });

  test('Three types, unequal occurrence', () => {
    expect(testDist({ 1: 0.3, 2: 0.5, 3: 0.2 })).toBeTruthy();
  });
});

describe('Inspection of anomalies in distribution', () => {
  let gen = mugTypesGenerator();
  stage.params = {
    levelParams: {
      mugsDistribution: {
        1: 0.25,
        2: 0.3,
        3: 0.4,
        4: 0.05,
      },
    },
  };
  let seq = [];

  for (let i = 0; i < nAttempts; i++) {
    seq.push(gen.next().value);
  }

  let after5m = true;
  let after2e = true;
  let after4m = true;
  for (let i = 0; i < seq.length - 5; i++) {
    const subseq = seq.slice(i, i + 6);
    let type1missed = true;
    let type2 = 0;
    let type3 = 0;
    for (let j = 0; j < 5; j++) {
      switch (subseq[j]) {
        case '1':
          type1missed = false;
          break;

        case '2':
          type2++;
          break;

        case '3':
          type3++;

          break;

        default:
          break;
      }
    }
    after5m = after5m && ((type1missed && subseq[5] === '1') || !type1missed);
    after2e = after2e && type2 < 3;
    after4m = after4m && ((type3 < 2 && subseq[5] === '3') || type3 > 1);
  }
  test('after 5 missing in sequence probability is 1', () => {
    expect(after5m).toBeTruthy();
  });

  test('after existence of 2 instances probability is 0', () => {
    expect(after2e).toBeTruthy();
  });

  test('after 4 missing in sequence probability is 1', () => {
    expect(after4m).toBeTruthy();
  });

  gen = mugTypesGenerator();
  stage.params = {
    levelParams: {
      mugsDistribution: {
        1: 0.425,
        2: 0.575,
      },
    },
  };
  seq = [];

  for (let i = 0; i < nAttempts; i++) {
    seq.push(gen.next().value);
  }

  const after3m = [];
  for (let i = 0; i < seq.length - 5; i++) {
    if (seq.slice(i, i + 5).filter(t => t === '1').length === 2) {
      after3m.push(seq[i + 5]);
    }
  }

  test('after 3 missing in sequence probability is 0.5', () => {
    const distr = after3m.filter(t => t === '1').length / after3m.length;
    expect(distr).toBeGreaterThan(0.45);
    expect(distr).toBeLessThan(0.55);
  });
});
