import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Amaranth } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { ClientThemeProvider } from "../components/ClientThemeProvider";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/analytics";

const amaranth = Amaranth({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amaranth",
});

export const metadata: Metadata = {
  title: "Portions",
  description: "Making post cooking calculations quick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              debug_mode: ${
                process.env.NODE_ENV === "development" ? "true" : "false"
              },
              page_title: "Portions",
              page_location: window.location.href,
            });
          }
        `}
      </Script>
      <body className={amaranth.variable}>
        <AppRouterCacheProvider>
          <ClientThemeProvider>
            <CssBaseline />
            {children}
          </ClientThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
