import { ColorType, Pokemon, colorTypes } from "./MediaCardPoke";
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
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

  
} from "@mui/material";


interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
  

}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));


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

  


  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  

  return (
    <Card className={`card custom-background`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%", // Ensure the Box takes up full height
        }}
      >
        <CardHeader
          title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        />
        <CardMedia
          component="img"
          alt={pokemon.image}
          image={pokemon.image} // Reemplaza esto con la URL de tu imagen
          sx={{ width: "70%", height: 200 }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Number: {index + 1}
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {pokemon.types.map((item, i) => (
              <Stack direction="row" spacing={10}>
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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"></IconButton>
          <IconButton aria-label="share"></IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          ></ExpandMore>
        </CardActions>

      </Box>
    </Card>
  );
};
