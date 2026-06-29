import { formatPrice } from "@/lib/helpers/number-helper";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PriceDisplayProps {
  compareAtPrice?: number | null;
  price?: number;
  priceLabel?: ReactNode;
  suffix?: string;
  className?: string;
  compareAtPriceClassName?: string;
  priceClassName?: string;
}

export default function PriceDisplay({
  compareAtPrice,
  price,
  priceLabel,
  suffix = "",
  className,
  compareAtPriceClassName,
  priceClassName,
}: PriceDisplayProps) {
  const showCompare = compareAtPrice != null;
  const showPrice = priceLabel != null || price != null;

  return (
    <div className={cn("flex shrink-0", className)}>
      {showCompare ? (
        <span className={compareAtPriceClassName}>
          {formatPrice(compareAtPrice)}
          {suffix}
        </span>
      ) : null}
      {showPrice ? (
        <span className={priceClassName}>
          {priceLabel ?? `${formatPrice(price!)}`}{suffix}
        </span>
      ) : null}
    </div>
  );
}
