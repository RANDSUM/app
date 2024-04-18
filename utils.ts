import { dieSides } from '~constants'

export const randomDieSide = () =>
  dieSides[Math.floor(Math.random() * dieSides.length)]
