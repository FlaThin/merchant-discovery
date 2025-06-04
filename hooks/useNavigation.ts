"use client"

import { useState } from "react"
import type { NavigationPage } from "../types/dashboard"

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>("dashboard")
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return {
    currentPage,
    isMenuOpen,
    navigateTo,
    toggleMenu,
  }
}
