import React from "react"

export function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-0 h-screen overflow-y-auto p-6">
      {children}
    </div>
  )
} 