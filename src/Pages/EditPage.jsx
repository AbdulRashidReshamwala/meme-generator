import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Slider,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { Create, Save } from "@material-ui/icons";
import withQuery from "with-query";

import { withRouter } from "react-router-dom";

function EditPage({ location }) {
  const [meme, setMeme] = useState(location.selectedMeme);
  const [result, setResult] = useState();
  const [texts, setText] = useState(Array(meme.box_count).fill(""));
  const [colors, setColors] = useState(Array(meme.box_count).fill("#000000"));
  const [outlineColors, setOutlineColors] = useState(
    Array(meme.box_count).fill("#ffffff")
  );
  const [fontFamily, setFontFamily] = useState("impact");
  const [fontSize, setFontSize] = useState(50);

  const [advanceMode, setAdvanceMode] = useState(false);

  // const completeMemeList = useRef(location.completeMemeList);
  // const [displayMemeList, setDisplayMemeList] = useState(
  //   location.completeMemeList
  // );

  const changeText = (text, i) => {
    let t = [...texts];
    t[i] = text;
    setText(t);
  };
  const changeColor = (color, i) => {
    let t = [...colors];
    t[i] = color;
    setColors(t);
  };
  const changeOutlineColor = (color, i) => {
    let t = [...outlineColors];
    t[i] = color;
    setOutlineColors(t);
  };

  const createMeme = () => {
    let d;
    if (advanceMode) {
      d = texts.map((t, i) => ({
        text: t,
        color: colors[i],
        outline_color: outlineColors[i],
      }));
    } else {
      d = texts.map((t) => ({ text: t }));
    }
    fetch(
      withQuery("https://api.imgflip.com/caption_image", {
        template_id: meme.id,
        username: "terra.cf",
        password: "pleasedontsteal",
        font: advanceMode ? fontFamily : "impact",
        max_font_size: advanceMode ? fontSize : 50,
        boxes: d,
      }),
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.data);
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  function forceDownload(blob, filename) {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Current blob size limit is around 500MB for browsers
  function downloadResource(url, filename) {
    if (!filename) filename = url.split("\\").pop().split("/").pop();
    fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch((e) => console.error(e));
  }

  return (
    <Container>
      <Card variant="outlined" style={{ marginBottom: 6 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Typography variant="h4" gutterBottom>
                {meme.name}
              </Typography>
              <img
                src={result ? result.url : meme.url}
                alt={meme.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />

              <Typography color="textSecondary" style={{ marginTop: 2 }}>
                #{meme.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h4" gutterBottom>
                Enter Text
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={advanceMode}
                    onChange={() => setAdvanceMode(!advanceMode)}
                    name="checkedA"
                  />
                }
                label="Advance Options"
              />
              {texts.map((t, i) => (
                <div key={i}>
                  <TextField
                    label={`Text Box ${i + 1}`}
                    style={{ margin: 8 }}
                    fullWidth
                    value={t}
                    onChange={(e) => changeText(e.target.value, i)}
                    margin="normal"
                    variant="outlined"
                  />
                  {advanceMode ? (
                    <Grid container>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={5}>
                        <div>
                          <label>Font Color:</label>
                          <input
                            style={{ display: "block" }}
                            type="color"
                            id="favcolor"
                            name="favcolor"
                            value={colors[i]}
                            onChange={(e) => changeColor(e.target.value, i)}
                          ></input>
                        </div>
                      </Grid>
                      <Grid item xs={5}>
                        <div>
                          <label>Outline Color:</label>
                          <input
                            style={{ display: "block" }}
                            type="color"
                            id="favcolor"
                            name="favcolor"
                            value={outlineColors[i]}
                            onChange={(e) =>
                              changeOutlineColor(e.target.value, i)
                            }
                          ></input>
                        </div>
                      </Grid>
                    </Grid>
                  ) : null}
                </div>
              ))}

              {advanceMode ? (
                <div style={{ marginTop: "1rem" }}>
                  <label>Max Font Size:</label>
                  <Slider
                    defaultValue={50}
                    value={fontSize}
                    aria-labelledby="slider"
                    min={6}
                    max={156}
                    valueLabelDisplay="auto"
                    onChange={(_, value) => setFontSize(value)}
                  />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Fobt Family</FormLabel>
                    <RadioGroup
                      aria-label="Font Family"
                      name="fontFamily"
                      defaultValue="impact"
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      <FormControlLabel
                        value="impact"
                        control={<Radio />}
                        label="Impact"
                      />
                      <FormControlLabel
                        value="arial"
                        control={<Radio />}
                        label="Arial"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              ) : null}
              <div style={{ marginTop: "1rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Create />}
                  fullWidth
                  onClick={createMeme}
                >
                  Create
                </Button>
              </div>
              {result ? (
                <div style={{ marginTop: "1rem" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Save />}
                    fullWidth
                    onClick={() => downloadResource(result.url)}
                  >
                    Download
                  </Button>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default withRouter(EditPage);
