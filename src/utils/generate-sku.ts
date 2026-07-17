import { randomBytes } from "crypto";

export const generateSku = (
  title: string,
  color: string,
  size: string,
): string => {
  const productCode = title
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 5);

  const colorCode = color
    .trim()
    .replace(/\s+/g, "")
    .substring(0, 3)
    .toUpperCase();

  const random = () => randomBytes(3).toString("hex").toUpperCase();

  // POTSH-BLU-SM-A1B2C3
  return `${productCode}-${colorCode}-${size.toUpperCase()}-${random()}`;
};
