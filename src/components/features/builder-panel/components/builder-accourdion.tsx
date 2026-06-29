import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/UseProducts";
import { STEP_ICONS } from "@/lib/constants/builder.constants";
import {
  getInitialUnlockedStep,
  getStepLabel,
  getStepSelectedCount,
} from "@/lib/helpers/builder-helper";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PlanCard from "./plan-card";
import ProductCard from "./product-card";

export default function BuilderAccourdion() {
  const { steps } = useProducts();
  // restore unlock progress from saved selections on first render
  const [unlockedStep, setUnlockedStep] = useState(() =>
    getInitialUnlockedStep(steps),
  );
  const [openStepId, setOpenStepId] = useState(
    () => steps.find((step) => step.step === unlockedStep)?.id ?? steps[0].id,
  );

  function handleNext(stepId: string, stepNumber: number) {
    const step = steps.find((item) => item.id === stepId);

    if (!step || getStepSelectedCount(step) === 0) {
      toast.error("Please select at least one item");
      return;
    }

    const nextStep = steps.find((item) => item.step === stepNumber + 1);

    setUnlockedStep(stepNumber + 1);

    if (nextStep) {
      setOpenStepId(nextStep.id);
    }
  }

  return (
    <Accordion
      value={[openStepId]}
      onValueChange={(value) => {
        const nextId = value[0];

        if (!nextId) return;

        const step = steps.find((item) => item.id === nextId);

        if (step && step.step <= unlockedStep) {
          setOpenStepId(nextId);
        }
      }}
    >
      {steps.map((step) => {
        const selectedCount = getStepSelectedCount(step);
        const isLocked = step.step > unlockedStep;
        const isOpen = openStepId === step.id;

        return (
          <AccordionItem
            key={step.id}
            value={step.id}
            className="mb-[13px] overflow-hidden data-open:rounded-10 data-open:bg-bg-section data-open:pt-[15px]"
          >
            <AccordionTrigger
              aria-disabled={isLocked}
              className={cn(isLocked && "pointer-events-none opacity-50")}
            >
              <div className="flex flex-col gap-[5px] w-full">
                <span className="text-12-medium-caps text-text-secondary uppercase px-[15px]">
                  {getStepLabel(step.step)}
                </span>

                <div className="flex items-center justify-between py-5 border-text-dark border-y-[0.5px] px-[15px] group-aria-expanded/accordion-trigger:border-b-transparent">
                  <div className="flex items-center gap-2">
                    <img src={STEP_ICONS[step.icon]} alt={step.title} />
                    <h2 className="text-foreground text-22-semibold">
                      {step.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-14-medium text-primary">
                      {selectedCount} selected
                    </span>

                    <ChevronDownIcon
                      data-slot="accordion-trigger-icon"
                      fill="var(--primary)"
                      color="var(--primary)"
                      className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
                    />
                    <ChevronUpIcon
                      data-slot="accordion-trigger-icon"
                      fill="var(--primary)"
                      color="var(--primary)"
                      className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
                    />
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="px-[15px] pb-5 flex flex-col gap-[15px]">
                {step.type === "plan"
                  ? step.plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))
                  : null}

                {step.type === "products" ? (
                  <div className="flex flex-wrap items-stretch justify-center gap-[15px]">
                    {step.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : null}
              </div>

              {isOpen && step.step < steps.length ? (
                <div className="flex justify-center mb-2.5">
                  <Button
                    onClick={() => handleNext(step.id, step.step)}
                    className="text-18-semibold! bg-transparent! cursor-pointer text-primary rounded-7! border border-primary px-6! py-[7.5px]!"
                  >
                    {step.nextLabel}
                  </Button>
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
