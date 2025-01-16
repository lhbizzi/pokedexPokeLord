export const typeHandler = (types) => {
  if (types[1]) {
    return types[0].type.name + " | " + types[1].type.name;
  } else {
    return types[0].type.name;
  }
};

export const formattedName = (pokemonName) => {
  if (pokemonName.includes("-")) {
    return pokemonName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra de cada palavra
      .join(" ");
  }
  return (
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase()
  );
};
