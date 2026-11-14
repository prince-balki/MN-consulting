import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../data/fallback";

interface SeoOptions {
  title?: string;
  description?: string;
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
}

const DEFAULT_TITLE = "MN Consulting Engineering — Bureau d’études à Brazzaville";
const DEFAULT_DESCRIPTION =
  "Cabinet d'ingénierie civile à Brazzaville : études techniques, maîtrise d'œuvre, contrôle qualité et gestion de projets en République du Congo.";
const DEFAULT_IMAGE = "/og-image.png";

function setMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function removeMeta(name: string, attribute: "name" | "property" = "name") {
  document
    .querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
    ?.remove();
}

function setLink(rel: string, href: string) {
  let tag = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function absoluteUrl(value: string) {
  if (/^https?:\/\//.test(value)) return value;
  return `${SITE.url}${value.startsWith("/") ? value : `/${value}`}`;
}

export function useSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  noindex,
  image = DEFAULT_IMAGE,
  type = "website",
}: SeoOptions = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | MN Consulting Engineering` : DEFAULT_TITLE;
    const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const canonical = `${SITE.url}${cleanPath}`;
    const imageUrl = absoluteUrl(image);
    const isDefaultImage = imageUrl === absoluteUrl(DEFAULT_IMAGE);

    document.title = pageTitle;
    setMeta("description", description);
    setMeta("author", SITE.legalName);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");

    setMeta("og:type", type, "property");
    setMeta("og:site_name", SITE.name, "property");
    setMeta("og:locale", "fr_CG", "property");
    setMeta("og:title", pageTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:image", imageUrl, "property");
    setMeta("og:image:alt", pageTitle, "property");

    if (isDefaultImage) {
      setMeta("og:image:width", "1200", "property");
      setMeta("og:image:height", "630", "property");
    } else {
      removeMeta("og:image:width", "property");
      removeMeta("og:image:height", "property");
    }

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);
    setMeta("twitter:image:alt", pageTitle);

    setLink("canonical", canonical);
  }, [title, description, noindex, image, type, pathname]);
}
