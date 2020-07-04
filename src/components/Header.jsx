import React from "react";
import { Link } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <Typography variant="h2">{"🐸"}Tera Memes</Typography>
      </Link>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Make Memes at Lightning Speed {"⚡"}
      </Typography>
    </Container>
  );
}
