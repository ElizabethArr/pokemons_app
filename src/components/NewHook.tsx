import { useState, useEffect } from "react";

const NewHook = (initialValue: number) => {
  const [customState, setCustomState] = useState(initialValue);

  useEffect(() => {
    console.log("El estado personalizado se ha actualizado:", customState);
  }, [customState]);

  return [customState, setCustomState];
};

export default NewHook;
