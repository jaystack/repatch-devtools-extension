import diff = require('deep-diff');
import { Change, Patch, Diff } from '../../types';

/* const diff = {
  name: symbol,
  number: symbol,
  details: {
    with: symbol
  }
} */

const getType = (patch: Patch): string =>
  patch.find(change => change.path.length > 0) ? 'object' : typeof patch[0].rhs;

const getInitialDiffByType = (type: string): Diff => {
  /* switch (type) {
    case 'object': {}
    case 'string': '',
    ...
  } */
};

const okosFüggvény = (diff: Diff, change: Change): Diff => {
  // ez lesz itt a lényeg
};

export default function getDiff(patch: Patch = []): Diff {
  const diffMap = new Map<Symbol, Change>();
  const initialDiff = getInitialDiffByType(getType(patch));
  return patch.reduce(okosFüggvény, initialDiff);
}
