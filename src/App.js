import React, { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Create } from "@material-ui/icons";
import MasonryList from "./components/MasonaryGrid";

function App() {
  const [completeMemeList, setCompleteMemeList] = useState([]);
  const [displayMemeList, setDisplayMemeList] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setCompleteMemeList(data.data.memes);
        setDisplayMemeList(data.data.memes);
      });
  }, []);

  const searchMemes = (e) => {
    let query = e.target.value;
    if (query === 0) {
      setDisplayMemeList(
        completeMemeList.filter((m) => m.name === e.target.innerText)
      );
    } else if (query === undefined) {
      setDisplayMemeList(completeMemeList);
    } else {
      query = query.toLowerCase();
      setDisplayMemeList(
        completeMemeList.filter((m) =>
          m.name.toString().toLowerCase().includes(query)
        )
      );
    }
  };

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h2">{"🐸"}Tera Memes</Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Make Memes at Lightning Speed {"⚡"}
          </Typography>
          <Autocomplete
            id="combo-box-demo"
            options={completeMemeList}
            onInputChange={searchMemes}
            getOptionLabel={(option) => option.name}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                {...params}
                label="Search"
                variant="outlined"
              />
            )}
          />
          <MasonryList>
            {displayMemeList.map((meme) => (
              <Card
                key={meme.id}
                variant="outlined"
                style={{ marginBottom: 6 }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {meme.name}
                  </Typography>
                  <img src={meme.url} width="100%" alt={meme.name} />
                  <Typography color="textSecondary" style={{ marginTop: 2 }}>
                    #{meme.id}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Create />}
                    style={{ width: "100%" }}
                  >
                    Create
                  </Button>
                </CardActions>
              </Card>
            ))}
          </MasonryList>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
