import builderData from "@/lib/data/builder-data.json";
import {
  ExtraIcon,
  LiveStreamIcon,
  SensorIcon,
  ShieldIcon,
} from "@/assets";
import type { BuilderData, BuilderStep, StepIcon } from "@/lib/types/builder";

export const BUILDER_DATA = builderData as BuilderData;
export const BUILDER_STEPS: BuilderStep[] = BUILDER_DATA.steps;
export const BUILDER_TOTAL_STEPS = BUILDER_STEPS.length;

export const STEP_ICONS: Record<StepIcon, string> = {
  livestream: LiveStreamIcon,
  shield: ShieldIcon,
  sensor: SensorIcon,
  extra: ExtraIcon,
};
