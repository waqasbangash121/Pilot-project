"use client";

import type { ComponentProps } from "react";
import { useId } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib";

import { Input } from "../ui/input";

type SearchBarProps = Omit<ComponentProps<"form">, "action" | "method"> & {
  compact?: boolean;
};

export function SearchBar({ className, compact = false, ...props }: SearchBarProps) {
  const inputId = useId();
  const pathname = usePathname() || "/";
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");

  return (
    <form
      action={isSpanish ? "/es/search" : "/search"}
      method="get"
      role="search"
      className={cn("w-full", className)}
      {...props}
    >
      <label htmlFor={inputId} className="sr-only">
{isSpanish ? "Buscar apps, recursos y herramientas" : "Search apps, resources, and tools"}
      </label>
      <Input
        id={inputId}
        name="q"
        type="search"
        variant="outline"
        placeholder={isSpanish ? "Buscar apps, guias y herramientas" : "Search apps, guides, and tools"}
        className={cn(compact ? "h-9" : "h-10")}
      />
    </form>
  );
}

