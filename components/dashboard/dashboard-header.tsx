"use client"

import { ChevronRight } from "lucide-react"
import { DateRangePicker } from "../ui/date-range-picker"
import type { DateRange } from "../../types/dashboard"

interface DashboardHeaderProps {
  title: string
  breadcrumb: string[]
  dateRange: DateRange
  onDateRangeChange: (dateRange: DateRange) => void
}

export function DashboardHeader({ title, breadcrumb, dateRange, onDateRangeChange }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                <span className={index === breadcrumb.length - 1 ? "font-medium text-gray-900" : ""}>{item}</span>
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} className="w-auto" />
      </div>
    </div>
  )
}
