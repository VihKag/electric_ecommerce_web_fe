export function formatCurrency(number) {
  // Format số theo kiểu tiền tệ VND
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(number);

  // Xóa khoảng trắng giữa số và ký hiệu tiền tệ (₫)
  return formatted.replace(/\s₫/, '₫');
}
