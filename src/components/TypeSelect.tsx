import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { ColorType } from "./MediaCardPoke";

interface TypeSelectProps {
  types: ColorType[]; // Tipo explícito para "types"
  onChange: (selectedType: string) => void; // Tipo explícito para "onChange"
}

export const TypeSelect = ({ types, onChange }: TypeSelectProps) => {
  const [selectedType, setSelectedType] = useState("all");

  const handleChange = (event: any) => {
    const selectedType = event.target.value;
    console.log("SelecType", selectedType);
    setSelectedType(selectedType);
    onChange(selectedType); // Llamar a la función onChange del padre con el valor seleccionado
  };

  return (
    <Box>
      <FormControl
        variant="standard"
        sx={{
          m: 1.5,
          minWidth: 310,
          backgroundColor: "#008B8B",
          borderRadius: "10px",
        }}
      >
        <InputLabel
          id="type"
          style={{ fontSize: "20px", color: "black", textAlign: "center" }}
        >
          Type
        </InputLabel>
        <Select value={selectedType} onChange={handleChange}>
          {types.map((type, index) => (
            <MenuItem key={index} value={type.type}>
              {type.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
