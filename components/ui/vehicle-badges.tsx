import { Sparkles, Leaf, CheckCircle2, BadgePercent, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type BadgeProps = {
  className?: string;
  children?: React.ReactNode;
};

export function BadgeNuevo({ className, children = "Nuevo" }: BadgeProps) {
  return (
    <Badge className={cn("gap-1", className)}>
      <Sparkles aria-hidden="true" />
      {children}
    </Badge>
  );
}

export function BadgeHibrido({ className, children = "Híbrido" }: BadgeProps) {
  return (
    <Badge variant="secondary" className={cn("gap-1", className)}>
      <Leaf aria-hidden="true" />
      {children}
    </Badge>
  );
}

export function BadgeDestacado({
  className,
  children = "Destacado",
}: BadgeProps) {
  return (
    <Badge variant="outline" className={cn("border-primary/40 text-primary", className)}>
      {children}
    </Badge>
  );
}

export function BadgeDisponible({
  className,
  children = "Disponible",
}: BadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 border-emerald-600/40 bg-emerald-50 text-emerald-700",
        className,
      )}
    >
      <CheckCircle2 aria-hidden="true" />
      {children}
    </Badge>
  );
}

export function BadgeOferta({ className, children = "Oferta" }: BadgeProps) {
  return (
    <Badge variant="destructive" className={cn("gap-1", className)}>
      <BadgePercent aria-hidden="true" />
      {children}
    </Badge>
  );
}

export function BadgeDemo({ className, children = "Demo" }: BadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1 border-dashed text-muted-foreground", className)}
    >
      <Info aria-hidden="true" />
      {children}
    </Badge>
  );
}
