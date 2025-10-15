import type { MetadataRoute } from "next";
import { APP_DESCRIPTION } from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Portions",
    short_name: "The Portions",
    description: APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
