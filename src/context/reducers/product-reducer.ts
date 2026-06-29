import type { BuilderAction, BuilderState, Product } from "@/lib/types/builder";

export type { BuilderAction };

function updateProduct(
  steps: BuilderState["steps"],
  productId: string,
  updater: (product: Product) => Product,
) {
  return steps.map((step) => {
    if (step.type !== "products") return step;

    return {
      ...step,
      products: step.products.map((product) =>
        product.id === productId ? updater(product) : product,
      ),
    };
  });
}

function changeQuantity(
  product: Product,
  variantId: string | undefined,
  delta: number,
) {
  if (product.variants.length > 0) {
    const activeId = variantId ?? product.defaultVariantId;

    return {
      ...product,
      variants: product.variants.map((variant) =>
        variant.id === activeId
          ? { ...variant, quantity: Math.max(0, variant.quantity + delta) }
          : variant,
      ),
    };
  }

  return {
    ...product,
    quantity: Math.max(0, product.quantity + delta),
  };
}

export function builderReducer(
  state: BuilderState,
  action: BuilderAction,
): BuilderState {
  switch (action.type) {
    // product quantity +1
    case "INCREASE_QUANTITY":
      return {
        steps: updateProduct(state.steps, action.productId, (product) =>
          changeQuantity(product, action.variantId, 1),
        ),
      };

    // product quantity -1
    case "DECREASE_QUANTITY":
      return {
        steps: updateProduct(state.steps, action.productId, (product) =>
          changeQuantity(product, action.variantId, -1),
        ),
      };

    // card click: select 1 or deselect to 0
    case "TOGGLE_SELECT":
      return {
        steps: updateProduct(state.steps, action.productId, (product) => {
          if (product.variants.length > 0) {
            const activeId = product.defaultVariantId;

            return {
              ...product,
              variants: product.variants.map((variant) =>
                variant.id === activeId
                  ? {
                      ...variant,
                      quantity: variant.quantity > 0 ? 0 : 1,
                    }
                  : variant,
              ),
            };
          }

          return {
            ...product,
            quantity: product.quantity > 0 ? 0 : 1,
          };
        }),
      };

    // change active color variant
    case "SET_VARIANT":
      return {
        steps: updateProduct(state.steps, action.productId, (product) => ({
          ...product,
          defaultVariantId: action.variantId,
        })),
      };

    // pick one plan only
    case "SET_PLAN":
      return {
        steps: state.steps.map((step) => {
          if (step.type !== "plan") return step;

          return {
            ...step,
            plans: step.plans.map((plan) => ({
              ...plan,
              selected: plan.id === action.planId,
            })),
          };
        }),
      };

    default:
      return state;
  }
}
