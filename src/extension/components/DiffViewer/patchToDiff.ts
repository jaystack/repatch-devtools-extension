import diff = require('deep-diff');
import { Change } from '../../types';

/* const diff = {
  name: symbol,
  number: symbol,
  details: {
    with: symbol
  }
} */

const getType = patch => patch.find(change => change.path.length > 0) ? "object" : typeof patch[0].rhs;

const getInitialStateByType = type => {
  /* switch (type) {
    case 'object': {}
    case 'string': '',
    ...
  } */
}

export default function() {
  const diffMap = new Map<Symbol, Change>();
}
