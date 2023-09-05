import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}
function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    console.log("consultando pokemones...");
    // Función para realizar la consulta a la API de Pokémon
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        ); // Cambia el límite si lo deseas
        const data = response.data.results;
        console.log("response:", response);
        console.log(data.length);
        console.log("pokemon 2---->", data[2]);
        console.log(data); // Muestra los resultados en la consola

        for (let i = 0; i < data.length; i++) {
          console.log("pokemon:", data[i].url);
          const requestdetail = await axios.get(data[i].url);
          console.log("detalle", requestdetail.data.sprites.back_shiny);
          data[i].image = requestdetail.data.sprites.back_shiny;
        }
        console.log("nuevo arreglo", data );
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
            <Card>
              <CardHeader title={pokemon.name} />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Número: {index + 1}
                </Typography>
                image:{pokemon.image}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Pokedex;
