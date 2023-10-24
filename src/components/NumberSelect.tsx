import React from "react";
import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import "./Modal.css";
import { Stack, Chip } from "@mui/material";

interface NumberSelectProps {
  onChange: (selectedNumber: number) => void; // Tipo explícito para "onChange"
}
export const NumberSelect = ({ onChange }: NumberSelectProps) => {
  const [selectedNumber, setSelectedNumber] = useState(10);

  const numberList: number[] = [10, 30, 50, 100, 200];
  //   console.log("numberList",numberList);

  const handleChange = (event: any) => {
    const selectedNumber = event.target.value;
    setSelectedNumber(selectedNumber);
    onChange(selectedNumber); // Llamar a la función onChange del padre con el valor seleccionado
  };

  return (
    <Box>
      <button >
      <FormControl
        variant="standard"
        sx={{
          m: 0.0,
          minWidth: 310,
          borderRadius: "15px",
        }}
      >
        <InputLabel
          id="number"
          style={{ fontSize: "18px", color: "black", textAlign: "center" }}
        >
          Show Pokemons
        </InputLabel>
        <Select value={selectedNumber} onChange={handleChange}>
          {numberList.map((number, index) => (
            <MenuItem key={index} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </button>
    </Box>
  );
};
