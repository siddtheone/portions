"use client";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  IconButton,
  Collapse,
} from "@mui/material";

import { NumericFormat } from "react-number-format";
import { ExpandLess, ExpandMore, RiceBowl } from "@mui/icons-material";
import { Cookware as CookwareType } from "@/types";
import { MAX_WEIGHT, SERVINGS } from "../constants";
import { useCookware } from "../store/useCookware";
import { DeleteCookware } from "./DeleteCookware";
import { PortionTable } from "./PortionTable";

export function Cookware({ cookware }: { cookware: CookwareType }) {
  const { id, name, servingCount, weight, weightWithMeal, expanded } = cookware;
  const updateCookware = useCookware((state) => state.updateCookware);
  const onUpdate = (changed: Partial<CookwareType>) => {
    updateCookware(id, changed);
  };
  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardHeader
        action={
          <>
            <DeleteCookware id={id} />
            <IconButton>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </>
        }
        title={
          <>
            <Typography variant="h5" component="span">
              {name}{" "}
            </Typography>
            <Typography variant="body1" color="info" component="span">
              {weight}
            </Typography>
          </>
        }
        onClick={() => onUpdate({ expanded: !expanded })}
      />
      <Collapse in={expanded}>
        <CardContent>
          <NumericFormat
            value={weightWithMeal}
            customInput={TextField}
            label="Weight with meal"
            onValueChange={({ floatValue }) =>
              onUpdate({ weightWithMeal: floatValue ? floatValue : 0 })
            }
            isAllowed={({ floatValue }) => {
              if (!floatValue) return true;
              return floatValue < MAX_WEIGHT;
            }}
            margin="normal"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <RiceBowl />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl fullWidth>
            <FormLabel id="serving_count">Serving Count</FormLabel>
            <RadioGroup
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
              aria-labelledby="serving_count"
              name="serving_count"
              onChange={(e) => onUpdate({ servingCount: +e.target.value })}
              value={servingCount}
            >
              {SERVINGS.map((serving) => (
                <FormControlLabel
                  key={serving}
                  value={serving}
                  control={<Radio />}
                  label={serving}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <PortionTable cookware={cookware} />
      </Collapse>
    </Card>
  );
}
