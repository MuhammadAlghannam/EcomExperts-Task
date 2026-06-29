import PriceDisplay from "@/components/shared/price-display";
import QuantityCounter from "@/components/shared/quantity-counter";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ReviewLineItemProps {
  image?: string;
  imageClassName?: string;
  title: ReactNode;
  alt?: string;
  quantity: number;
  compareAtPrice?: number | null;
  price: number;
  showCounter?: boolean;
  onDecrease?: () => void;
  onIncrease?: () => void;
}

export default function ReviewLineItem({
  image,
  imageClassName,
  title,
  alt,
  quantity,
  compareAtPrice,
  price,
  showCounter = true,
  onDecrease,
  onIncrease,
}: ReviewLineItemProps) {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {image && (
          <img
            src={image}
            alt={alt}
            className={cn(
              "size-[41px] rounded-5 shrink-0 object-cover",
              imageClassName,
            )}
          />
        )}

        <h3 className="text-14-medium-snug text-foreground">{title}</h3>
      </div>

      <div className="flex gap-4">
        {showCounter ? (
          <QuantityCounter
            value={quantity}
            variant="review"
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        ) : null}

        <PriceDisplay
          compareAtPrice={
            compareAtPrice != null ? compareAtPrice * quantity : null
          }
          price={price * quantity}
          suffix={showCounter ? undefined : "/mo"}
          className="flex-col items-end gap-[3px]"
          compareAtPriceClassName="text-14-medium-snug text-gray-600 line-through"
          priceClassName="text-14-semibold-snug text-primary"
        />
      </div>
    </div>
  );
}
