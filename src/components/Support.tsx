"use client";
import { SUPPORT_LINKS } from "@/constants";
import { Coffee } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  Link,
  List,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import { ShareAppLink } from "./ShareAppLink";

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
        Saved your time?
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">Show your love</DialogTitle>
        <List>
          <ShareAppLink />
          {SUPPORT_LINKS.map((link) => (
            <ListItem key={link.name}>
              <Link href={link.link} target="_blank" rel="noopener noreferrer">
                {link.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
