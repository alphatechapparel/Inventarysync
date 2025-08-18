export function transformGenderSKU(sku) {
  const parts = sku.split('-');
  if (parts.length < 2) {
    throw new Error(`Invalid SKU format: ${sku} (must have at least two parts)`);
  }
  const gender = parts[1];
  const newGender = gender === 'M' ? 'W' : gender === 'W' ? 'M' : gender;
  if (newGender === gender) {
    throw new Error(`Invalid gender in SKU: ${sku} (must be M or W)`);
  }
  parts[1] = newGender;
  return parts.join('-');
}
