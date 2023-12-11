// useCustomHook.js
import { useState, useEffect } from 'react';

const NewHook = (initialValue:any) => {
  const [customState, setCustomState] = useState(parseInt(initialValue));

  useEffect(() => {
    
    console.log('El estado personalizado se ha actualizado:', customState);
    
  }, [customState]);

  return [customState, setCustomState];
};

export default NewHook;
