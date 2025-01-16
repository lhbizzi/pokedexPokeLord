import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pokecard from "../components/pokecard";
import { Skeletons } from "../components/Skeletons";
import { PokemonAPI } from "../utils/pokemonApi";
import { formattedName } from "../utils/formatation";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonsData = await PokemonAPI();
        setPokemons(pokemonsData);
        setAllPokemons(pokemonsData);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      }
    };
    fetchData();
  }, []);

  const pokemonFilter = (name) => {
    if (name === "") {
      setPokemons(allPokemons);
    } else {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase()),
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
                    name={formattedName(pokemon.name)}
                    image={pokemon.sprites.front_default}
                    types={pokemon.types}
                    id={pokemon.id}
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
