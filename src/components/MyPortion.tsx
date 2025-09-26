"use client";

import { Cookware } from "@/components/Cookware";
import { useCookware } from "@/store/useCookware";

export function MyPortion() {
  const cookwares = useCookware((state) => state.cookwares);

  return (
    <>
      {cookwares.map((cookware) => (
        <Cookware key={cookware.id} cookware={cookware} />
      ))}
    </>
  );
}
