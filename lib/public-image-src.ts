export function publicImageSrc(src: string | null | undefined): string {
  const value = src?.trim();

  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/") || value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }

  return `/${value.replace(/^\.\//, "")}`;
}