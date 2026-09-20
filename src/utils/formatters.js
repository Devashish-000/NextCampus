/**
 * Format currency to INR Lacs or Crores
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'N/A';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format large numbers (e.g., total alumni, reviews count)
 */
export const formatCompactNumber = (number) => {
  if (!number) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
