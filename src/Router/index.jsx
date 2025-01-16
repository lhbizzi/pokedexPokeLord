import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import ScrollToTop from "../components/ScrollToTop";

export const Routers = () => {
  const [pokemonData, setPokemonData] = useState();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes style={{ backgrounColor: 'red'}}>
        <Route path="/" element={<Home setPokemonData={setPokemonData} />} />
        <Route
          path="/profile"
          element={<Profile pokemonData={pokemonData} />}
        />
        ;
        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};
