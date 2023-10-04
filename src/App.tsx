// import { Counter } from './components/Counter';
// import Frutas from './components/Frutas';
// import { MediaCard } from './components/MediaCard';
import MediaCardPoke from "./components/MediaCardPoke";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import { Usuario } from  './components/Usuario';

function App() {
  return (
    <>
      <div>
       <center>
          <Typography variant="h5" gutterBottom>
          <img  src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" width="300" height="90"/>
         
           </Typography>
           </center>

        
        <hr />

        {/* <Counter /> */}

        {/* <Usuario /> */}

        {/* <MediaCard /> */}

        <MediaCardPoke />

        {/* <Frutas /> */}
      </div>
    </>
  );
}

export default App;
