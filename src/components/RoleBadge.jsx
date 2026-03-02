import { ROLE_COLORS, EXPOSURE_COLORS } from '../data/countries'

export function RoleBadge({ role }) {
  const config = ROLE_COLORS[role] || { bg: '#666', text: '#fff', label: role }
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  )
}

export function ExposureBadge({ exposure }) {
  const config = EXPOSURE_COLORS[exposure] || EXPOSURE_COLORS.Medium
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {exposure}
    </span>
  )
}
