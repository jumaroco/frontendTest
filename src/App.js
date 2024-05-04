import React from "react";
import Login from "./components/security/Login";
import Task from "./components/pages/Task";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import MenuAppBar from "./components/navigate/MenuAppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
   <ThemeProvider theme={theme}>
    <Router>
      <MenuAppBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Task} />
      </Switch>
    </Router>
   </ThemeProvider>
  );
}

export default App;
