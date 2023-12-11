// useCustomHook.js
import { useState, useEffect } from 'react';

const useCustomHook = (initialValue:any) => {
  const [customState, setCustomState] = useState(initialValue);

  useEffect(() => {
    // Lógica personalizada aquí
    console.log('El estado personalizado se ha actualizado:', customState);
    // Puedes realizar cualquier acción adicional aquí
  }, [customState]);

  return [customState, setCustomState];
};

export default useCustomHook;
