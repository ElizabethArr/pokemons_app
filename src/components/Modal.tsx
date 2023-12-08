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
import { Grid } from "@mui/material";

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
  right: 2,
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
        <button className="boton ">More Detail</button>
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
            marginTop: "0.2%",
            width: "300px",
            height: "510px",
          }}
        >
          <Grid item xs={12}>
            <Button
              onClick={handleClose}
              style={{
                marginBottom: 3,
                position: "absolute",
                top: 12,
                right: 6,
              }}
            >
              <CloseIcon style={{ fontSize: "25px", color: "black" }} />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              style={{
                fontSize: "20px",
                margin: 0,
                lineHeight: 1,
                padding: 0,
              }}
            >
              <h2>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h3 className="titulo-seccion" style={{ margin: 0 }}>
                Skills:
              </h3>
              {pokemon.abilities.map((item, i) => (
                <span className="tag" key={i}>
                  {item.ability.name.charAt(0).toUpperCase() +
                    item.ability.name.slice(1)}
                </span>
              ))}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h3 className="titulo-seccion" style={{ margin: 0 }}>
                Stats:
              </h3>

              <Grid
                item
                xs={12}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <TableBody
                  className="table"
                  style={{ width: "100%", backgroundColor: "#DCDCDC" }}
                >
                  {pokemon.stats.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          borderBottom: "2px solid white",
                        }}
                      >
                        {item.stat.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          width: "2%",
                          fontSize: "12px",
                          borderBottom: "2px solid white",
                        }}
                      >
                        {item.base_stat}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Grid>
            </Typography>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
