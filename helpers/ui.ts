export function getNumbers(text: string | null): number {
  const priceNumber = text?.match(/[\d.]+/)?.[0] ?? ''; 
  return parseFloat(priceNumber);
}
