"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const theme = createTheme({
    cssVariables: true,
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "var(--font-amaranth), Arial, sans-serif",
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
