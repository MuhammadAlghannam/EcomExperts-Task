import { Spinner } from "../ui/spinner";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Spinner className={className} />
    </div>
  )
}