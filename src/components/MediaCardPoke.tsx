import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import { TypeSelect } from "./TypeSelect";
import { NumberSelect } from "./NumberSelect";
import { PokemonCard } from "./PokemonCard";
import SkeletonLoading from "./SkeletonLoading";
import CustomState from "./CustomState";

export interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: any[];
  abilities: any[];
  stats: any[];
  held_items: any[];
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
  const [customState, setCustomState] = useState(10);

  useEffect(() => {
    fetchPokemonData(parseInt(customState.toString(), 10));
  }, [customState]);

  const fetchPokemonByType = async (type: string) => {
    setIsLoading(true);
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = response.data.pokemon;

    const updatedData = await Promise.all(
      data.map(async (item: any) => {
        const requestdetail = await axios.get(item.pokemon.url);

        return {
          ...item,
          name: requestdetail.data.name,
          image: requestdetail.data.sprites.other.dream_world.front_default,
          types: requestdetail.data.types,
          abilities: requestdetail.data.abilities,
          stats: requestdetail.data.stats,
          held_items: requestdetail.data.id,
        };
      })
    );

    // for (let i = 0; i < data.length; i++) {
    //   const requestdetail = await axios.get(data[i].pokemon.url);

    //   data[i].name = requestdetail.data.name;
    //   data[i].image =
    //     requestdetail.data.sprites.other.dream_world.front_default;
    //   data[i].types = requestdetail.data.types;
    //   data[i].abilities = requestdetail.data.abilities;
    //   data[i].stats = requestdetail.data.stats;
    //   data[i].held_items = requestdetail.data.id;
    // }
    setPokemonList(updatedData);
    setOriginalList(updatedData);
    setIsLoading(false);
  };

  const fetchPokemonData = async (number: number) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${number}`
      );
      const data = response.data.results;

      // for (let i = 0; i < data.length; i++) {
      //   const requestdetail = await axios.get(data[i].url);

      //   data[i].name = requestdetail.data.name;
      //   data[i].image =
      //     requestdetail.data.sprites.other.dream_world.front_default;
      //   data[i].types = requestdetail.data.types;
      //   data[i].abilities = requestdetail.data.abilities;
      //   data[i].stats = requestdetail.data.stats;
      //   data[i].held_items = requestdetail.data.id;
      // }
      const updatedData = await Promise.all(
        data.map(async (item: any) => {
          const requestdetail = await axios.get(item.url);

          return {
            ...item,
            name: requestdetail.data.name,
            image: requestdetail.data.sprites.other.dream_world.front_default,
            types: requestdetail.data.types,
            abilities: requestdetail.data.abilities,
            stats: requestdetail.data.stats,
            held_items: requestdetail.data.id,
          };
        })
      );

      setPokemonList(updatedData);
      setOriginalList(updatedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  function getSelectedType(type: string) {
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

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" className="sel">
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
          <SkeletonLoading />
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
