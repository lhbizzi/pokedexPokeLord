import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pokecard from "../components/pokecard";
import { Skeletons } from "../components/Skeletons";
import pLimit from "p-limit";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]); // Armazena todos os pokémons para filtros
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const limit = pLimit(10); // Limitar para 10 requisições simultâneas
    const endpoints = Array.from(
      { length: 650 },
      (_, i) => `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
    );

    try {
      const results = await Promise.all(
        endpoints.map((endpoint) => limit(() => axios.get(endpoint)))
      );

      const pokemonsData = results.map((res) => res.data);
      setPokemons(pokemonsData);
      setAllPokemons(pokemonsData); // Armazena todos os pokémons para filtros
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
    }
  };

  const pokemonFilter = (name) => {
    if (name === "") {
      setPokemons(allPokemons); // Restaura todos os pokémons
    } else {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      setPokemons(filteredPokemons);
    }
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={2}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box onClick={() => pokemonPickHandler(pokemon)}>
                  <Pokecard
                    name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    image={pokemon.sprites.front_default}
                    types={pokemon.types}
                  />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};
