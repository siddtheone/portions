"use client";

import { Cookware } from "@/components/Cookware";
import { useCookware } from "@/store/useCookware";
import { Box } from "@mui/material";

export function MyPortion() {
  const cookwares = useCookware((state) => state.cookwares);

  return (
    <>
      {cookwares.map((cookware) => (
        <Cookware key={cookware.id} cookware={cookware} />
      ))}
      {cookwares.length === 0 && (
        <Box sx={{ textAlign: "center" }}>Start by adding cookwares</Box>
      )}
    </>
  );
}
