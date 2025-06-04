import type { CampaignStatus, ScriptStatus, PerformanceLevel } from "../types/dashboard"

export const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    900: "#1e3a8a",
  },
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    900: "#14532d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    900: "#78350f",
  },
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    900: "#7f1d1d",
  },
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
}

export function getStatusColor(status: CampaignStatus | ScriptStatus): string {
  const statusMap = {
    active: colors.success[500],
    completed: colors.success[500],
    warning: colors.warning[500],
    pending: colors.warning[500],
    "in-progress": colors.primary[500],
    inactive: colors.neutral[400],
  }
  return statusMap[status] || colors.neutral[400]
}

export function getPerformanceVariant(performance: PerformanceLevel): "success" | "warning" | "danger" | "primary" {
  const variantMap = {
    excellent: "success" as const,
    good: "primary" as const,
    "needs-attention": "warning" as const,
    poor: "danger" as const,
  }
  return variantMap[performance] || "primary"
}

export function getCampaignVariantColors(performance: PerformanceLevel) {
  const variant = getPerformanceVariant(performance)

  const variantStyles = {
    primary: {
      selectedBg: colors.primary[50],
      selectedBorder: colors.primary[200],
      hoverBg: colors.primary[25] || colors.primary[50],
    },
    success: {
      selectedBg: colors.success[50],
      selectedBorder: colors.success[200],
      hoverBg: colors.success[25] || colors.success[50],
    },
    warning: {
      selectedBg: colors.warning[50],
      selectedBorder: colors.warning[200],
      hoverBg: colors.warning[25] || colors.warning[50],
    },
    danger: {
      selectedBg: colors.danger[50],
      selectedBorder: colors.danger[200],
      hoverBg: colors.danger[25] || colors.danger[50],
    },
  }

  return variantStyles[variant]
}
