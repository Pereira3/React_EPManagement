import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/en-gb";
import { formTypes } from "../../shared/types";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export default function Forms({
  forms,
  value,
  sets,
  setName,
  updt,
}: {
  forms: string;
  value: formTypes;
  sets?: string[];
  setName?: string;
  updt: (val: string) => void;
}) {
  if (forms === "text") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {setName ? <span>{setName}: </span> : null}
        <TextField
          autoFocus
          autoComplete="off"
          required
          margin="normal"
          value={value as string}
          onChange={(e) => updt(e.target.value)}
        />
      </Box>
    );
  }else if (forms === "date") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span>Date: </span>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            value={dayjs(value, "DD-MM-YYYY")}
            onChange={(e) => updt(e!.format("DD-MM-YYYY"))}
            slotProps={{
              textField: { required: false },
            }}
          />
        </LocalizationProvider>
      </Box>
    );
  } else if (forms === "dropdown") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {setName ? <span>{setName}: </span> : null}
        <Select
          autoComplete="false"
          id="set"
          value={value as string}
          onChange={(e) => updt(e.target.value)}
          input={<OutlinedInput />}
        >
          {sets?.map((data) => (
            <MenuItem key={data} value={data}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  } else if (forms === "selector") {
    return (
      <Box sx={{ display: "flex", gap: "15px" }}>
        <span>Role: </span>
        <FormControl>
          <RadioGroup value={value} onChange={(e) => updt(e.target.value)}>
            <FormControlLabel
              value="None"
              control={<Radio />}
              label="(none selected)"
            />
            <FormControlLabel
              value="Junior Engineer"
              control={<Radio />}
              label="Junior Engineer"
            />
            <FormControlLabel
              value="Project Manager"
              control={<Radio />}
              label="Project Manager"
            />
            <FormControlLabel
              value="Senior Engineer"
              control={<Radio />}
              label="Senior Engineer"
            />
            <FormControlLabel
              value="Team Manager"
              control={<Radio />}
              label="Team Manager"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  } else {
    return null;
  }
}
