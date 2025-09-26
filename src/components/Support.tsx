import { COFFEE_PAGE } from "@/constants";
import { Coffee } from "@mui/icons-material";
import { Button } from "@mui/material";

export function Support() {
  return (
    <Button
      aria-label="buy me coffee"
      href={COFFEE_PAGE}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<Coffee />}
      sx={{ color: "white" }}
    >
      Appreciate this?
    </Button>
  );
}
