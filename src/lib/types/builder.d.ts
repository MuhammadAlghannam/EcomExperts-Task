export interface ProductVariant {
  id: string;
  name: string;
  swatch: string;
  quantity: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  badge: string | null;
  compareAtPrice: number | null;
  price: number;
  quantity: number;
  defaultVariantId: string | null;
  variants: ProductVariant[];
}

export interface Plan {
  id: string;
  titlePrefix: string;
  titleHighlight: string;
  compareAtPrice: number | null;
  price: number;
  selected: boolean;
}

export type StepIcon = "livestream" | "shield" | "sensor" | "extra";

export type ReviewCategory = "Cameras" | "Plan" | "Sensors" | "Accessories";

interface BaseBuilderStep {
  id: string;
  step: number;
  title: string;
  icon: StepIcon;
  category: ReviewCategory;
  nextLabel: string;
}

export interface ProductBuilderStep extends BaseBuilderStep {
  type: "products";
  products: Product[];
}

export interface PlanBuilderStep extends BaseBuilderStep {
  type: "plan";
  category: "Plan";
  plans: Plan[];
}

export type BuilderStep = ProductBuilderStep | PlanBuilderStep;

export interface BuilderData {
  steps: BuilderStep[];
}

export type BuilderState = {
  steps: BuilderStep[];
};

export interface ReviewItem {
  category: ReviewCategory;
  productId: string;
  variantId?: string;
  title: string;
  titlePrefix?: string;
  titleHighlight?: string;
  image: string;
  quantity: number;
  price: number;
  compareAtPrice: number | null;
  isPlan?: boolean;
}

export type BuilderAction =
  | { type: "INCREASE_QUANTITY"; productId: string; variantId?: string }
  | { type: "DECREASE_QUANTITY"; productId: string; variantId?: string }
  | { type: "TOGGLE_SELECT"; productId: string }
  | { type: "SET_VARIANT"; productId: string; variantId: string }
  | { type: "SET_PLAN"; planId: string };
