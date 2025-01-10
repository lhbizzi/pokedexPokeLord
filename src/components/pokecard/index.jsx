import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { typeHandler } from "../../utils";

export default function Pokecard({ name, image, types, id, onClick }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: "pointer",
        transition: "transform 0.2s", // Adicionando transição de transformação
        "&:hover": {
          transform: "scale(1.05)", // Aumentando a escala ao passar o mouse
        },
        border: "1px solid Gainsboro", // Definindo a cor da margem
      }}
      onClick={onClick}
    >
      <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "right", marginRight: "15px", marginTop: "5px", }}>
        {id}
      </Typography>
      <CardMedia sx={{ height: 250 }} image={image} title="pokemon image" />
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {typeHandler(types)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
