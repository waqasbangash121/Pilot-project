"use client";

import Link from "next/link";

type Props = {
  href: string;
  eventName: string;
  className?: string;
  children: React.ReactNode;
};

export default function TrackLink({ href, eventName, className, children }: Props) {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    if (!window.gtag) return;

    window.gtag("event", eventName, {
      event_category: "engagement",
      event_label: href,
      value: 1,
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
