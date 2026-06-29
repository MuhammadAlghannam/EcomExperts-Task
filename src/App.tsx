import BuilderPanel from "@/components/features/builder-panel/builder-panel";
import ReviewPanel from "@/components/features/review-panel/review-panel";
import Providers from "@/providers/Providers";

export default function App() {
  return (
    <Providers>
      <main className="container-1440 flex items-start flex-col md:flex-row gap-[29px] md:pt-[49.36px] pt-[31px] md:pb-[49.64px] pb-0">
        {/* Let’s get started! Mobile only */}
        <div className="text-center w-full md:hidden block">
          <h1 className="text-32-bold text-text-dark">Let’s get started!</h1>
        </div>

        {/* Builder Panel */}
        <aside className="flex-3 w-full">
          <BuilderPanel />
        </aside>

        {/* Review Panel */}
        <aside className="flex-[1.3] w-full">
          <ReviewPanel />
        </aside>
      </main>
    </Providers>
  )
}
