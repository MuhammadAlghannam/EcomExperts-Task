interface ReviewCategorySectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ReviewCategorySection({
  title,
  children,
}: ReviewCategorySectionProps) {
  return (
    <div className="border-t border-gray-400 pt-[15px] mt-2.5">
      <span className="text-12-medium-caps text-gray-500 uppercase">
        {title}
      </span>
      {children}
    </div>
  );
}
