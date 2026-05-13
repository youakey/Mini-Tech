interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

// Placeholder-анимация загрузки (пульсирующий прямоугольник)
export function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

// Скелетон карточки техники
export function EquipmentCardSkeleton() {
  return (
    <div className="card space-y-4">
      <Skeleton className="w-full rounded-xl" height="240px" />
      <Skeleton className="w-3/4" height="28px" />
      <Skeleton className="w-full" height="16px" />
      <Skeleton className="w-5/6" height="16px" />
      <Skeleton className="w-32" height="40px" />
    </div>
  );
}
