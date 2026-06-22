"use client";

import React from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type TrackLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  eventName: string;
};

const TrackLink = React.forwardRef<HTMLAnchorElement, TrackLinkProps>(
  ({ eventName, href, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      trackEvent(eventName, {
        event_label: String(href),
        value: 1,
      });

      onClick?.(e);
    };

    return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
  },
);

TrackLink.displayName = "TrackLink";

export default TrackLink;
