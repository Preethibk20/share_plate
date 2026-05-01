export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatCompactTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const hours = Math.floor(diff / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)

  if (hours === 0 && minutes === 0) {
    return 'Expired'
  }

  return `${hours}h ${minutes}m left`
}
