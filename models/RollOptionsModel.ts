import { DicePoolOptions } from 'randsum'

function icon({ sides }: DicePoolOptions<number> | DicePoolOptions<string>) {
  if (Array.isArray(sides)) {
    return 'dice'
  }
  return sides === 100 ? 'brightness-percent' : `dice-d${sides}`
}

export default { icon }
