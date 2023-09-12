import React from 'react';
import  { useState } from "react";

interface NumberSelectProps {
        onChange: (selectedNumber: number) => void; // Tipo explícito para "onChange"
  }
  
  export const NumberSelect =  ({ onChange }: NumberSelectProps) => {
    const [selectedNumber, setSelectedNumber] = useState("");
    
    const handleChange = (event: any) => {
        const selectedNumber = event.target.vale;
    console.log("SelecNumber", selectedNumber);
    setSelectedNumber(selectedNumber);
    onChange(selectedNumber); // Llamar a la función onChange del padre con el valor seleccionado
  };

 
 return(
    <h1> hola soy NumberSelect </h1>
 )
  }