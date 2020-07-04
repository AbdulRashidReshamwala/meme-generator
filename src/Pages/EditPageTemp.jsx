import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

function EditPage({ location }) {
  const classes = useStyles();
  const [meme, setMeme] = useState(location.selectedMeme);
  const completeMemeList = useRef(location.completeMemeList);
  const [displayMemeList, setDisplayMemeList] = useState(
    location.completeMemeList
  );

  return (
    <Container>
      <Card variant="outlined" style={{ marginBottom: 6 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {meme.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} md={7} item>
              <img
                src={meme.url}
                alt={meme.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
              <h1>hello</h1>
            </Grid>
          </Grid>
          <Typography color="textSecondary" style={{ marginTop: 2 }}>
            #{meme.id}
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {displayMemeList.map((tile) => (
            <GridListTile key={tile.url}>
              <img src={tile.url} alt={tile.name} width="33%" height="auto" />
              <GridListTileBar
                title={tile.name}
                classes={{
                  root: classes.titleBar,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Container>
  );
}

export default withRouter(EditPage);
