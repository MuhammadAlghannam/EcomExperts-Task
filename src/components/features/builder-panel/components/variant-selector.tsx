import type { ProductVariant } from "@/lib/types/builder";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect?: (variantId: string) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect?.(variant.id)}
          className={cn(
            "rounded-2 px-[3px] py-px border-[0.5px] flex items-center hover:bg-[#1DF0BB0A] hover:border-green transition-all duration-300 cursor-pointer",
            variant.id === selectedVariantId
              ? "border-green bg-[#1DF0BB0A]"
              : "border-border",
          )}
        >
          <img
            src={variant.swatch}
            alt={variant.name}
            className="size-7"
          />
          <span className="text-10-medium text-text-dark">{variant.name}</span>
        </button>
      ))}
    </div>
  );
}
