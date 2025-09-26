import { Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { AddCookware } from "./AddCookware";
import { Support } from "./Support";

export function AppBar() {
  return (
    <MuiAppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <AddCookware />
        <Support />
      </Toolbar>
    </MuiAppBar>
  );
}
