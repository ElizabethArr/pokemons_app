import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { TypeSelect } from "./TypeSelect";
import { NumberSelect } from "./NumberSelect";



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

  // console.log(ColorTypes[0]);
  // console.log(ColorTypes[5]);

  useEffect(() => {
    // console.log("consultando pokemones...");
    fetchPokemonData();
  }, []);

  // Función para realizar la consulta a la API de Pokémon
  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=60"
      ); // Cambia el límite si lo deseas
      const data = response.data.results;
      // console.log("response:", response);
      // console.log(data.length);
      // console.log("pokemon 2---->", data[2]);
      // console.log(data); // Muestra los resultados en la consola

      for (let i = 0; i < data.length; i++) {
        //console.log("pokemon:", data[i].url);
        const requestdetail = await axios.get(data[i].url);
        // console.log(
        //   "detalle",
        //   requestdetail.data.sprites.other.dream_world.front_default
        // );
        data[i].image =
          requestdetail.data.sprites.other.dream_world.front_default;
        data[i].types = requestdetail.data.types;
      }

      // console.log("nuevo arreglo", data);
      // console.log("pokemon 5",data[4].types[0].type.name);
      // console.log("pokemon 7",data[6]);
      // console.log("pokemon 9",data[8]);

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

  // //crear funcion filter
  // function filter(type: string) {
  //   console.log('filter',type);
  //   console.log('pokemonList', pokemonList);
  //   const filterPokemons = pokemonList.filter((pokemon: Pokemon)) => {
  //     const pokemonType = pokemon.types.find((item: any) => item.type.name === type);
  //     return pokemonType;
  //   };
  //   console.log('filterPokemons',filterPokemons);
  //
  function getSelectedType(type: string) {
    console.log("tipo recibido", type);
    if (type === 'all') {
      setPokemonList(originalList);
    } else {
      pokemonFilter(type);
    }
    // aqui va la funcion de filtrar pokemones de acuerdo a su tipo


    pokemonFilter(type)
  }

  function pokemonFilter(type: string) {
    console.log("filter", type);
    console.log("originalList", originalList);
    // Usaremos filter para encontrar todos los Pokémon que tienen el tipo especificado
    const filterPokemons = originalList.filter((pokemon: Pokemon) => {
      //       // Supongo que la propiedad 'type' de 'pokemon' es un array de tipos
      return pokemon.types.some((item: any) => item.type.name === type);
    });

    console.log("filterPokemons", filterPokemons);
    setPokemonList(filterPokemons);
  
  }

  function SelectedNumber(selectedNumber: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TypeSelect types={colorTypes} onChange={getSelectedType} />
        </Grid>
        <Grid item xs={4}>
        <NumberSelect onChange={ SelectedNumber }/> 
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        {pokemonList.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="card">
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
                  <div>
                    Types:
                    {pokemon.types.map((item, i) => (
                      <div
                        className="type"
                        style={{ background: getColor(item.type.name) }}
                        key={i}
                      >
                        {item.type.name}
                      </div>
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
