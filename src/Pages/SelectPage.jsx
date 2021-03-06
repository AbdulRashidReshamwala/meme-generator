import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import MasonryList from "../components/MasonaryGrid";
import offlineData from "../memeData";

export default function SelectPage() {
  const [completeMemeList, setCompleteMemeList] = useState([]);
  const [displayMemeList, setDisplayMemeList] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const completeData = offlineData.concat(data.data.memes);
        setCompleteMemeList(completeData);
        setDisplayMemeList(completeData);
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

  return (
    <div>
      <Container>
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
            <Card key={meme.id} variant="outlined" style={{ marginBottom: 6 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {meme.name}
                </Typography>
                <img
                  src={meme.url}
                  width="100%"
                  alt={meme.name}
                  loading="lazy"
                />
                <Typography color="textSecondary" style={{ marginTop: 2 }}>
                  #{meme.id}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={{
                    pathname: `/edit`,
                    completeMemeList: completeMemeList,
                    selectedMeme: meme,
                  }}
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Create />}
                    fullWidth
                  >
                    Create
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </MasonryList>
      </Container>
    </div>
  );
}
