import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import PokeTable from "../components/PokeTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import indisponivel from "../assets/indisponivel.png";
import NavigationButtons from "../components/NavigationPokeButton"; // Importação do componente

export const Profile = ({ pokemonData }) => {
  const navigate = useNavigate();
  const [currentPokemon, setCurrentPokemon] = useState(pokemonData); // Estado do Pokémon atual
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (!pokemonData) {
      navigate("/");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adiciona um efeito de rolagem suave
    });
  }, [navigate, pokemonData, currentPokemon]);

  const fetchPokemonById = async (pokemonId) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );
      setCurrentPokemon(response.data);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  };

  const handleNextPokemon = () => {
    if (currentPokemon.id < 1025) {
      fetchPokemonById(currentPokemon.id + 1);
    }
  };

  const handlePreviousPokemon = () => {
    if (currentPokemon.id > 1) {
      fetchPokemonById(currentPokemon.id - 1);
    }
  };

  if (!currentPokemon) return null;

  let respGif = null;

  axios
    .get(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${currentPokemon.id}.gif`,
    )
    .then(() => {
      setAnimation(true);
    })
    .catch(() => setAnimation(null));

  if (animation) {
    respGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${currentPokemon.id}.gif`;
  } else {
    respGif = indisponivel;
  }

  const imgShiny = currentPokemon.sprites.front_shiny || indisponivel;
  const imgFemale = currentPokemon.sprites.front_female || indisponivel;
  const imgFemaleShiny =
    currentPokemon.sprites.front_shiny_female || indisponivel;
  const imgShinyBack = currentPokemon.sprites.back_shiny || indisponivel;
  const imgFemaleBack = currentPokemon.sprites.back_female || indisponivel;
  const imgFemaleShinyBack =
    currentPokemon.sprites.back_shiny_female || indisponivel;

  return (
    <>
      <Navbar hideSearch />
      <NavigationButtons
        currentId={currentPokemon.id}
        maxId={1025}
        onPrevious={handlePreviousPokemon}
        onNext={handleNextPokemon}
        text1="Anterior"
        text2="Próximo"
      />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ marginBottom: "20px" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={5}
            flexDirection="column"
          >
            <Typography variant="h4">
              {currentPokemon.name.charAt(0).toUpperCase() +
                currentPokemon.name.slice(1)}
            </Typography>
            <Box
              display="flex"
              m={5}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              marginBottom="15px"
              sx={{
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Box
                component="img"
                src={currentPokemon.sprites.front_default}
                width={"100%"}
                height={"100%"}
              />
              <Box
                component="img"
                src={currentPokemon.sprites.back_default}
                width={"100%"}
                height={"100%"}
              />
              <PokeTable pokemonData={currentPokemon} />
            </Box>
            <Box width={"100%"} alignItems={"center"} justifyContent={"center"}>
              <Divider>Variações</Divider>
              <Box display="flex" justifyContent="space-between">
                <Box
                  component="img"
                  src={imgShiny}
                  alt="Versão shiny"
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={imgFemale}
                  alt="Versão feminina"
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={imgFemaleShiny}
                  alt="Versão shiny feminina"
                  width={"30%"}
                  height={"30%"}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box
                  component="img"
                  src={imgShinyBack}
                  alt="Versão shiny (traseira)"
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={imgFemaleBack}
                  alt="Versão feminina (traseira)"
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={imgFemaleShinyBack}
                  alt="Versão shiny feminina (traseira)"
                  width={"30%"}
                  height={"30%"}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={"40px"}
                marginLeft={"15px"}
              >
                <Box marginLeft={"40px"}>
                  <Typography>Versão Shiny</Typography>
                </Box>
                <Box marginLeft={"40px"}>
                  <Typography>Versão Feminina</Typography>
                </Box>
                <Box marginRight={"40px"}>
                  <Typography>Versão Shiny Feminina</Typography>
                </Box>
              </Box>
              <Divider>Animação</Divider>
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                margin={"30px"}
              >
                <Box
                  component="img"
                  src={respGif}
                  width={"50%"}
                  height={"50%"}
                />
              </Box>
              <Divider>Habilidades</Divider>
              <Box textAlign={"center"} marginTop="15px">
                {currentPokemon.moves.map((moveData, key) => (
                  <Chip
                    key={key}
                    sx={{ margin: "5px" }}
                    label={moveData.move.name}
                  />
                ))}
              </Box>
              <NavigationButtons
                currentId={currentPokemon.id}
                maxId={1025}
                onPrevious={handlePreviousPokemon}
                onNext={handleNextPokemon}
                text1="<"
                text2=">"
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
