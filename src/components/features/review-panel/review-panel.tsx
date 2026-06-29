import { CamPlanIcon, SatisfactionBadge, ShippingIcon } from "@/assets";
import LoadingSpinner from "@/components/shared/loading-spinner";
import PriceDisplay from "@/components/shared/price-display";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/UseProducts";
import {
  calculateTotals,
  getReviewItems,
} from "@/lib/helpers/builder-helper";
import { saveBuilderState } from "@/lib/helpers/builder-storage-helper";
import { formatPrice } from "@/lib/helpers/number-helper";
import type { ReviewCategory } from "@/lib/types/builder";
import { useState } from "react";
import { toast } from "sonner";
import ReviewCategorySection from "./components/review-category-section";
import ReviewLineItem from "./components/review-line-item";

const REVIEW_CATEGORIES: ReviewCategory[] = [
  "Cameras",
  "Sensors",
  "Accessories",
  "Plan",
];

export default function ReviewPanel() {
  const { steps, dispatch } = useProducts();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const items = getReviewItems(steps);
  const { totalPrice, totalCompareAt, savings } = calculateTotals(steps);
  const hasItems = items.length > 0;

  function handleCheckout() {
    setIsCheckingOut(true);

    setTimeout(() => {
      toast.success(
        "Congratulations! Your order was successfully confirmed.",
      );
      setIsCheckingOut(false);
    }, 1000);
  }

  function handleSave() {
    setIsSaving(true);

    setTimeout(() => {
      saveBuilderState(steps);
      toast.success("Your system was successfully saved.");
      setIsSaving(false);
    }, 1000);
  }

  return (
    <div className="bg-bg-section rounded-tr-10 rounded-tl-10 rounded-br-10 pt-[15px]">
      <h4 className="text-12-medium-caps text-text-secondary uppercase px-[15px]">
        Review
      </h4>

      <div className="px-5 pt-[20px] pb-[31px]">
        <h3 className="text-22-semibold-wide text-text-dark">
          Your security system
        </h3>
        <p className="text-14-medium-loose text-text-dark/75 mt-[5px]">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        {/* empty review state */}
        {!hasItems && (
          <p className="text-14-medium-loose text-text-dark/75 mt-6">
            Review panel is empty. Select products to show.
          </p>
        )}

        {hasItems
          && REVIEW_CATEGORIES.map((category) => {
            const categoryItems = items.filter(
              (item) => item.category === category,
            );

            if (categoryItems.length === 0) return null;

            return (
              <ReviewCategorySection key={category} title={category}>
                {categoryItems.map((item) => (
                  <ReviewLineItem
                    key={`${item.productId}-${item.variantId ?? "default"}`}
                    image={item.isPlan ? CamPlanIcon : item.image}
                    imageClassName={
                      item.isPlan ? "size-7 rounded-none object-contain" : undefined
                    }
                    alt={item.title}
                    title={
                      item.isPlan ? (
                        <p className="text-16-bold-tight">
                          <span className="text-black">
                            {item.titlePrefix}{" "}
                          </span>
                          <span className="text-primary">
                            {item.titleHighlight}
                          </span>
                        </p>
                      ) : (
                        item.title
                      )
                    }
                    quantity={item.quantity}
                    compareAtPrice={item.compareAtPrice}
                    price={item.price}
                    showCounter={!item.isPlan}
                    onDecrease={
                      item.isPlan
                        ? undefined
                        : () =>
                          dispatch({
                            type: "DECREASE_QUANTITY",
                            productId: item.productId,
                            variantId: item.variantId,
                          })
                    }
                    onIncrease={
                      item.isPlan
                        ? undefined
                        : () =>
                          dispatch({
                            type: "INCREASE_QUANTITY",
                            productId: item.productId,
                            variantId: item.variantId,
                          })
                    }
                  />
                ))}
              </ReviewCategorySection>
            );
          })
        }

        {hasItems && (
          <>
            <div className="border-t border-gray-400 pt-[15px] mt-2.5 flex-between">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-5 size-[41px] flex items-center justify-center">
                  <img
                    src={ShippingIcon}
                    alt="ShippingIcon"
                    className="size-[29px] shrink-0"
                  />
                </div>
                <h3 className="text-14-medium-snug text-foreground">
                  Fast Shipping
                </h3>
              </div>

              <PriceDisplay
                compareAtPrice={5.99}
                priceLabel="FREE"
                className="flex-col items-end gap-[3px]"
                compareAtPriceClassName="text-14-medium-snug text-gray-600 line-through"
                priceClassName="text-14-semibold-snug text-primary uppercase"
              />
            </div>

            <div className="flex-between mt-2.5">
              <img
                src={SatisfactionBadge}
                alt="SatisfactionBadge"
                className="size-[78px] shrink-0"
              />

              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-primary text-12-medium-condensed text-white px-2! py-[5px]! rounded-3!">
                  as low as {formatPrice(totalPrice)}/mo
                </Badge>

                <PriceDisplay
                  compareAtPrice={totalCompareAt}
                  price={totalPrice}
                  className="flex-row items-center gap-2"
                  compareAtPriceClassName="text-18-medium text-gray-600 line-through"
                  priceClassName="text-24-bold text-primary"
                />
              </div>
            </div>

            <div className="mt-1 pt-2.5">
              {savings > 0 ? (
                <h4 className="text-12-semibold-tight text-success text-center">
                  Congrats! You&apos;re saving {formatPrice(savings)} on your
                  security bundle!
                </h4>
              ) : null}

              <Button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full text-17-paragraph-block bg-primary! cursor-pointer text-white rounded-4! px-[13px]! py-[22px]! mt-1"
              >
                {isCheckingOut ? <LoadingSpinner /> : "Checkout"}
              </Button>

              <Button
                disabled={isSaving}
                onClick={handleSave}
                className="w-full text-14-regular-italic bg-transparent! cursor-pointer underline text-text-secondary px-0! py-0!"
              >
                {isSaving ? <LoadingSpinner /> : "Save my system for later"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
