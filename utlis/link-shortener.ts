export function linkShortener(link: string) {
  if (link.length > 20) {
    return link.substring(0, 20) + "..."
  }
} 