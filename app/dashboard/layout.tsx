"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { useDashboardData } from "@/hooks/useDashboardData"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { getScriptsNeedingValidation } = useDashboardData()
  const scriptsNeedingValidation = getScriptsNeedingValidation()
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Determina a página atual a partir da rota
  let currentPage: "dashboard" | "campaigns" | "validation" = "dashboard"
  if (pathname.endsWith("/campaigns")) currentPage = "campaigns"
  else if (pathname.endsWith("/validation")) currentPage = "validation"

  const navigateTo = (page: string) => {
    router.push(`/dashboard${page === "dashboard" ? "" : "/" + page}`)
  }

  const toggleMenu = () => setIsMenuOpen((v) => !v)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentPage={currentPage}
        isOpen={isMenuOpen}
        onNavigate={navigateTo}
        onToggle={toggleMenu}
        scriptsNeedingValidation={scriptsNeedingValidation.length}
      />
      <DashboardContent>{children}</DashboardContent>
    </div>
  )
}
  