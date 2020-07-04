import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SelectPage from "./Pages/SelectPage";
import EditPage from "./Pages/EditPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path="/" exact>
              <SelectPage />
            </Route>
            <Route path="/edit">
              <EditPage />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
