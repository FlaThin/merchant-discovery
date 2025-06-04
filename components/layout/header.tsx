"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, User, Bell, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeaderProps {
  minimal?: boolean
}

export function Header({ minimal = false }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Recursos", href: "#features" },
    { label: "Preços", href: "#pricing" },
    { label: "Demo", href: "/dashboard" },
    { label: "Suporte", href: "/support" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-gray-900">TechWave</span>
          </Link>

          {/* Desktop Navigation */}
          {!minimal && (
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-indigo-600",
                    pathname === item.href ? "text-indigo-600" : "text-gray-600",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            {!minimal && (
              <>
                {/* Search */}
                <div className="hidden md:block relative">
                  {isSearchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "300px", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <Input
                        type="search"
                        placeholder="Buscar produtos..."
                        className="pr-8"
                        autoFocus
                        onBlur={() => setIsSearchOpen(false)}
                      />
                      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </motion.div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-indigo-600">
                  <Bell className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Dashboard Demo */}
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-indigo-600">
                <BarChart3 className="h-5 w-5" />
              </Button>
            </Link>

            {/* User */}
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-indigo-600">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu */}
            {!minimal && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-6 py-6">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">T</span>
                      </div>
                      <span className="font-bold text-xl text-gray-900">TechWave</span>
                    </Link>

                    <div className="relative">
                      <Input type="search" placeholder="Buscar produtos..." className="pr-8" />
                      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>

                    <nav className="flex flex-col gap-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-indigo-600 py-2",
                            pathname === item.href ? "text-indigo-600" : "text-gray-600",
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
