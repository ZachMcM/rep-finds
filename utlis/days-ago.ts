export function daysAgo(date: Date): string {
  const minutesAgo = Math.round(
    (new Date().getTime() - date.getTime()) / 60000,
  );
  if (minutesAgo >= 525599)
    return `${Math.round(minutesAgo / 525599.42184)} Year(s) ago`;
  if (minutesAgo >= 43800)
    return `${Math.round(minutesAgo / 43800)} Months ago`;
  if (minutesAgo >= 10080) return `${Math.round(minutesAgo / 10080)} Week(s) ago`;
  if (minutesAgo >= 1440) return `${Math.round(minutesAgo / 1440)} Day(s) ago`;
  if (minutesAgo >= 60) return `${Math.round(minutesAgo / 60)} Hour(s) ago`;
  return `${minutesAgo} Minute(s) ago`;
}