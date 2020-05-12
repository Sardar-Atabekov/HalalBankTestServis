import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Departments from "./pages/departments-page/departments";
import Transactions from "./pages/transactions-page/index";
import AddTransaction from "./pages/addDepartment-page/add-department";
import Projects from "./pages/projects-page/projects";
import Login from "./pages/login-page/login-page";
import Users from "./pages/users-page/users";
import Reports from "./pages/reports/reports";
import NotFound from "./pages/404/404";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/users/" exact component={Users} />
          <Route path="/projects/" exact component={Projects} />
          <Route path="/departments/" exact component={Departments} />
          <Route path="/transactions/" exact component={Transactions} />
          <Route path="/add-transaction/" exact component={AddTransaction} />
          <Route path="/reports/" exact component={Reports} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
