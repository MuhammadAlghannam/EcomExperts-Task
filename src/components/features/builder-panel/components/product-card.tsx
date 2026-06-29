import PriceDisplay from "@/components/shared/price-display";
import QuantityCounter from "@/components/shared/quantity-counter";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/UseProducts";
import {
  getActiveQuantity,
  isProductSelected,
} from "@/lib/helpers/builder-helper";
import type { Product } from "@/lib/types/builder";
import { cn } from "@/lib/utils";
import VariantSelector from "./variant-selector";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useProducts();
  const selected = isProductSelected(product);
  const quantity = getActiveQuantity(product);
  const activeVariantId = product.defaultVariantId ?? undefined;

  // show unit price before selecting, line total once quantity > 0
  const multiplier = quantity || 1;

  return (
    <div
      onClick={() => dispatch({ type: "TOGGLE_SELECT", productId: product.id })}
      className={cn(
        "rounded-10 p-[11px] bg-background flex items-center flex-col md:flex-row gap-[19px] border-2 transition-all duration-300 cursor-pointer w-full md:w-[49%]",
        selected ? "border-primary" : "border-transparent hover:border-primary/70",
      )}
    >
      <div className="flex-1 w-full">
        {product.badge && (
          <Badge className="bg-primary text-12-semibold text-white px-[6px] py-[2px] rounded-10">
            {product.badge}
          </Badge>
        )}
        <div className="md:w-[101px] w-full md:h-[137px] h-[120px] mx-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-3">
        <h3 className="text-16-semibold-wide mb-2">{product.title}</h3>
        <p className="text-12-medium-wide text-text-dark/75 mb-2.5">
          {product.description}{" "}
          <a
            href={product.learnMoreUrl}
            className="text-learn-more underline"
            onClick={(event) => event.stopPropagation()}
          >
            Learn More
          </a>
        </p>

        <div onClick={(event) => event.stopPropagation()}>
          <VariantSelector
            variants={product.variants}
            selectedVariantId={product.defaultVariantId}
            onSelect={(variantId) =>
              dispatch({
                type: "SET_VARIANT",
                productId: product.id,
                variantId,
              })
            }
          />
        </div>

        <div className="flex-between">
          <div onClick={(event) => event.stopPropagation()}>
            <QuantityCounter
              value={quantity}
              variant="product"
              onDecrease={() =>
                dispatch({
                  type: "DECREASE_QUANTITY",
                  productId: product.id,
                  variantId: activeVariantId,
                })
              }
              onIncrease={() =>
                dispatch({
                  type: "INCREASE_QUANTITY",
                  productId: product.id,
                  variantId: activeVariantId,
                })
              }
            />
          </div>

          <PriceDisplay
            compareAtPrice={
              product.compareAtPrice != null
                ? product.compareAtPrice * multiplier
                : null
            }
            price={product.price * multiplier}
            className="flex-row md:flex-col gap-[3px] items-end"
            compareAtPriceClassName="text-16-regular-wide text-destructive line-through"
            priceClassName="text-16-regular-wide text-text-muted"
          />
        </div>
      </div>
    </div>
  );
}
