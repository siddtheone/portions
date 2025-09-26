"use client";

import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, Fab } from "@mui/material";
import { useState } from "react";

import { Cookware } from "@/types";

import { AddEditCookware } from "./AddEditCookware";
import { useCookware } from "../store/useCookware";
import { trackAction } from "@/lib/analytics";

export function AddCookware() {
  const [open, setOpen] = useState(false);
  const addNewCookware = useCookware((state) => state.addNewCookware);

  const handleSubmit = (params: Pick<Cookware, "name" | "weight">) => {
    setOpen(false);
    addNewCookware(params);
    trackAction("cookware_add");
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<Add />}
        // variant="contained"
      >
        Add Cookware
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add new cookware</DialogTitle>
        <AddEditCookware onSubmit={handleSubmit} />
      </Dialog>
    </>
  );
}
