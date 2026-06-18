"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    window.gtag?.("config", "G-ZC5XNC1VDY", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
