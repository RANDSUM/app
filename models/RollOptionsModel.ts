import { RollOptions } from 'randsum'

import RollModifierModel from './RollModifierModel'

function title({ quantity, sides, modifiers }: RollOptions, showMods = true) {
  return `${quantity}D${sides}${showMods ? RollModifierModel.formatModifierNotation(modifiers) : ''}`
}

function icon({ sides }: RollOptions) {
  return sides === 100 ? 'brightness-percent' : `dice-d${sides}`
}

export default { title, icon }
