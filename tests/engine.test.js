import { describe, it, expect } from 'vitest';
import { createGame, flipCard, resolveNoMatch, computeStars, maybeReshuffle } from '../src/game/engine.js';

const motifs = Array.from({ length: 18 }, (_, i) => `m${i}`);

function idsOf(game) {
  return game.cards.map(c => c.id);
}

describe('createGame', () => {
  it('creates 2*pairs cards each with a position', () => {
    const g = createGame(1, motifs);
    expect(g.cards).toHaveLength(12);
    expect(g.cards.map(c => c.position).sort((a,b)=>a-b)).toEqual([0,1,2,3,4,5,6,7,8,9,10,11]);
  });
  it('every motif appears exactly twice', () => {
    const g = createGame(2, motifs);
    const counts = {};
    for (const c of g.cards) counts[c.motif] = (counts[c.motif]||0) + 1;
    expect(Object.values(counts).every(n => n === 2)).toBe(true);
  });
  it('starts with 0 moves and status playing', () => {
    const g = createGame(1, motifs);
    expect(g.moves).toBe(0);
    expect(g.status).toBe('playing');
  });
});

describe('flipCard transitions', () => {
  it('first pick just flips, event flip', () => {
    const g0 = createGame(1, motifs);
    const { game, event } = flipCard(g0, idsOf(g0)[0]);
    expect(event).toBe('flip');
    expect(game.picks).toHaveLength(1);
    expect(game.moves).toBe(0);
  });
  it('rejects flips while locked', () => {
    let g = createGame(1, motifs);
    g.lockInput = true;
    const { game, event } = flipCard(g, idsOf(g)[0]);
    expect(event).toBe('locked');
    expect(game).toBe(g);
  });
  it('second pick with same motif → match, moves++', () => {
    const g0 = createGame(1, motifs);
    const [a, b] = samePair(g0);
    let { game } = flipCard(g0, a);
    const res = flipCard(game, b);
    expect(res.event).toBe('match');
    expect(res.game.moves).toBe(1);
    expect(res.game.picks).toHaveLength(0);
    expect(res.game.matchedPairs).toBe(1);
  });
  it('second pick different motif → nomatch, locked', () => {
    const g0 = createGame(1, motifs);
    const [a, b] = diffPair(g0);
    let { game } = flipCard(g0, a);
    const res = flipCard(game, b);
    expect(res.event).toBe('nomatch');
    expect(res.game.lockInput).toBe(true);
    expect(res.game.moves).toBe(1);
    expect(res.game.picks).toHaveLength(2);
  });
  it('win when last pair matched', () => {
    let g = createGame(1, motifs);
    const pairs = groupPairs(g);
    for (let i = 0; i < pairs.length - 1; i++) {
      const [a,b] = pairs[i];
      let r = flipCard(g, a); g = r.game;
      r = flipCard(g, b); g = r.game;
    }
    const [a,b] = pairs[pairs.length-1];
    const r = flipCard(g, a);
    const fin = flipCard(r.game, b);
    expect(fin.event).toBe('win');
    expect(fin.game.status).toBe('won');
    expect(fin.game.matchedPairs).toBe(6);
  });
});

describe('resolveNoMatch', () => {
  it('clears picks and unlocks', () => {
    let g = createGame(1, motifs);
    const [a,b] = diffPair(g);
    g = flipCard(g, a).game;
    g = flipCard(g, b).game;
    const r = resolveNoMatch(g);
    expect(r.picks).toHaveLength(0);
    expect(r.lockInput).toBe(false);
    expect(r.cards.every(c => !c.faceUp || c.matched)).toBe(true);
  });
});

describe('computeStars', () => {
  it('3 stars at moves <= pairs*1.6', () => {
    expect(computeStars(9, 6)).toBe(3);   // 6*1.6=9.6
  });
  it('2 stars at moves <= pairs*2.2', () => {
    expect(computeStars(13, 6)).toBe(2);  // 6*2.2=13.2
  });
  it('1 star above', () => {
    expect(computeStars(14, 6)).toBe(1);
  });
});

describe('maybeReshuffle (Va banque)', () => {
  it('level 5 starts with 2 reshuffles remaining', () => {
    const g = createGame(5, Array.from({length:18},(_,i)=>`m${i}`));
    expect(g.reshufflesRemaining).toBe(2);
  });
  it('non-5 levels never reshuffle', () => {
    const g = createGame(3, Array.from({length:18},(_,i)=>`m${i}`));
    g.matchedPairs = 6;
    const r = maybeReshuffle(g);
    expect(r.reshuffled).toBe(false);
  });
  it('reshuffles when matchedPairs is multiple of 6 and remaining>0', () => {
    const g = createGame(5, Array.from({length:18},(_,i)=>`m${i}`));
    g.matchedPairs = 6;
    const before = new Map(g.cards.filter(c => !c.matched && !c.faceUp).map(c => [c.id, c.position]));
    const r = maybeReshuffle(g);
    expect(r.reshuffled).toBe(true);
    expect(r.game.reshufflesRemaining).toBe(1);
    // at least one face-down card's position changed (a real permutation, not identity)
    const after = new Map(r.game.cards.filter(c => !c.matched && !c.faceUp).map(c => [c.id, c.position]));
    const changed = [...before.keys()].filter(id => before.get(id) !== after.get(id));
    // reshuffle is random and *could* be identity (astronomically unlikely with 30 cards),
    // so assert the count of face-down cards is preserved AND at least one moved.
    expect(after.size).toBe(before.size);
    expect(changed.length).toBeGreaterThan(0);
  });
  it('does NOT reshuffle at 3, 9', () => {
    const g = createGame(5, Array.from({length:18},(_,i)=>`m${i}`));
    for (const mp of [3, 9]) {
      g.matchedPairs = mp; g.reshufflesRemaining = 2;
      expect(maybeReshuffle(g).reshuffled).toBe(false);
    }
  });
  it('matched cards keep their positions', () => {
    const g = createGame(5, Array.from({length:18},(_,i)=>`m${i}`));
    g.cards[0].matched = g.cards[1].matched = true;
    g.matchedPairs = 6;
    const matchedBefore = g.cards.filter(c => c.matched).map(c => [c.id, c.position]);
    const r = maybeReshuffle(g);
    const byId = new Map(r.game.cards.map(c => [c.id, c]));
    // every matched card's position must be unchanged by the reshuffle
    expect(matchedBefore.every(([id, pos]) => byId.get(id).position === pos)).toBe(true);
  });
  it('no reshuffle when game won', () => {
    const g = createGame(5, Array.from({length:18},(_,i)=>`m${i}`));
    g.matchedPairs = 18; g.status = 'won';
    expect(maybeReshuffle(g).reshuffled).toBe(false);
  });
});

// helpers
function groupPairs(game) {
  const byMotif = {};
  for (const c of game.cards) (byMotif[c.motif] ||= []).push(c.id);
  return Object.values(byMotif);
}
function samePair(game) { return groupPairs(game)[0]; }
function diffPair(game) {
  const p = groupPairs(game);
  return [p[0][0], p[1][0]];
}
