import React from "react";
import { Box, Button } from "@mui/material";

const NavigationButtons = ({ currentId, onPrevious, onNext, text1, text2 }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop="20px"
      marginLeft="20px"
      marginRight="20px"
    >
      {/* Renderiza o botão "Anterior" apenas se o ID atual for maior que 1 */}
      {currentId > 1 && (
        <Button variant="text" color="primary" onClick={onPrevious}>
          {text1} ({currentId - 1})
        </Button>
      )}

      {/* Garantir que o botão "Próximo" esteja sempre alinhado corretamente */}
      <Box flex="1" />

      {currentId < 1025 && (
        <Button variant="text" color="primary" onClick={onNext}>
          {text2} ({currentId + 1})
        </Button>
      )}
    </Box>
  );
};

export default NavigationButtons;
