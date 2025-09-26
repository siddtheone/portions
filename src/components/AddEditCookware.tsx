import { Box, Button, TextField } from "@mui/material";
import { MAX_WEIGHT } from "../constants";
import { FormEvent } from "react";

export function AddEditCookware({
  name,
  weight,
  onSubmit,
}: {
  name?: string;
  weight?: number;
  onSubmit: (values: { name: string; weight: number }) => void;
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const weight = +(formData.get("weight") as string);
    onSubmit({
      name: (formData.get("name") as string) || "Container",
      weight: !isNaN(weight) ? weight : 0,
    });
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          minWidth: 250,
        }}
      >
        <TextField fullWidth value={name} name="name" label="Cookware name" />
        <TextField
          fullWidth
          name="weight"
          value={weight}
          label="Cookware weight"
          type="number"
          slotProps={{
            htmlInput: {
              min: 0,
              max: MAX_WEIGHT,
              step: 1,
            },
          }}
        />

        <Button type="submit" fullWidth variant="contained">
          Add
        </Button>
      </Box>
    </form>
  );
}
