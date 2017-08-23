import {Change, Patch, Diff} from '../../types';

type DiffMap = Map<Symbol, Change>;

/* const diff = {
  name: symbol,
  number: symbol,
  details: {
    with: symbol
  }
} */

const getType = (patch: Patch): string =>
    patch.find(change => !!change.path) ? 'object' : typeof patch[0].rhs;

const getInitialDiffByType = (type: string): Diff => {
    // console.log('<! type>', type);
    switch (type) {
        case 'object':
            return {};
        case 'string':
            return '';
        case 'number':
            return 0;
        default:
            return {}
    }
};

const diffBuilder = (diffmap: DiffMap) => (diff: Diff, change: Change): Diff => {
    const symbol = Symbol();

    diffmap.set(symbol, change);
    if (!change.path) return symbol;

    // const delta = change.path.reduce((previousValue, currentValue, currentIndex, array) => {
    //     // console.log('change', change);
    //     // console.log('array', array);
    //
    //     if (currentIndex+1 === change.path.length) {
    //         if (change.kind === "E") {
    //             previousValue[currentValue] = {oldValue: change.lhs, newValue: change.rhs};
    //         } else if (change.kind === "A") {
    //             if (change.item.kind === "N") {
    //                 previousValue[currentValue] = {newValue: change.item.rhs};
    //             }
    //             else if (change.item.kind === "E") {
    //                 previousValue[currentValue] = {oldValue: change.item.lhs, newValue: change.rhs};
    //             }
    //         }
    //     }
    //
    //
    //     return previousValue;
    // }, {});

    const delta = createDelta(change.path, symbol);
    
    console.log(delta);
    return {...diff, ...delta};
};

const createDelta = (path, symbol) =>
    path.reduce((delta, prop, i, path) => {
        path.slice(0, i).reduce((acc, p) => acc[p], delta)[prop] = i === path.length - 1 ? symbol : {};
        return delta
    }, {});

export default function getDiff(patch: Patch = []): Diff {
    const diffMap: DiffMap = new Map();
    const initialDiff = getInitialDiffByType(getType(patch));
    return patch.reduce(diffBuilder(diffMap), initialDiff);
}
