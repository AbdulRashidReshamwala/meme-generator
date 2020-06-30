import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SelectPage from "./Pages/SelectPage";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <SelectPage />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
