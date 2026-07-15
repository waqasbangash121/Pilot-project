import { getFooterSocialRouteItemsWithFallback } from "@/lib/footer-social-settings";

import { SiteFooterClient } from "./site-footer-client";

export async function SiteFooter() {
  const socialLinks = await getFooterSocialRouteItemsWithFallback();

  return <SiteFooterClient socialLinks={socialLinks} />;
}