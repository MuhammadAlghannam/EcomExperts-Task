import { ProductsProvider } from "@/context/products-context";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductsProvider>
        <Toaster position="bottom-right" richColors />

        {children}
      </ProductsProvider>
    </>
  )
}