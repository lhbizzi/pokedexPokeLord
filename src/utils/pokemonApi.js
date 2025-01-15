// src/components/PokemonAPI.js
import axios from "axios";

export const PokemonAPI = async () => {
  const endpoints = Array.from(
    { length: 1025 },
    (_, i) => `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
  );

  try {
    const results = await Promise.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );

    const pokemonsData = results.map((res) => res.data);
    return pokemonsData;
  } catch (error) {
    console.error("Erro ao buscar pokémons:", error);
    throw error;
  }
};
