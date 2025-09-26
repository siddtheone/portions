"use client";
import { Coffee } from "@mui/icons-material";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

export function Support() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="appreciate-this"
        endIcon={<Coffee />}
        sx={{ color: "white" }}
        onClick={() => setOpen(true)}
      >
        Appreciate this?
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">Show your love</DialogTitle>
        <Box
          sx={{
            maxWidth: 300,
            height: 300,
            p: 4,
          }}
        >
          <img src="./qr.png" alt="upi qr" width="100%" />
        </Box>
      </Dialog>
    </>
  );
}
