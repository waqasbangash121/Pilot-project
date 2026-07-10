"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";

type EditorAccordionContextValue = {
  openSection: string | null;
  isAnyExpanded: boolean;
  toggleSection: (sectionId: string) => void;
};

const EditorAccordionContext = createContext<EditorAccordionContextValue | null>(null);

type EditorAccordionProps = {
  children: ReactNode;
  className?: string;
};

export function EditorAccordion({ children, className = "" }: EditorAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [accordionHeight, setAccordionHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleSection = useCallback((sectionId: string) => {
    setOpenSection((current) => (current === sectionId ? null : sectionId));
  }, []);

  useEffect(() => {
    function updateHeight() {
      if (!containerRef.current) return;

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const top = containerRef.current.getBoundingClientRect().top;
      const nextHeight = Math.max(768, Math.floor(viewportHeight - top - 24));

      setAccordionHeight((current) => (current === nextHeight ? current : nextHeight));
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.visualViewport?.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.visualViewport?.removeEventListener("resize", updateHeight);
    };
  }, []);

  const value = useMemo(
    () => ({
      openSection,
      isAnyExpanded: openSection !== null,
      toggleSection,
    }),
    [openSection, toggleSection],
  );

  return (
    <EditorAccordionContext.Provider value={value}>
      <div
        ref={containerRef}
        className={`flex flex-col gap-3 ${className}`}
        style={openSection ? { minHeight: accordionHeight ?? 768 } : undefined}
      >
        {children}
      </div>
    </EditorAccordionContext.Provider>
  );
}

export function useEditorAccordionItem(sectionId: string) {
  const context = useContext(EditorAccordionContext);

  if (!context) {
    throw new Error("Editor accordion items must be rendered inside EditorAccordion.");
  }

  return {
    isExpanded: context.openSection === sectionId,
    isAnyExpanded: context.isAnyExpanded,
    toggle: () => context.toggleSection(sectionId),
  };
}

type CollapsibleEditorSectionProps = {
  sectionId: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
  badge?: string;
  children: ReactNode;
};

export function CollapsibleEditorSection({
  sectionId,
  icon: Icon,
  eyebrow,
  title,
  description,
  badge,
  children,
}: CollapsibleEditorSectionProps) {
  const { isExpanded, toggle } = useEditorAccordionItem(sectionId);
  const panelId = useId();

  return (
    <section
      className={`flex flex-col overflow-hidden rounded-md border border-border/80 bg-surface shadow-sm transition-shadow ${
        isExpanded ? "flex-1" : "shrink-0"
      }`}
    >
      <header className={`shrink-0 ${isExpanded ? "border-b border-border" : ""}`}>
        <button
          type="button"
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title}`}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={toggle}
          className={`group flex min-h-[4.5rem] w-full items-center gap-3 px-5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
            isExpanded ? "bg-surface" : "bg-surface hover:bg-muted/30"
          }`}
        >
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-primary/5 text-primary transition-colors group-hover:border-primary/25 group-hover:bg-primary/10">
            <Icon aria-hidden="true" className="size-4" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-foreground">
              {title}
            </span>
          </span>

          {badge ? (
            <span className="hidden shrink-0 rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground md:inline-flex">
              {badge}
            </span>
          ) : null}

          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/50 text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
            {isExpanded ? (
              <ChevronUp aria-hidden="true" className="size-4" />
            ) : (
              <ChevronDown aria-hidden="true" className="size-4" />
            )}
          </span>
        </button>
      </header>

      {isExpanded ? (
        <div id={panelId} className="p-4 sm:p-5">
          {description ? (
            <p className="mb-4 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
          ) : null}
          {children}
        </div>
      ) : null}
    </section>
  );
}
