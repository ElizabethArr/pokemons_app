import React from "react";
import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import "./Modal.css";

interface NumberSelectProps {
  onChange: (selectedNumber: number) => void;
}
export const NumberSelect = ({ onChange }: NumberSelectProps) => {
  const [selectedNumber, setSelectedNumber] = useState(10);

  const numberList: number[] = [10, 30, 50, 100, 200];

  const handleChange = (event: any) => {
    const selectedNumber = event.target.value;
    setSelectedNumber(selectedNumber);
    onChange(selectedNumber);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth style={{ backgroundColor: "#eeeeee" }}>
        <InputLabel id="number" style={{ fontSize: "18px", color: "black" }}>
          Show Pokemons
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedNumber}
          label="number"
          onChange={handleChange}
        >
          {numberList.map((number, index) => (
            <MenuItem key={index} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
