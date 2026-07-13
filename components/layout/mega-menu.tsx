import Link from "next/link";

import type { MegaMenuColumn } from "@/types";

type MegaMenuProps = {
  columns: MegaMenuColumn[];
};

export function MegaMenu({ columns }: MegaMenuProps) {
  return (
    <div className="invisible absolute left-0 top-full z-[110] w-[22rem] pt-3 opacity-0 transition duration-150 group-hover/mega:visible group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:opacity-100">
      <div className="rounded-[8px] border border-border bg-surface p-3 shadow-[0_24px_60px_-28px_hsl(var(--shadow)/0.75)] ring-1 ring-border/50">
        {columns.map((column) => (
          <section
            key={column.title}
            aria-labelledby={`mega-${column.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <h2
              id={`mega-${column.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground"
            >
              {column.title}
            </h2>
            <ul className="space-y-1">
              {column.links.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-[6px] border border-transparent px-3 py-3 transition hover:border-primary/20 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="block text-sm font-bold text-foreground">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
