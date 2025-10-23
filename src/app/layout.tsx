import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Amaranth } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { ClientThemeProvider } from "../components/ClientThemeProvider";
const amaranth = Amaranth({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amaranth",
});

export const metadata: Metadata = {
  title: "The Portions",
  description: "Making post cooking calculations quick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
