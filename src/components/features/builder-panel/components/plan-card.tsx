import { CamPlanIcon } from "@/assets";
import PriceDisplay from "@/components/shared/price-display";
import { useProducts } from "@/hooks/UseProducts";
import type { Plan } from "@/lib/types/builder";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const { dispatch } = useProducts();

  return (
    <div
      onClick={() => dispatch({ type: "SET_PLAN", planId: plan.id })}
      className={cn(
        "w-full rounded-10 bg-background px-4 py-3 flex items-center justify-between gap-4 cursor-pointer border-2 transition-all duration-300",
        plan.selected
          ? "border-primary"
          : "border-transparent hover:border-primary/70",
      )}
    >
      <div className="flex items-center gap-2 ">
        <img src={CamPlanIcon} alt="CamPlanIcon" className="size-7 shrink-0" />
        <p className="text-16-bold-tight">
          <span className="text-black">{plan.titlePrefix} </span>
          <span className="text-primary">{plan.titleHighlight}</span>
        </p>
      </div>

      <PriceDisplay
        compareAtPrice={plan.compareAtPrice}
        price={plan.price}
        suffix="/mo"
        className="flex-col items-end gap-[3px]"
        compareAtPriceClassName="text-14-medium-snug text-gray-600 line-through"
        priceClassName="text-14-semibold-snug text-primary"
      />
    </div>
  );
}
