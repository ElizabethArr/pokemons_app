import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Modal.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Pokemon {
  name: string;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export default function MyModal({ pokemon }: { pokemon: Pokemon }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="data" >
      <Button onClick={handleOpen} > 
     
      
      <img  width="30" height="26" src="https://img.icons8.com/metro/26/more.png" alt="more"/>
      </Button>
      <Modal 
     
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <center>
              <h2 className="titulo">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <center>
              <h3 className="titulo-seccion"> Habilidades:</h3>
              {pokemon.abilities.map((item, i) => (
                <span className="tag" key={i}>
                  {" "}
                  {item.ability.name}
                </span>
              ))}
            </center>
          </Typography>
          <Typography paragraph>
            <center>
              <h3 className="titulo-seccion">Estadisticas:</h3>
            </center>
            <div className="stats">
              {pokemon.stats.map((item, i) => (
                <section>
                  <span key={i}>{item.stat.name}</span>
                  <span className="puntos">{item.base_stat}</span>
                </section>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
