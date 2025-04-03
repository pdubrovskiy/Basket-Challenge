export const formatCurrency = (price: number): string => {
  const roundedPrice = Math.round(price * 100) / 100;

  return `£${roundedPrice.toFixed(2)}`;
};
