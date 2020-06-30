import React from "react";
import { Typography, Container } from "@material-ui/core";

export default function Header() {
  return (
    <Container>
      <Typography variant="h2">{"🐸"}Tera Memes</Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Make Memes at Lightning Speed {"⚡"}
      </Typography>
    </Container>
  );
}
