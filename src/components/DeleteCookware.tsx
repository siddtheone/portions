import { useCookware } from "@/store/useCookware";
import { Cookware } from "@/types";
import { Delete } from "@mui/icons-material";
import { IconButton, Typography, Popover, Button } from "@mui/material";
import React, { useState } from "react";

export function DeleteCookware({ id }: Pick<Cookware, "id">) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const deleteCookware = useCookware((state) => state.deleteCookware);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleDelete = () => {
    deleteCookware(id);
  };

  return (
    <>
      <IconButton aria-label="delete-cookware" onClick={handleClick}>
        <Delete />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Confirm
          </Button>
        </Typography>
      </Popover>
    </>
  );
}
