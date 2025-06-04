"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Plus, CheckSquare, Menu, ChevronLeft, TrendingUp, Users, Settings } from "lucide-react"
import type { NavigationPage } from "../../types/dashboard"

interface SidebarProps {
  currentPage: NavigationPage
  isOpen: boolean
  onNavigate: (page: NavigationPage) => void
  onToggle: () => void
  scriptsNeedingValidation: number
}

export function Sidebar({ currentPage, isOpen, onNavigate, onToggle, scriptsNeedingValidation }: SidebarProps) {
  const menuItems = [
    {
      id: "dashboard" as NavigationPage,
      label: "Dashboard",
      icon: BarChart3,
      description: "Visão geral das campanhas",
    },
    {
      id: "campaigns" as NavigationPage,
      label: "Campanhas",
      icon: Plus,
      description: "Gerenciar campanhas",
    },
    {
      id: "validation" as NavigationPage,
      label: "Validação",
      icon: CheckSquare,
      description: "Validar scripts",
      badge: scriptsNeedingValidation > 0 ? scriptsNeedingValidation : undefined,
    },
  ]

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "w-64" : "w-16",
          "lg:relative lg:translate-x-0",
          !isOpen && "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-[73px]">
          <div className={cn("flex items-center gap-3", !isOpen && "justify-center w-full")}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <div className="min-w-0">
                <h1 className="font-bold text-gray-900 truncate">Natubio</h1>
                <p className="text-xs text-gray-500 truncate">Campaign Manager</p>
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle} className={cn("flex-shrink-0", !isOpen && "hidden")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto py-3 transition-all duration-200",
                  !isOpen && "justify-center px-2",
                  isActive && "bg-blue-50 text-blue-700 border-blue-200",
                )}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isOpen && "mr-3")} />
                {isOpen && (
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium truncate">{item.label}</div>
                    <div className="text-xs text-gray-500 truncate">{item.description}</div>
                  </div>
                )}
                {isOpen && item.badge && (
                  <Badge variant="destructive" className="ml-2 flex-shrink-0">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@natubio.com</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Configurações</span>
            </Button>
          </div>
        )}

        {/* Toggle button para desktop quando fechado */}
        {!isOpen && (
          <div className="p-2 border-t border-gray-200">
            <Button variant="ghost" size="sm" onClick={onToggle} className="w-full justify-center">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}
