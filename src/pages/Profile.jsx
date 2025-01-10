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
import indisponível from '../assets/indisponivel.png';

export const Profile = ({ pokemonData }) => {
  const { name, sprites, moves, id } = pokemonData || {};
  const navigate = useNavigate();
  const [ animation, setAnimation ] = useState(null);

  useEffect(() => {
    if (!pokemonData) {
      navigate("/");
    }
  }, [navigate, pokemonData]);

  if (!pokemonData) return null;

  let nameInfo = null;
  let nameInfo1 = null;

  let respGif = null;

  axios
    .get(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
    )
    .then(() => {setAnimation(true);})
    .catch(() => setAnimation(null));

  if (animation) {
    respGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  }
  else {
    respGif = indisponível;
  }

  if (sprites.front_female) {
    nameInfo = "Versão Feminina";
    nameInfo1 = "Versão Shiny Feminina";
  }

  return (
    <>
      <Navbar hideSearch />
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={5}
            flexDirection="column"
          >
            <Typography variant="h4">{name.toLowerCase().includes(name.toLowerCase())}</Typography>
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
                src={sprites.front_default}
                width={"100%"}
                height={"100%"}
              />
              <Box
                component="img"
                src={sprites.back_default}
                width={"100%"}
                height={"100%"}
              />
              <PokeTable pokemonData={pokemonData} />
            </Box>
            <Box width={"100%"} alignItems={"center"} justifyContent={"center"}>
              <Divider>Variações</Divider>
              <Box display="flex" justifyContent="space-between">
                <Box
                  component="img"
                  src={sprites.front_shiny}
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={sprites.front_female}
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={sprites.front_shiny_female}
                  width={"30%"}
                  height={"30%"}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box
                  component="img"
                  src={sprites.back_shiny}
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={sprites.back_female}
                  width={"30%"}
                  height={"30%"}
                />
                <Box
                  component="img"
                  src={sprites.back_shiny_female}
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
                  <Typography>{nameInfo}</Typography>
                </Box>
                <Box marginRight={"40px"}>
                  <Typography>{nameInfo1}</Typography>
                </Box>
              </Box>
              <Divider>Animação</Divider>
              <Box display="flex" justifyContent={"center"} alignItems={"center"} margin={"30px"}>
                <Box
                  component="img"
                  src={respGif}
                  width={"50%"}
                  height={"50%"}
                />
              </Box>
              <Divider>Habilidades</Divider>
              <Box textAlign={"center"} marginTop="15px">
                {moves.map((moveData, key) => (
                  <Chip
                    key={key}
                    sx={{ margin: "5px" }}
                    label={moveData.move.name}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
