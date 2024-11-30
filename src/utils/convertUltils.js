export function convertToSlug(text) {
  return text
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function toUpperCase(str) {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }
  return str.toUpperCase();
}

