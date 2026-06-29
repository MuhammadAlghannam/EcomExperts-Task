// Format price to 2 decimal places and add currency symbol
export function formatPrice(value: number, currency = "$") {
  return `${currency}${value.toFixed(2)}`;
}
