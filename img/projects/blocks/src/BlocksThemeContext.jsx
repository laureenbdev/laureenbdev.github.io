import { createContext, useContext } from 'react'

const BlocksThemeContext = createContext(null)

/**
 * Fournit la fonction `getColorVariant` de l’app (ex. chargée depuis theme.json).
 * Les blocs appellent `useBlockPalette('primary' | 'secondary' | 'neutral')`.
 */
export function BlocksThemeProvider({ getColorVariant, children }) {
  return <BlocksThemeContext.Provider value={getColorVariant}>{children}</BlocksThemeContext.Provider>
}

export function useBlockPalette(color = 'primary') {
  const getColorVariant = useContext(BlocksThemeContext)
  if (typeof getColorVariant !== 'function') {
    throw new Error('blocks: wrap l’app avec <BlocksThemeProvider getColorVariant={...}>')
  }
  return getColorVariant(color)
}
