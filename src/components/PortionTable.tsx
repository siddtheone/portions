import { Cookware } from "@/types";
import {
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
} from "@mui/material";

export function PortionTable({ cookware }: { cookware: Cookware }) {
  const { name, servingCount, weight, weightWithMeal } = cookware;
  if (weightWithMeal <= weight) {
    return null;
  }

  return (
    <TableContainer>
      <Table aria-label={`Portion table for ${name}`}>
        <TableHead>
          <TableRow>
            <TableCell>Portion</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: servingCount }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                For {i + 1} serving{i === 0 ? "" : "s"}
              </TableCell>
              <TableCell>
                {(((i + 1) / servingCount) * (weightWithMeal - weight)).toFixed(
                  2
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
