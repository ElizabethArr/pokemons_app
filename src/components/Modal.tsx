import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CardMedia from "@mui/material/CardMedia";

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
  image: string;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export default function MyModal({ pokemon }: { pokemon: Pokemon }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="data">
      <Button onClick={handleOpen}>
        <button className="boton ">Mas Detalle</button>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
        <Box
          sx={{
            ...style,
            textAlign: "left",
            marginTop: "0.4%",
            width: "350px",
            height: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'space-between',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              style={{ fontSize: "20px", margin: 0, lineHeight: 1, 
              padding: 0, }}
             >
              <h3>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
              
            </Typography>
             
            <CardMedia
                component="img"
                alt={pokemon.image}
                image={pokemon.image}
                sx={{  width: "20%", // Establece el ancho deseado
                height: "20%", // Establece la altura deseada
                margin: 0,
                padding: 0
                
                 }}
                
              />
            <Button onClick={handleClose} style={{ marginBottom: 0 }}>
              <CloseIcon style={{ fontSize: "20px" }} />
            </Button>
          </div>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 className="titulo-seccion" style={{ margin: 0 }}>
              {" "}
              Habilidades:
            </h3>
            {pokemon.abilities.map((item, i) => (
              <span className="tag" key={i}>
                {item.ability.name}
              </span>
            ))}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 className="titulo-seccion" style={{ margin: 0 }}>
              Estadisticas:
            </h3>

            <div
              className="stats"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TableBody
                className="table"
                style={{ width: "68%", backgroundColor: "#DCDCDC" }}
              >
                {pokemon.stats.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell
                      style={{
                        width: "50%",
                        fontSize: "12px",
                        borderBottom: "2px solid white",
                      }}
                    >
                      {item.stat.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        width: "50%",
                        fontSize: "12px",
                        borderBottom: "2px solid white",
                      }}
                    >
                      {item.base_stat}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>

            {/* <div className="stats">
              {pokemon.stats.map((item, i) => (
                <section>
                  <span key={i}>{item.stat.name}</span>
                  <span className="puntos">{item.base_stat}</span>
                </section>
              ))}
            </div>  */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
