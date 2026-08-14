import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs para navegación y SEO.
 * Último item es la página actual (no link).
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-1.5"
        >
          <Link
            href="/"
            itemProp="item"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span itemProp="name" className="sr-only sm:not-sr-only">
              Inicio
            </span>
          </Link>
          <meta itemProp="position" content="1" />
          <ChevronRight className="size-3 text-muted-foreground/50" aria-hidden="true" />
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const position = i + 2;
          return (
            <li
              key={item.label}
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  aria-current="page"
                  className={cn(
                    "font-medium",
                    isLast ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(position)} />
              {!isLast && (
                <ChevronRight className="size-3 text-muted-foreground/50" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
