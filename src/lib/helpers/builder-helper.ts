import { BUILDER_TOTAL_STEPS } from "@/lib/constants/builder.constants";
import type {
  BuilderStep,
  BuilderState,
  Product,
  ReviewItem,
} from "@/lib/types/builder";

export function getStepLabel(step: number, total = BUILDER_TOTAL_STEPS) {
  return `Step ${step} of ${total}`;
}

// qty for the active variant or product-level qty
export function getActiveQuantity(product: Product) {
  if (product.variants.length > 0) {
    const active = product.variants.find(
      (variant) => variant.id === product.defaultVariantId,
    );

    return active?.quantity ?? 0;
  }

  return product.quantity;
}

export function isProductSelected(product: Product) {
  if (product.variants.length > 0) {
    return product.variants.some((variant) => variant.quantity > 0);
  }

  return product.quantity > 0;
}

export function getStepSelectedCount(step: BuilderStep) {
  if (step.type === "plan") {
    return step.plans.some((plan) => plan.selected) ? 1 : 0;
  }

  return step.products.filter((product) => isProductSelected(product)).length;
}

// furthest step to unlock: keep unlocking the next step while the current has a selection
export function getInitialUnlockedStep(steps: BuilderState["steps"]) {
  let unlocked = 1;

  for (const step of steps) {
    if (getStepSelectedCount(step) > 0) {
      unlocked = step.step + 1;
    } else {
      break;
    }
  }

  return Math.min(unlocked, steps.length);
}

// one line item per variant with qty > 0
export function getReviewItems(steps: BuilderState["steps"]): ReviewItem[] {
  const items: ReviewItem[] = [];

  steps.forEach((step) => {
    if (step.type === "products") {
      step.products.forEach((product) => {
        if (product.variants.length > 0) {
          product.variants.forEach((variant) => {
            if (variant.quantity > 0) {
              items.push({
                category: step.category,
                productId: product.id,
                variantId: variant.id,
                title: `${product.title} — ${variant.name}`,
                image: product.image,
                quantity: variant.quantity,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
              });
            }
          });
        } else if (product.quantity > 0) {
          items.push({
            category: step.category,
            productId: product.id,
            title: product.title,
            image: product.image,
            quantity: product.quantity,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
          });
        }
      });
    }

    if (step.type === "plan") {
      const selectedPlan = step.plans.find((plan) => plan.selected);

      if (selectedPlan) {
        items.push({
          category: step.category,
          productId: selectedPlan.id,
          title: `${selectedPlan.titlePrefix} ${selectedPlan.titleHighlight}`,
          titlePrefix: selectedPlan.titlePrefix,
          titleHighlight: selectedPlan.titleHighlight,
          image: "",
          quantity: 1,
          price: selectedPlan.price,
          compareAtPrice: selectedPlan.compareAtPrice,
          isPlan: true,
        });
      }
    }
  });

  return items;
}

export function calculateTotals(steps: BuilderState["steps"]) {
  const items = getReviewItems(steps);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalCompareAt = items.reduce(
    (sum, item) =>
      sum + (item.compareAtPrice ?? item.price) * item.quantity,
    0,
  );

  return {
    totalPrice,
    totalCompareAt,
    savings: totalCompareAt - totalPrice,
  };
}
