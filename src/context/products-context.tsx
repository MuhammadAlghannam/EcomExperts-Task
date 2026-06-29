import { BUILDER_DATA } from "@/lib/constants/builder.constants";
import { loadBuilderState } from "@/lib/helpers/builder-storage-helper";
import type { BuilderAction, BuilderState } from "@/lib/types/builder";
import { createContext, useReducer, type Dispatch, type PropsWithChildren } from "react";
import { builderReducer } from "./reducers/product-reducer";

export type ProductsContextState = {
  steps: BuilderState["steps"];
  dispatch: Dispatch<BuilderAction>;
};

export const ProductsContext = createContext<ProductsContextState | null>(null);

const initialState: BuilderState =
  loadBuilderState() ?? {
    steps: structuredClone(BUILDER_DATA.steps),
  };

export function ProductsProvider({ children }: PropsWithChildren) {
  const [{ steps }, dispatch] = useReducer(builderReducer, initialState);

  return (
    <ProductsContext.Provider value={{ steps, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}
