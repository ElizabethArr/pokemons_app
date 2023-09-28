import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Container, Grid, CircularProgress } from "@mui/material";
import { TypeSelect } from "./TypeSelect";
import { NumberSelect } from "./NumberSelect";
import { isTemplateExpression } from "typescript";
import { types } from "util";
import { PokemonCard } from "./PokemonCard";

export interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: any[];
}

export interface ColorType {
  type: string;
  color: string;
}

export const colorTypes: ColorType[] = [
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

function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [originalList, setOriginalList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  

  useEffect(() => {
    fetchPokemonData(10);
  }, []);

  const fetchPokemonByType = async (type: string) => {
    setIsLoading(true); // Iniciar la carga
    const response = await axios.get(" https://pokeapi.co/api/v2/type/" + type);
    console.log("response by types: ", response.data.pokemon);

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
    setIsLoading(false);
  };

  // Función para realizar la consulta a la API de Pokémon
  const fetchPokemonData = async (number: number) => {
    setIsLoading(true);
    console.log("number", number);
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=" + number
      );
      console.log("response:", response);

      const data = response.data.results;

      for (let i = 0; i < data.length; i++) {
        const requestdetail = await axios.get(data[i].url);

        data[i].name = requestdetail.data.name;
        data[i].image =
          requestdetail.data.sprites.other.dream_world.front_default;
        data[i].types = requestdetail.data.types;
      }
      response.data.results.map((result: Pokemon) => console.log("result", result))
      setPokemonList(data);
      setOriginalList(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  function getSelectedType(type: string) {
    console.log("tipo recibido", type);
    if (type === "all") {
      fetchPokemonData(10);
    } else {
      fetchPokemonByType(type);
    }
  }

  function getSelectedNumber(number: number) {
    const slicedPokemonList = originalList.slice(0, number);
    console.log("slicedPokemonList", slicedPokemonList);
    setPokemonList(originalList.slice(0, number));
  }

  function handleDialogClose() {}

  function pokemonFilter(type: string) {
    const filterPokemons = originalList.filter((pokemon: Pokemon) => {
      return pokemon.types.some((item: any) => item.type.name === type);
    });

    console.log("filterPokemons", filterPokemons);
    setPokemonList(filterPokemons);
  }

  return (
    <Container>
      <div style={{ padding: "20px" }}></div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TypeSelect types={colorTypes} onChange={getSelectedType} />
        </Grid>
        <Grid item xs={4}>
          <NumberSelect onChange={getSelectedNumber} />
        </Grid>
      </Grid>
      <br />

      <Grid item xs={12} className="centered-grid">
        {isLoading ? (
          <>
            <Grid item xs={12} className="centered-grid">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <center>
                    <h1> Cargando...</h1>
                  </center>
                </Grid>

                <Grid item xs={12}>
                  <center>
                    <CircularProgress size={80} />
                  </center>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container spacing={3}>
            {pokemonList.map((pokemon, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PokemonCard pokemon={pokemon} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Pokedex;
