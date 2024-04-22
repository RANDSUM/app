import { RollOptions } from 'randsum'

import {
  capNotation,
  dropNotation,
  explodeNotation,
  minusNotation,
  plusNotation,
  replaceNotation,
  rerollNotation,
  uniqueNotation,
} from './notationFormatters'
import {
  rerollString,
  explodeString,
  uniqueString,
  plusString,
  minusString,
  replaceString,
  dropString,
  capString,
} from './stringFormatters'

function formatModifiersForDisplay(
  modifiers: RollOptions['modifiers']
): string[] {
  if (!modifiers) return []

  const modifierStrings = []

  if (modifiers.cap)
    capString(modifiers.cap).forEach((str) => modifierStrings.push(str))
  if (modifiers.drop)
    dropString(modifiers.drop).forEach((str) => modifierStrings.push(str))
  if (modifiers.replace)
    replaceString(modifiers.replace).forEach((str) => modifierStrings.push(str))
  if (modifiers.reroll)
    rerollString(modifiers.reroll).forEach((str) => modifierStrings.push(str))
  if (modifiers.explode) modifierStrings.push(explodeString())
  if (modifiers.unique) modifierStrings.push(uniqueString(modifiers.unique))
  if (modifiers.plus) modifierStrings.push(plusString(modifiers.plus))
  if (modifiers.minus) modifierStrings.push(minusString(modifiers.minus))

  return modifierStrings
}

function formatModifierNotation(modifiers: RollOptions['modifiers']): string {
  if (!modifiers) return ''

  const modifierStrings = []

  if (modifiers.cap)
    capNotation(modifiers.cap).forEach((str) => modifierStrings.push(str))
  if (modifiers.drop) modifierStrings.push(dropNotation(modifiers.drop))
  if (modifiers.replace)
    modifierStrings.push(replaceNotation(modifiers.replace))
  if (modifiers.reroll) modifierStrings.push(rerollNotation(modifiers.reroll))
  if (modifiers.explode) modifierStrings.push(explodeNotation())
  if (modifiers.unique) modifierStrings.push(uniqueNotation(modifiers.unique))
  if (modifiers.plus) modifierStrings.push(plusNotation(modifiers.plus))
  if (modifiers.minus) modifierStrings.push(minusNotation(modifiers.minus))

  return modifierStrings.join('')
}

const hasModifiers = (modifiers: RollOptions['modifiers']) => {
  return formatModifiersForDisplay(modifiers).length > 0
}

export default {
  formatModifiersForDisplay,
  hasModifiers,
  formatModifierNotation,
}
