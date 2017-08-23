import { DeepDiffChange, Change, Patch, Diff } from '../../types';

type DiffMap = Map<Symbol, Change>;

const getType = (patch: Patch): string => (patch.find(change => !!change.path) ? 'object' : typeof patch[0].rhs);

const getInitialDiffByType = (type: string): Diff => {
  switch (type) {
    case 'object':
      return {};
    case 'string':
      return '';
    case 'number':
      return 0;
    default:
      return {};
  }
};

const mapDeepDiffChangeToChange = (changes: DeepDiffChange[]): Change[] => {
  return changes.map(change => {
    return change.kind === 'A'
      ? {
          kind: change.item.kind,
          path: [ ...(change.path || []), change.index.toString() ],
          rhs: change.item.rhs,
          ...change.item.lhs ? { lhs: change.item.lhs } : {}
        }
      : { ...change } as Change;
  });
};

const diffBuilder = (diffmap: DiffMap) => (diff: Diff, change: Change): Diff => {
  const symbol = Symbol();

  diffmap.set(symbol, change);
  if (!change.path) return symbol;

  change.path.reduce((endpoint, prop, i, path) => {
    endpoint[prop] = i === path.length - 1 ? symbol : endpoint[prop] || {};
    return endpoint[prop];
  }, diff);

  return diff;
};

export default function getDiff(originalPatch: Patch = []): Diff {
  const patch = mapDeepDiffChangeToChange(originalPatch);
  const diffMap: DiffMap = new Map();
  const initialDiff = getInitialDiffByType(getType(patch));
  return { diff: patch.reduce(diffBuilder(diffMap), initialDiff), map: diffMap };
}
