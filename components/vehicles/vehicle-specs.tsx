import { cn } from "@/lib/utils";

type Specification = {
  id: string;
  code: string;
  name: string;
  unit: string | null;
  value: string;
};

type VehicleSpecsProps = {
  specifications: Specification[];
  className?: string;
};

export function VehicleSpecs({ specifications, className }: VehicleSpecsProps) {
  if (specifications.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-lg font-semibold">Especificaciones técnicas</h3>
      <dl className="grid gap-3 sm:grid-cols-2">
        {specifications.map((spec) => (
          <div
            key={spec.id}
            className="flex items-baseline justify-between border-b border-border pb-2"
          >
            <dt className="text-sm text-muted-foreground">{spec.name}</dt>
            <dd className="text-sm font-medium">
              {spec.value}
              {spec.unit && (
                <span className="ml-1 text-xs text-muted-foreground">
                  {spec.unit}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
