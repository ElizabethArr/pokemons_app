import './styles.css'; 
import CardMedia from "@mui/material/CardMedia";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { types } from 'util';

interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: any[];
}
function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    console.log("consultando pokemones...");
    // Función para realizar la consulta a la API de Pokémon
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        ); // Cambia el límite si lo deseas
        const data = response.data.results;
        console.log("response:", response);
        console.log(data.length);
        console.log("pokemon 2---->", data[2]);
        console.log(data); // Muestra los resultados en la consola

        for (let i = 0; i < data.length; i++) {
          console.log("pokemon:", data[i].url);
          const requestdetail = await axios.get(data[i].url);
          console.log("detalle", requestdetail.data.sprites.other.dream_world.front_default);
          data[i].image = requestdetail.data.sprites.other.dream_world.front_default; 
          data[i].types = requestdetail.data.types;
             
        }
        console.log("nuevo arreglo", data);
        console.log("pokemon 5",data[4].types[0].type.name);
        console.log("pokemon 7",data[6]);
        console.log("pokemon 9",data[8]);
        setPokemonList(data);
      } catch (error) {
        console.error("Error al consultar los Pokémones:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <Container>
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
                    Número: {index + 1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Types: {pokemon.types[0].type.name}
                  </Typography>
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
