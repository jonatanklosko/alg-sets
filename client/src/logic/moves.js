const MOVES_REGEXP = /([RLUDFB]w?|[rludfbMSExyz])2?'?/g;

export const stringToMoves = string =>
  (string && string.replace(/\s+/g, '').match(MOVES_REGEXP)) || [];

export const shrink = string =>
  stringToMoves(string).join('');

export const prettify = string =>
  stringToMoves(string).join(' ');
