import { getLevel } from './levels.js';

export function createGame(levelId, motifIds) {
  const level = getLevel(levelId);
  const chosen = motifIds.slice(0, level.pairs);
  const reshufflesRemaining = level.reshuffleEvery
    ? Math.floor(level.pairs / level.reshuffleEvery) - 1
    : 0;
  const cards = [];
  chosen.forEach((motif, pairIndex) => {
    cards.push(mkCard(motif, pairIndex, 0));
    cards.push(mkCard(motif, pairIndex, 1));
  });
  shuffleInPlace(cards);
  cards.forEach((c, i) => { c.position = i; c.id = `c${i}`; });
  return {
    level, motifSet: null,
    cards, moves: 0, matchedPairs: 0, startedAt: Date.now(), endedAt: null,
    picks: [], lockInput: false, reshufflesRemaining, status: 'playing'
  };
}

function mkCard(motif, pairIndex, copy) {
  return { id: '', motif, pairIndex, copy, faceUp: false, matched: false, position: -1 };
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function flipCard(game, cardId) {
  if (game.lockInput) return { game, event: 'locked' };
  const card = game.cards.find(c => c.id === cardId);
  if (!card || card.faceUp || card.matched) return { game, event: 'flip' };

  const cards = game.cards.map(c => c.id === cardId ? { ...c, faceUp: true } : c);
  const picks = [...game.picks, cardId];

  if (picks.length === 1) {
    return { game: { ...game, cards, picks }, event: 'flip' };
  }

  // second pick
  const [firstId, secondId] = picks;
  const a = cards.find(c => c.id === firstId);
  const b = cards.find(c => c.id === secondId);
  const moves = game.moves + 1;

  if (a.motif === b.motif) {
    const matched2 = cards.map(c => c.id === firstId || c.id === secondId ? { ...c, matched: true } : c);
    const matchedPairs = game.matchedPairs + 1;
    const won = matchedPairs === game.level.pairs;
    return {
      game: {
        ...game, cards: matched2, moves, matchedPairs, picks: [],
        status: won ? 'won' : 'playing',
        endedAt: won ? Date.now() : null
      },
      event: won ? 'win' : 'match'
    };
  }

  return {
    game: { ...game, cards, moves, picks, lockInput: true },
    event: 'nomatch'
  };
}

export function resolveNoMatch(game) {
  const cards = game.cards.map(c => c.matched ? c : { ...c, faceUp: false });
  return { ...game, cards, picks: [], lockInput: false };
}

export function computeStars(moves, pairs) {
  if (moves <= pairs * 1.6) return 3;
  if (moves <= pairs * 2.2) return 2;
  return 1;
}

export function maybeReshuffle(game) {
  const every = game.level.reshuffleEvery;
  if (!every) return { game, reshuffled: false };
  if (game.status === 'won') return { game, reshuffled: false };
  if (game.reshufflesRemaining <= 0) return { game, reshuffled: false };
  if (game.matchedPairs === 0 || game.matchedPairs % every !== 0) return { game, reshuffled: false };

  const unmatched = game.cards.filter(c => !c.matched && !c.faceUp);
  const positions = unmatched.map(c => c.position);
  shuffleInPlace(positions);
  const posBy = new Map(unmatched.map((c, i) => [c.id, positions[i]]));
  const cards = game.cards.map(c => posBy.has(c.id) ? { ...c, position: posBy.get(c.id) } : c);
  return { game: { ...game, cards, reshufflesRemaining: game.reshufflesRemaining - 1 }, reshuffled: true };
}

const MILESTONES = new Set([10, 25, 50, 100]);

export function isMilestone(serial) { return MILESTONES.has(serial); }

export function categoryFor(stars) {
  return stars === 3 ? 'premium' : stars === 2 ? 'choice' : 'standard';
}

export function issueVoucher({ serial, levelId, stars }) {
  const level = getLevel(levelId);
  return {
    id: `v_${Date.now()}_${serial}`,
    serial,
    issuedAt: new Date().toISOString(),
    level: level.id,
    levelName: level.name,
    stars,
    category: categoryFor(stars),
    isMilestone: isMilestone(serial),
    state: 'open',
    redeemedAt: null,
    note: null
  };
}
