import { Modifiers } from 'randsum'

export const mockModifiers: Modifiers = {
  plus: 2,
  minus: 1,
  drop: {
    highest: undefined,
    greaterThan: 2,
    lessThan: 6,
    lowest: 1,
    exact: [2, 3],
  },
  reroll: { exact: undefined },
  cap: { greaterThan: 2, lessThan: 1 },
  replace: [{ from: 6, to: 1 }],
  unique: { notUnique: [1, 2] },
  explode: true,
}
