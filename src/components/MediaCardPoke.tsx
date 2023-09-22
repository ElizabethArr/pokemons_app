import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { TypeSelect } from "./TypeSelect";
import { NumberSelect } from "./NumberSelect";
import { isTemplateExpression } from "typescript";
import { types } from "util";
// import Modal from "./Modal";

interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: any[];
}

export interface ColorType {
  type: string;
  color: string;
}

export interface pokemon {
  type: string;
  color: string;
}

function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [originalList, setOriginalList] = useState<Pokemon[]>([]);

  // hacer el arreglo

  const colorTypes: ColorType[] = [
    { type: "all", color: "" },
    { type: "normal", color: "#a46083" },
    { type: "fighting", color: "#ec8255" },
    { type: "flying", color: "#599b9b" },
    { type: "poison", color: "#9666c7" },
    { type: "ground", color: "#b88047" },
    { type: "rock", color: "#7c4d1d" },
    { type: "bug", color: "#135313" },
    { type: "ghost", color: "#4a4a8c" },
    { type: "steel", color: "#04e7ae" },
    { type: "fire", color: "#cc0000" },
    { type: "water", color: "#4daeef" },
    { type: "grass", color: "#2cc92c" },
    { type: "electric", color: "#ffff52" },
    { type: "psychic", color: "#ea348f" },
    { type: "ice", color: "#c8f9f9" },
    { type: "dragon", color: "#44caca" },
    { type: "dark", color: "#57616b" },
    { type: "fairy", color: "#c11069" },
    { type: "shadow", color: "#8f45d9" },
  ];

  useEffect(() => {
    fetchPokemonData(10);
  }, []);

  const fetchPokemonByType = async (type: string) => {
    const response = await axios.get(
      " https://pokeapi.co/api/v2/type/" + type
    );
    console.log('response by types: ', response.data.pokemon);

    const data = response.data.pokemon;


      for (let i = 0; i < data.length; i++) {
        //console.log("pokemon:", data[i].url);
        const requestdetail = await axios.get(data[i].pokemon.url);

        data[i].name = requestdetail.data.name; 
        data[i].image =
          requestdetail.data.sprites.other.dream_world.front_default;
        data[i].types = requestdetail.data.types;
      }

      setPokemonList(data);
      setOriginalList(data);

    
  }
  
  // Función para realizar la consulta a la API de Pokémon
  const fetchPokemonData = async (number: number) => {
    console.log("number", number);
    try {
      const response = await axios.get( 
        "https://pokeapi.co/api/v2/pokemon?limit=" + number  
      );
      console.log("response:",response); 
       

      const data = response.data.results;


      for (let i = 0; i < data.length; i++) {
        //console.log("pokemon:", data[i].url);
        const requestdetail = await axios.get(data[i].url);
        
        data[i].name = requestdetail.data.name;
        data[i].image =
          requestdetail.data.sprites.other.dream_world.front_default;
        data[i].types = requestdetail.data.types;
      }

      setPokemonList(data);
      setOriginalList(data);

    } catch (error) {
      console.error("Error al consultar los Pokémones:", error);
    }
  };
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

  function getSelectedType(type: string) {
    console.log("tipo recibido", type);
    if (type === "all") {
      setPokemonList(originalList.slice(0,10-1));
    } else {
      // pokemonFilter(type);
      fetchPokemonByType(type);
    }
  }

  function getSelectedNumber(number: number) {
    // console.log("numero recibido", number);

    // fetchPokemonData(number);
    // console.log("number");
    const slicedPokemonList = originalList.slice(0,number);
    console.log("slicedPokemonList",slicedPokemonList)
    setPokemonList(originalList.slice(0,number))
  }

  function handleDialogClose() {
    // console.log("numero recibido", number);
  }

  function pokemonFilter(type: string) {
    const filterPokemons = originalList.filter((pokemon: Pokemon) => {
      //       // Supongo que la propiedad 'type' de 'pokemon' es un array de tipos
      return pokemon.types.some((item: any) => item.type.name === type);
    });

    console.log("filterPokemons", filterPokemons);
    setPokemonList(filterPokemons);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TypeSelect types={colorTypes} onChange={getSelectedType} />
        </Grid>
        <Grid item xs={4}>
          <NumberSelect onChange={getSelectedNumber} />
        </Grid>
        <Grid item xs={4}>
          {/* <Modal/> */}
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        {pokemonList.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                <CardHeader title={pokemon.name} />
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
                          label={item.type.name}
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
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Pokedex;
