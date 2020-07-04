import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import RegionSelect from "react-region-select";

function EditPage({ location }) {
  const [meme, setMeme] = useState(location.selectedMeme);
  const [regionText, setRegionText] = useState(Array(meme.box_count).fill(""));
  const completeMemeList = useRef(location.completeMemeList);
  const [displayMemeList, setDisplayMemeList] = useState(
    location.completeMemeList
  );

  const [regions, setRegions] = useState([]);

  const changeText = (text, i) => {
    if (i < meme.box_count) {
      let t = [...regionText];
      t[i] = text;
      setRegionText(t);
    } else {
      let t = [...regionText];
      t[t.length - 1] = text;
      setRegionText(t);
    }
  };

  const regionRenderer = ({ data, isChanging }) => {
    return isChanging ? (
      <div></div>
    ) : (
      <div>
        <p></p>
        <input
          type="text"
          value={
            data.index < meme.box_count
              ? regionText[data.index]
              : regionText[meme.box_count - 1]
          }
          style={{ position: "absolute", right: 0, bottom: "-1.5rem" }}
          onChange={(e) => changeText(e.target.value, data.index)}
        ></input>
      </div>
    );
  };

  return (
    <Container>
      <Card variant="outlined" style={{ marginBottom: 6 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {meme.name}
          </Typography>
          <RegionSelect
            maxRegions={meme.box_count}
            regions={regions}
            onChange={(e) => setRegions(e)}
            regionRenderer={regionRenderer}
          >
            <img
              src={meme.url}
              alt={meme.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </RegionSelect>

          <Typography color="textSecondary" style={{ marginTop: 2 }}>
            #{meme.id}
          </Typography>
        </CardContent>
      </Card>
      {regionText.map((r, i) => (
        <div>
          <p>{i}</p>
          <p>{r}</p>
        </div>
      ))}
    </Container>
  );
}

export default withRouter(EditPage);
