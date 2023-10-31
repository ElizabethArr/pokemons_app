import "./styles.css";
import { ColorType, Pokemon, colorTypes } from "./MediaCardPoke";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import {
  Stack,
  Chip,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
  CardActions,
  Divider,
} from "@mui/material";
import MyModal from "./Modal";

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
}


export const PokemonCard = ({ pokemon, index }: PokemonCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const getColor = (type: string) => {
    const colorType = colorTypes.find((item) => item.type === type);
    if (colorType) {
      return colorType.color;
    } else {
      return "#808080";
    }
  };

  const getColorText = (type: string) => {
    if (type === "electric" || type === "ice") {
      return "black";
    } else {
      return "white";
    }
  };

  return (
    <Card className={`card custom-background`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <Typography color="black" marginTop={2} style={{ fontSize: "15px" }}>
          <span
            className="botonn"
            style={{
              position: "absolute", //
              top: 5, // Ajustar la posición superior según sea necesario
              right: 5, // Ajustar la posición derecha según sea necesario
            }}
          >
            # {pokemon.held_items}
          </span>
        </Typography>

        {/* <CardHeader
        // title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        
        /> */}
        <CardMedia
          component="img"
          alt={pokemon.image}
          image={pokemon.image}
          sx={{ width: "70%", height: 200, margin: "0 auto" }}
        />
        <CardContent>
          <Typography
            variant="h5"
            color="black"
            style={{ textAlign: "center" }}
          >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {pokemon.types.map((item, i) => (
              <Stack direction="row" spacing={10} key={i}>
                <Chip
                  label={
                    item.type.name.charAt(0).toUpperCase() +
                    item.type.name.slice(1)
                  }
                  variant="outlined"
                  style={{
                    color: getColorText(item.type.name),
                    background: getColor(item.type.name),
                    margin: "5px", // Añade un margen para separar los Chips
                    flexBasis: "calc(50% - 10px)", // Divide en dos columnas con margen
                  }}
                />
              </Stack>
            ))}
          </div>
        </CardContent>
        <MyModal pokemon={pokemon} />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"></IconButton>
          <IconButton aria-label="share"></IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ textAlign: "center" }}>
              Habilidades:
              {pokemon.abilities.map((item, i) => (
                <span key={i}> {item.ability.name},</span>
              ))}
            </Typography>

            <Typography paragraph style={{ textAlign: "center" }}>
              Estadisticas:
              {pokemon.stats.map((item, i) => (
                <span key={i}>
                  {" "}
                  {item.stat.name}:{item.base_stat}
                </span>
              ))}
            </Typography>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
};
