"use client";

import { Cookware } from "@/components/Cookware";
import { useCookware } from "@/store/useCookware";
import { Notice } from "./Notice";

export function MyPortion() {
  const cookwares = useCookware((state) => state.cookwares);

  return (
    <>
      <Notice />
      {cookwares.map((cookware) => (
        <Cookware key={cookware.id} cookware={cookware} />
      ))}
    </>
  );
}
