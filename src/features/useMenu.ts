import { useState, useCallback } from 'react'

export function useMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setMenuOpen(!menuOpen), [menuOpen])

  return {
    menuOpen,
    setMenuOpen: toggleMenu,
    toggleMenu,
  }
}