import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface QuantityCounterProps {
  value: number;
  variant?: "product" | "review";
  onDecrease?: () => void;
  onIncrease?: () => void;
}

export default function QuantityCounter({
  value,
  variant = "product",
  onDecrease,
  onIncrease,
}: QuantityCounterProps) {
  const isReview = variant === "review";
  const isMinusDisabled = value === 0;

  const activeButtonClass = isReview
    ? "border-none bg-white p-1"
    : "border-gray-surface bg-gray-surface";

  const minusButtonClass = isMinusDisabled
    ? isReview
      ? "border-none bg-gray-400 p-1 cursor-not-allowed"
      : "border-gray-300 cursor-not-allowed"
    : activeButtonClass;

  return (
    <div className="py-1 flex items-center gap-2.5">
      <button
        type="button"
        disabled={isMinusDisabled}
        onClick={onDecrease}
        className={cn("cursor-pointer rounded-4 border-2", minusButtonClass)}
      >
        <Minus
          size={16}
          className={isReview ? "text-muted-foreground" : undefined}
          color={
            isReview
              ? undefined
              : isMinusDisabled
                ? "var(--gray-400)"
                : "var(--gray-700)"
          }
        />
      </button>

      <span
        className={cn(
          isReview
            ? "text-14-semibold text-foreground"
            : "text-16-medium text-foreground",
        )}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className={cn("cursor-pointer rounded-4 border-2", activeButtonClass)}
      >
        <Plus
          size={16}
          className={isReview ? "text-muted-foreground" : undefined}
          color={isReview ? undefined : "var(--gray-700)"}
        />
      </button>
    </div>
  );
}
