import { describe, it, expect } from 'vitest';
import { LEVELS, getLevel } from '../src/game/levels.js';

describe('levels', () => {
  it('has exactly 5 levels', () => {
    expect(LEVELS).toHaveLength(5);
  });
  it.each(LEVELS.map(l => [l.id, l]))('level %i: cols*rows == 2*pairs', (_id, l) => {
    expect(l.cols * l.rows).toBe(2 * l.pairs);
  });
  it('level 1 has flipBackMs 1200', () => {
    expect(getLevel(1).flipBackMs).toBe(1200);
  });
  it('level 5 has reshuffleEvery 6', () => {
    expect(getLevel(5).reshuffleEvery).toBe(6);
  });
  it('throws on unknown level id', () => {
    expect(() => getLevel(99)).toThrow();
  });
});
