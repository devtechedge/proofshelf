import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ProofShelf",
    short_name: "ProofShelf",
    description: "A playable supplement evidence literacy game with 100 sourced claim cards.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ff",
    theme_color: "#17132b",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
