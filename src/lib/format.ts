type FormatOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatNumber(
  value: number,
  { minimumFractionDigits = 2, maximumFractionDigits = 2 }: FormatOptions = {},
): string {
  if (!Number.isFinite(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatCurrency(value: number): string {
  return `${formatNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USDT`;
}

export function formatLeverage(value: number): string {
  if (!Number.isFinite(value)) {
    return "--";
  }

  return `${value}x`;
}
