import { Container } from "@mui/material";
import { MyPortion } from "../components/MyPortion";
import { AppBar } from "@/components/AppBar";

export const dynamic = "force-static";

export default function Root() {
  return (
    <>
      <AppBar />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <MyPortion />
      </Container>
    </>
  );
}
