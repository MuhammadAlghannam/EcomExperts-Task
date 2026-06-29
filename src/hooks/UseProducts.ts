import { ProductsContext } from "@/context/products-context";
import { useContext } from "react";

export function useProducts() {
  const value = useContext(ProductsContext);

  if (value === null) {
    throw new Error("useProducts must be used within ProductsProvider");
  }

  return value;
}
