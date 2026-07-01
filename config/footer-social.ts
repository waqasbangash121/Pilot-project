export const footerSocialChannels = [
  {
    id: "facebook",
    label: "Facebook",
    description: "Follow Hyper on Facebook",
    placeholder: "https://facebook.com/hyper",
    defaultHref: "",
    defaultEnabled: false,
  },
  {
    id: "twitter",
    label: "Twitter",
    description: "Follow Hyper on Twitter",
    placeholder: "https://x.com/hyper",
    defaultHref: "https://x.com",
    defaultEnabled: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Follow Hyper on Instagram",
    placeholder: "https://instagram.com/hyper",
    defaultHref: "",
    defaultEnabled: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Connect with Hyper on LinkedIn",
    placeholder: "https://linkedin.com/company/hyper",
    defaultHref: "https://linkedin.com",
    defaultEnabled: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    description: "Follow Hyper on TikTok",
    placeholder: "https://tiktok.com/@hyper",
    defaultHref: "",
    defaultEnabled: false,
  },
] as const;

export type FooterSocialChannel = (typeof footerSocialChannels)[number];
export type FooterSocialChannelId = FooterSocialChannel["id"];

export type FooterSocialLink = {
  channel: FooterSocialChannelId;
  label: string;
  href: string;
  enabled: boolean;
};

export type FooterSocialSettingsSummary = {
  links: FooterSocialLink[];
  updatedAt: string | null;
};

export const defaultFooterSocialLinks: FooterSocialLink[] = footerSocialChannels.map((channel) => ({
  channel: channel.id,
  label: channel.label,
  href: channel.defaultHref,
  enabled: channel.defaultEnabled,
}));
