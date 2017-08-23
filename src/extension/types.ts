export interface DeepDiffChange {
  kind: string;
  path: string[];
  lhs?: any;
  rhs: any;
  index?: number;
  item?: Change;
}

export interface Change {
  kind: string;
  path: string[];
  lhs?: any;
  rhs: any;
}

export type Patch = Change[];

export type Diff = any;
