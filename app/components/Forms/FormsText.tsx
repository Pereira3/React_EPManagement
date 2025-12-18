import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormsText({
  type,
  setName,
  value,
  updt,
}: {
  type: string;
  setName?: string;
  value: string | number;
  updt: (val: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (type === "number") {
      const numValue = Number(newValue);
      if (newValue === "" || (numValue >= 0 && numValue <= 100)) {
        updt(newValue);
      }
    } else {
      updt(newValue);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
      {setName ? <span>{setName}: </span> : null}
      <TextField
        autoFocus
        autoComplete="off"
        required
        margin="normal"
        name="name"
        value={value}
        onChange={handleChange}
        type={type}
        {...(type === "number"
          ? {
              inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 0,
                max: 100,
              },
            }
          : {})}
      />
    </Box>
  );
}
