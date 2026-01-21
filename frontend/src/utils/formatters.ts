export const formatPrice = (value: number | undefined | null): string => {
  const safe = Number.isFinite(value as number) ? (value as number) : 0;
  return `€${safe.toFixed(2)}`;
};
